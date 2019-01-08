import React, { Component } from "react";
import Dropzone from "react-dropzone";
import "./css/sidebar.css";
import { ACCEPTED_FILE_TYPES } from "./util/constants.js";
import PropTypes from "prop-types";

/**
 * Class for the upload button. Can upload geoJSON files
 */
class Upload extends Component {
  /**
   * Checks file type and chooses convertion function.
   * Can convert geoJSON, possibility for adding GML and Shape later
   * @param files, all input files from user
   */
  handleUpload = files => {
    let geoJsonFiles = [];
    //let gmlFiles = [];
    files.forEach(file => {
      let filename = file.name.toLowerCase();
      if (filename.length > 0) {
        if (filename.endsWith(".geojson")) {
          geoJsonFiles.push(file);
        } else {
          /*
        else if (filename.endsWith(".gml")) {
          gmlFiles.push(file);
        }
        */
          alert("Not valid filetype: " + filename);
        }
      }
    });
    this.props.onUpload(geoJsonFiles);
  };

  /**
   * Render function
   * Contains a file upload zone. Can be clicked to open field upload dialogue
   */
  render() {
    return (
      <div>
        <Dropzone
          className="drop-zone"
          accept={ACCEPTED_FILE_TYPES}
          onDrop={files => {
            this.handleUpload(files);
          }}
        >
          <span>Click to upload files. Only geojson files can be uploaded</span>
        </Dropzone>
      </div>
    );
  }
}

Upload.propTypes = {
  onUpload: PropTypes.func.isRequired,
  gmlFiles: PropTypes.array,
  shapeFiles: PropTypes.array,
  geoJsonFiles: PropTypes.array,
  ACCEPTED_FILE_TYPES: PropTypes.string,
  SHAPE_FORMATS: PropTypes.array
};

export default Upload;
