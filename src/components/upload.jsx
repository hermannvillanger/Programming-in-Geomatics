import React, { Component } from "react";
import Dropzone from "react-dropzone";
import "./css/sidebar.css";
import { ACCEPTED_FILE_TYPES, SHAPE_FORMATS } from "./util/constants.js";
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
    let shapeFiles = [];
    let gmlFiles = [];
    let geoJsonFiles = [];
    files.forEach(file => {
      let filename = file.name.toLowerCase();
      if (filename.length > 0) {
        if (filename.endsWith(".geojson")) {
          geoJsonFiles.push(file);
        } else if (filename.endsWith(".gml")) {
          gmlFiles.push(file);
        } else if (
          SHAPE_FORMATS.filter(format => filename.endsWith(format)).length > 0
        ) {
          shapeFiles.push(file);
        } else {
          alert("Not valid filetype: " + filename);
        }
      }
    });
    this.props.onUpload(geoJsonFiles);
  };

  /**
   * Render function
   * Contains a dropzone. Can either be clicked to open field upload dialogue,
   * or can drop files over
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
          <div>
            Click to upload files. Only geojson files
            {/*, gml and shapefiles*/} can be uploaded
          </div>
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
