/**
 * Created by Hermann
 * Class for the upload button. Can upload geoJSON, GML and Shape
 * Must send file to App class, must transform files
 */

import React, { Component } from "react";
import Dropzone from "react-dropzone";
import "./css/sidebar.css";
import { ACCEPTED_FILE_TYPES, SHAPE_FORMATS } from "./util/constants.js";
import PropTypes from "prop-types";

const shpWorker = "./fileworkers/shapeworker.js";
const gmlWorker = "./fileworkers/gmlworker.js";

class Upload extends Component {
  /**
   * Checks file type and chooses convertion function
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
    this.convertFiles(shapeFiles, shpWorker);
    this.convertFiles(gmlFiles, gmlWorker);
    this.props.onUpload(geoJsonFiles);
  };

  /**
   * Converts files using worker script from input
   */
  convertFiles = (files, workerpath) => {
    if (files.length === 0) {
      return;
    }
    const worker = new Worker(workerpath);
    worker.postMessage(files);
    worker.onmessage = function(e) {
      this.props.onUpload(e.data);
    };
  };

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
            Drag and drop, or click to upload files here. Only geojson
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
  SHAPE_FORMATS: PropTypes.array,
  worker: PropTypes.instanceOf(Worker)
};

export default Upload;
