$("#results").hide();

var map = L.map('map', {
  center: [39.952372, -75.163584],
  zoom: 12
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

var exton11 = cartodb.createLayer(map, {
  user_name: cartoUserName,
  type: 'cartodb',
  interactivity: true,
  sublayers: [
    {
      sql: "SELECT * FROM exton_2011_blocks",
      cartocss: "#layer { polygon-fill: ramp([count_], (#ffffb2, #fecc5c, #fd8d3c, #f03b20, #bd0026), quantiles); line-width: 1; line-color: #FFF; line-opacity: 0.5; }",
      interactivity: ['count_'], // Define properties you want to be available on interaction
   }
  ]
}).addTo(map)
  .on('done', function(layer) {
    // Set interactivity
    layer.setInteraction(true);
    // Set up map interaction event
    layer.on('featureClick',function(e, latlng, pos, data) {
      console.log(data);
    });
    // Add button click events, demo setCartoCSS and setSQL
    });
    $('#Exton').click(function() {
      layer.getSubLayer(0).setSQL('SELECT * FROM exton_2011_blocks');
    }).on('error', function() {
    console.log("some error occurred");
});
