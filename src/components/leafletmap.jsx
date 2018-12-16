import React, { Component } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./css/map.css";
import PropTypes from "prop-types";
import { LayerShape } from "./util/constants.js";

/**
 * Class for all interactions with the leaflet map
 */
class LeafletMap extends Component {
  state = {
    mapid: "mapid",
    center: [63.42, 10.55],
    zoom: 12
  };

  /**
   * Instantiates the map and the featuregroup containing all layers
   */
  componentDidMount() {
    this.map = this.createMap(this.state.mapid);
    this.featuregroup = L.featureGroup();
    this.featuregroup.addTo(this.map);
  }
  /**
   * Leaflet map constructor with Kartverket basemap
   * @param mapid, id of <div> the map will be placed in
   */
  createMap(mapid) {
    let map = L.map(mapid).setView(this.state.center, this.state.zoom);
    L.tileLayer(
      "http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=norges_grunnkart&zoom={z}&x={x}&y={y}",
      {
        attribution: '<a href="http://www.kartverket.no/">Kartverket</a>'
      }
    ).addTo(map);
    map.zoomControl.setPosition("topright");

    return map;
  }
  /**
   * When props are updated:
   * Goes through each layer, checks the visibility settings,
   * adds layers and pushes them to the back, starting with the front layers
   */
  componentDidUpdate() {
    this.props.layerlist.forEach(layer => {
      //Layer is visible, add and bring to back
      if (this.props.visiblemap.get(layer.id)) {
        let leaflayer = this.addLayer(layer);
        let style = this.props.stylemap.get(layer.id);
        leaflayer.setStyle({ color: style.color, opacity: style.opacity });
        leaflayer.bringToBack();
      }
      //Layer is not visible, remove
      else {
        this.removeLayer(layer.id);
      }
    });
  }

  zoomToLayer = id => {
    const layer = this.getLayerById(id);
    this.map.fitBounds(layer.getBounds());
  };
  /**
   * Inserts data as geojson layer. Adds id field for easier identification.
   * If leaflet cannot read the layer, delete it from storage
   * @param {*} layer
   */
  addLayer = layer => {
    let leaflayer = this.getLayerById(layer.id);
    if (leaflayer === undefined) {
      try {
        leaflayer = L.geoJSON(layer.data);
        leaflayer.id = layer.id;
        this.featuregroup.addLayer(leaflayer);
      } catch (e) {
        this.props.onError(layer.id);
      }
    }
    return leaflayer;
  };
  /**
   * Finds and removes layer in feature group with id matching input id
   * @param {*} id
   */
  removeLayer = id => {
    const layer = this.getLayerById(id);
    if (layer !== undefined) {
      this.featuregroup.removeLayer(layer);
    }
  };
  getLayerById = id => {
    return this.featuregroup.getLayers().find(layer => layer.id === id);
  };
  render() {
    return <div id={this.state.mapid} />;
  }
}

LeafletMap.propTypes = {
  layerlist: PropTypes.arrayOf(PropTypes.shape(LayerShape)),
  visiblemap: PropTypes.instanceOf(Map).isRequired,
  layer: PropTypes.shape(LayerShape),
  map: PropTypes.object
};

export default LeafletMap;
