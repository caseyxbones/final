var map = L.map('map', {
  center: [41.133004, -77.593477],
  zoom: 7
});

var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

var cartoUserName = 'caseyxbones';

var myLayer;

var layers;

var stations = function(){
  layers= cartodb.createLayer(map, {
  user_name: cartoUserName,
  type: 'cartodb',
  interactivity: true,
  sublayers: [
    {
      sql: "SELECT cartodb_id, septa_id, dvrpc_id, objectid, field_1, state, county, globalid, operator, station, line, type, ST_SetSRID(ST_MakePoint(x,y),4326) AS the_geom_webmercator FROM (SELECT * FROM regionalrailstations) AS _camshaft_georeference_long_lat_analysis",
      cartocss: '#layer { marker-width: 10; marker-fill: #000000; marker-fill-opacity: 0.9; marker-allow-overlap: true; marker-line-width: 1; marker-line-color: #FFF; marker-line-opacity: 1; }',
      interactivity: ['_count'], // Define properties you want to be available on interaction
   }
  ]
});

console.log("I did it!");
  // .on('done', function(layer) {
  //   // Set interactivity
  //   layer.setInteraction(true);
  //   // Set up map interaction event
  //   layer.on('featureClick',function(e, latlng, pos, data) {
  //     console.log(data);
  //   });
// });
};
