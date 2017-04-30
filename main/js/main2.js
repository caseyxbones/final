function dataPull() {
  var dataDummy = cartodb.createLayer(map, {
    user_name: 'caseyxbones',
    type: 'cartodb',
    sublayers:
        [
        {
        sql: "",
        cartocss: ""
        },
        {
        sql: "",
        cartocss: ""
        }]
      }, {}, function(layer) {
        stationData = layer;
      }).addTo(map);
      dataPull.called = true;
      console.log("dataPull status" + " " + "=" + dataPull.called);
      return dataDummy;
}

var buffer = function bufferOne() {
  var pt = {
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "Point",
      "coordinates": [globalYX[1], globalYX[0]]
    }
  };
  var buffered = turf.buffer(pt, 1, unit);
  var buffer = new L.geoJson(buffered, {color:"black", weight: 1, opacity:75, fillOpacity: 0.15}).addTo(map);
};
