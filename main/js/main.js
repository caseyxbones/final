$("#results").hide();


// Leaflet map setup
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

var extonLayer;


// Radio Button Testing Functions
function rb1Selected(){
  rb1.checked = true;
  console.log("Radio Button 1 has been selected,"+ " " + " rb1 button status =" + " " + rb1.checked);
  rb2.checked = false;
  console.log("Radio Button 2 has been deselected,"+ " " + "rb2 button status =" + " " + rb2.checked);
}

function rb2Selected(){
  rb1.checked = false;
  console.log("Radio Button 1 has been deselected," + " " + "rb1 button status =" + " " + rb1.checked);
  rb2.checked = true;
  console.log("Radio Button 2 has been selected," + " " + "rb2 button status =" + " " + rb2.checked);
}

// Carto Data Functions
function Exton_Center() {
  var Exton_Station = cartodb.createLayer(map, {
    user_name: 'caseyxbones',
    type: 'cartodb',
    sublayers:
      [{
      sql: "SELECT * FROM regionalrailstations_1 WHERE station LIKE '%Exton%'",
      cartocss: "#layer { marker-width: 10; marker-fill: #000000; marker-fill-opacity: 0.9; marker-allow-overlap: true; marker-line-width: 1; marker-line-color: #FFF; marker-line-opacity: 1; }"
      }]
  })
  .addTo(map)
  ;
  map.panTo(new L.LatLng(40.01943118, -75.62175724));
  Exton_Center.fired = true;
}

function extonData() {
  console.log("Exton Data called");
  var extonDummy = cartodb.createLayer(map, {
    user_name: 'caseyxbones',
    type: 'cartodb',
    sublayers:
        [{
        sql: "SELECT * FROM exton_2011_blocks",
        cartocss: "#layer { polygon-fill: ramp([count_], (#ffffb2, #fecc5c, #fd8d3c, #f03b20, #bd0026), quantiles); line-width: 1; line-color: #FFF; line-opacity: 0.5; }"
        }]
  })
  .addTo(map);
}

function Exton2011() {
  console.log("Exton2011 called");
  var extonDummy11 = cartodb.createLayer(map, {
    user_name: 'caseyxbones',
    type: 'cartodb',
    sublayers:
        [{
        sql: "SELECT * FROM exton_2011_blocks",
        cartocss: "#layer { polygon-fill: ramp([count_], (#ffffb2, #fecc5c, #fd8d3c, #f03b20, #bd0026), quantiles); line-width: 1; line-color: #FFF; line-opacity: 0.5; }"
        }]
  })
  .addTo(map);
  return extonDummy11;
}

function Exton2016() {
  console.log("Exton2016 called");
  var Exton_Dummy2 = cartodb.createLayer(map, {
    user_name: 'caseyxbones',
    type: 'cartodb',
    sublayers:
        [{
        sql: "SELECT * FROM exton_2016_blocks",
        cartocss: "#layer { polygon-fill: ramp([count_], (#c4e6c3, #80c799, #4da284, #2d7974, #1d4f60), quantiles); line-width: 1; line-color: #FFF; line-opacity: 0.5; }"
        }]
  })
  .addTo(map);
}

// Station selection Functions
function MapSelected() {
  if ((rb1.checked === true)){
    console.log("Someone wants to map Exton 2011!");
    extonLayer = Exton2011();
  }
  else if ((rb2.checked === true)) {
    console.log("Someone wants to map Exton 2016!");
    Exton2016();
  }
  else {
    alert("Please select data to map");
    console.log("No data is selected!");
  }
}

function showDropdown() {
    $("#myDropdown").show();
}


// Results Functions
function Exton_Results(){
  $("#myDropdown").hide();
  $("#station_name").text("Exton Station");
  $("#line_name").text("Paoli/Thorndale Line");
  $("#station_location").text("Chester, Pennsylvania");
  $("#station_location").text("Chester, Pennsylvania");
  $("#year1").text("2011");
  $("#year2").text("2016");
  $("#results").show();
}


// Click Events
$("#Home").click(function(){
  map.panTo(new L.LatLng(39.952372, -75.163584),8);
  $("#myDropdown").hide();
  $("#results").hide();
});

$("#Exton").click(function(){
  Exton_Center();
  Exton_Results();
});

$("#mapSelected").click(function(){
  MapSelected();
});
