//import shapetojson from ...

//TODO: After each is done, post it before continuing
onmessage = function(e) {
  const shapeFiles = e.data;
  const json = shapeFiles;
  postMessage(json);
  close();
};
