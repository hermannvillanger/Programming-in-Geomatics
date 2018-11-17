import React, { Component } from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import SideBar from "./components/sidebar";
import LeafletMap from "./components/leafletmap";
import Properties from "./components/layerproperties";
import { getInfo, getColor } from "./components/util/support.js";
import { LayerShape } from "./components/util/constants.js";
import PropTypes from "prop-types";
import "./App.css";
import "./components/css/modal.css";
import Modal from "react-modal";

/**
 * Navneforslag:
 * elGIS, elvis, som en elg
 * maGISk
 * reGISter
 * enerGISk
 * NorGIS
 * KronesGIS
 * TODO: Forslag: Bruke worker, undersøk dette
 */
/*
console debugging:
list = [{id:1, name:"one"},{id:2, name:"two"},{id:3, name:"three"},{id:4, name:"four"} ]
*/

const DB_NAME = "gisdb";
const LAYER_STORE = "layers";
//const GROUP_STORE = "groups";
const DB_VERSION = 1;
var db;

class App extends Component {
  state = {
    layers: [],
    visibility: new Map(),
    styles: new Map(),
    modalOpen: false
  };
  constructor(props) {
    super(props);
    this.leafletmap = React.createRef();
  }

  componentDidMount() {
    Modal.setAppElement("#root");
    this.dbInit();
  }
  componentWillUnmount() {
    db.close();
  }
  /**
   * Initialize database if not created, and reads layers
   */
  dbInit = () => {
    let request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = event => {
      alert("Error with indexeddb");
    };
    request.onupgradeneeded = event => {
      request.result.createObjectStore(LAYER_STORE, {
        keyPath: "id",
        autoIncrement: true
      });
    };
    request.onsuccess = event => {
      db = request.result;
      this.loadLayers();
    };
  };
  /**
   * Load layers from indexeddb and insert into state
   */
  loadLayers = () => {
    let dbload = db.transaction(LAYER_STORE, "readonly");
    let objstore = dbload.objectStore(LAYER_STORE);

    let request = objstore.getAll();
    request.onsuccess = event => {
      this.addGeoJSONLayer(event.target.result);
    };
  };
  /**
   * Handles uploaded and converted geojson files.
   * Reads content and saves if not empty
   * @param file, geojson file to be read and saved
   */
  handleUpload = files => {
    files.forEach(file => {
      let json = null;
      let reader = new FileReader();
      reader.onload = () => {
        try {
          let datatext = reader.result;
          json = JSON.parse(datatext);
          if (json !== null) {
            let layer = {
              name: file.name.toLowerCase().replace(".geojson", ""),
              data: json
            };
            this.localSave(layer);
          } else {
            console.log("Json === null");
          }
        } catch (ex) {
          alert("Error reading json file: " + ex);
          return;
        }
      };
      reader.readAsText(file);
    });
  };

  /**
   * Saves file locally, then calls createFromGeoJSON
   * TODO: Forbedringspotensiale, lagre liste over geosjon samtidig
   */
  localSave = layer => {
    let dbsave = db.transaction(LAYER_STORE, "readwrite");
    let objstore = dbsave.objectStore(LAYER_STORE);
    let request;
    request = objstore.put(layer);
    request.onsuccess = event => {
      if (layer.id === undefined) {
        layer.id = event.target.result;
        this.addGeoJSONLayer([layer]);
      }
    };
  };
  /**
   * Creates sidebar layer and map layer
   * @param layer, with name, data and id
   */
  addGeoJSONLayer = layers => {
    layers.forEach(layer => {
      this.setState(prevState => {
        const layers = prevState.layers;
        layers.splice(0, 0, layer);
        let style = prevState.styles.get(layer.id)
          ? prevState.styles.get(layer.id)
          : this.setStyle(layer.id);
        return {
          layers: layers,
          visibility: prevState.visibility.set(layer.id, true),
          styles: prevState.styles.set(layer.id, style)
        };
      });
    });
  };
  setStyle = id => {
    const opacity = 0.8;
    const color = getColor(id);
    const style = { color: color, opacity: opacity };
    return style;
  };

  /**
   * Delete layer from storage, sidebar and map
   * @param id, id of layer to be deleted
   */
  handleDelete = id => {
    this.deleteFromStorage(id);
    this.deleteFromState(id);
    this.deleteFromLeaflet(id);
  };
  handleZoom = id => {
    this.leafletmap.current.zoomToLayer(id);
  };
  handleNameChange = (layer, name) => {
    if (layer.name !== name && name.length > 0) {
      layer.name = name;
      this.localSave(layer);
    }
  };
  handleStyleChange = (id, style) => {
    this.setState(prevState => {
      let { color, opacity } = style;
      const prevStyle = prevState.styles.get(id);
      color = color !== null ? color : prevStyle.color;
      opacity = opacity !== null ? opacity : prevStyle.opacity;
      return {
        styles: prevState.styles.set(id, {
          color: color,
          opacity: opacity
        })
      };
    });
  };

  /**
   * Delete layer from indexeddb
   * @param id of layer
   */
  deleteFromStorage = id => {
    let dbdelete = db.transaction(LAYER_STORE, "readwrite");
    let objstore = dbdelete.objectStore(LAYER_STORE);
    let request = objstore.delete(id);
    request.onsuccess = event => {
      //console.log("Deleted " + id);
    };
  };
  /**
   * Delete layer from state, which in turn deletes it from the sidebar
   * @param id of layer
   */
  deleteFromState = id => {
    this.setState(prevState => {
      const layers = prevState.layers.filter(l => l.id !== id);
      return { layers: layers };
    });
  };
  /**
   * Delete layer from leaflet
   * @param id of layer
   */
  deleteFromLeaflet = id => {
    this.leafletmap.current.removeLayer(id);
  };
  /**
   * Some error with the layer, should be deleted
   */
  handleError = id => {
    this.handleDelete(id);
  };

  handleMove = (id, newIndex) => {
    this.setState(prevState => {
      const layerInfo = getInfo(id, prevState.layers);
      const layers = prevState.layers;
      layers.splice(layerInfo.index, 1);
      layers.splice(newIndex, 0, layerInfo.info);
      return { layers: layers };
    });
  };
  handleProcessing = layer => {
    this.localSave(layer);
  };

  handleToggle = id => {
    this.setState(prevState => {
      return {
        visibility: prevState.visibility.set(id, !prevState.visibility.get(id))
      };
    });
  };
  toggleProperties = layer => {
    this.setState(prevState => {
      return {
        modalOpen: !prevState.modalOpen,
        propModal: prevState.propModal === null ? layer : null,
        extractorModal: null
      };
    });
  };
  toggleExtractor = layer => {
    this.setState(prevState => {
      return {
        modalOpen: !prevState.modalOpen,
        propModal: null,
        extractorModal: prevState.extractorModal === null ? layer : null
      };
    });
  };
  closeModal = () => {
    this.setState({ modalOpen: false, propModal: null, extractorModal: null });
  };
  setupPropertiesModal = layer => {
    return (
      <Properties
        layer={layer}
        style={this.state.styles.get(layer.id)}
        onNameChange={this.handleNameChange}
        onStyleChange={this.handleStyleChange}
        onDialogueFinished={this.closeModal}
      />
    );
  };
  setupExtractorModal = layer => {
    return <div />;
  };

  render() {
    const { modalOpen, propModal, extractorModal } = this.state;

    return (
      <React.Fragment>
        <Modal
          isOpen={modalOpen}
          onRequestClose={this.closeModal}
          style={{
            content: { width: "30vw", height: "40vh", overflow: "hidden" },
            overlay: { zIndex: "1000", overflow: "hidden" }
          }}
        >
          {(propModal && this.setupPropertiesModal(propModal)) ||
            (extractorModal && this.setupExtractorModal(extractorModal))}
        </Modal>
        <SideBar
          layerlist={this.state.layers}
          visiblemap={this.state.visibility}
          stylemap={this.state.styles}
          onUpload={this.handleUpload}
          onDelete={this.handleDelete}
          onToggle={this.handleToggle}
          onMove={this.handleMove}
          onZoom={this.handleZoom}
          onNameChange={this.handleNameChange}
          onStyleChange={this.handleStyleChange}
          onProcessingDone={this.handleProcessing}
          openProperties={this.toggleProperties}
          openExtractor={this.toggleExtractor}
        />
        <LeafletMap
          ref={this.leafletmap}
          layerlist={this.state.layers}
          visiblemap={this.state.visibility}
          stylemap={this.state.styles}
          onError={this.handleError}
        />
      </React.Fragment>
    );
  }
}

App.propTypes = {
  layers: PropTypes.arrayOf(PropTypes.shape(LayerShape)),
  layer: PropTypes.shape(LayerShape),
  visibility: PropTypes.instanceOf(Map),
  id: PropTypes.number,
  newIndex: PropTypes.number,
  DB_NAME: PropTypes.string,
  LAYER_STORE: PropTypes.string,
  DB_VERSION: PropTypes.number
};

export default DragDropContext(HTML5Backend)(App);
