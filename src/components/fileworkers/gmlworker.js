//import gmltojson from...

//TODO: After each is done, post it before continuing
onmessage = function(e) {
  const gmlFiles = e.data;
  const json = gmlFiles;
  postMessage(json);
  close();
};
