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

var username = "caseyxbones";
var globalData;
var globalYX = [];

// Radio Button Functions
// This  helps the "Map Selected()" function code know which data to map on a button click event later
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

// The dataPull function essentially creates a blank cartoDB later, which I can then change using station-s[ecific functions.
// This solves several problems: it means any station can be mapped first, whereas before Exton 2011 had to be mapped first or
// else stationData didn't exist; it makes it so that the SQL is truly refreshing and layers cannot appear on top of each other;
// it is easier for me, personally, to work with and understand.
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

// calls the dataPull and coordinatePull functions independently so that data is pulled down once page is loaded
dataPull();

// Functions to get station coordinates when station is selected:
function extonCoordinates (){
    var coordinates = $.getJSON("https://" + username + ".carto.com/api/v2/sql?q=SELECT * FROM regionalrailstations_1 WHERE station LIKE 'Exton'",
    function (data) {
      $.each(data.rows, function(key, val) {
        globalYX.splice(0, 2, val.y, val.x);
      });
    }
    );
}

function thorndaleCoordinates (){
    var coordinates = $.getJSON("https://" + username + ".carto.com/api/v2/sql?q=SELECT * FROM regionalrailstations_1 WHERE station LIKE 'Thorndale'",
    function (data) {
      $.each(data.rows, function(key, val) {
        globalYX.splice(0, 2, val.y, val.x);
      });
    }
    );
  }

// Functions to get data from Carto for a station and map it:
function exton2011() {
    console.log("exton2011 called");
    layerSelected = stationData.getSubLayer(0);
    layerSelected.setSQL("SELECT * FROM exton_2011_blocks");
    layerSelected.setCartoCSS("#layer { polygon-fill: ramp([count_], (#ffffb2, #fecc5c, #fd8d3c, #f03b20, #bd0026), quantiles); line-width: 1; line-color: #FFF; line-opacity: 0.5; }");
    pointSelected = stationData.getSubLayer(1);
    pointSelected.setSQL("SELECT * FROM regionalrailstations_1 WHERE station LIKE '%Exton%'");
    pointSelected.setCartoCSS("#layer { marker-width: 10; marker-fill: #000000; marker-fill-opacity: 0.9; marker-allow-overlap: true; marker-line-width: 1; marker-line-color: #FFF; marker-line-opacity: 1; }");
}

function exton2016() {
    console.log("exton2016 called");
    layerSelected = stationData.getSubLayer(0);
    layerSelected.setSQL("SELECT * FROM exton_2016_blocks");
    layerSelected.setCartoCSS("#layer { polygon-fill: ramp([count_], (#c4e6c3, #80c799, #4da284, #2d7974, #1d4f60), quantiles); line-width: 1; line-color: #FFF; line-opacity: 0.5; }");
    pointSelected = stationData.getSubLayer(1);
    pointSelected.setSQL("SELECT * FROM regionalrailstations_1 WHERE station LIKE '%Exton%'");
    pointSelected.setCartoCSS("#layer { marker-width: 10; marker-fill: #000000; marker-fill-opacity: 0.9; marker-allow-overlap: true; marker-line-width: 1; marker-line-color: #FFF; marker-line-opacity: 1; }");
}

function thorndale2016() {
    console.log("thorndale2016 called");
    layerSelected = stationData.getSubLayer(0);
    layerSelected.setSQL("SELECT * FROM thorndale_2016_blocks");
    layerSelected.setCartoCSS("#layer { polygon-fill: ramp([count_], (#f3e79b, #fab27f, #eb7f86, #b95e9a, #5c53a5), quantiles); line-width: 1; line-color: #FFF; line-opacity: 0.5; }");
    pointSelected = stationData.getSubLayer(1);
    pointSelected.setSQL("SELECT * FROM regionalrailstations_1 WHERE station LIKE '%Thorndale%'");
    pointSelected.setCartoCSS("#layer { marker-width: 10; marker-fill: #000000; marker-fill-opacity: 0.9; marker-allow-overlap: true; marker-line-width: 1; marker-line-color: #FFF; marker-line-opacity: 1; }");
}

///////////////////////////////////////////////
///                BUFFER STUFF            ///
///////////////////////////////////////////////
var unit = 'miles';
function getGlobalYX() {
      var ptDummy = {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [globalYX[1], globalYX[0]]
        }
      }; return ptDummy;
}

// QUARTER MILE BUFFER
    function createBuffer_qu() {
          var pt = getGlobalYX();
          bufferDummy_qu = turf.buffer(pt, 0.25, unit);
          return bufferDummy_qu;
        }
    function addtoMap_qu() {
          var buffered_qu = createBuffer_qu();
          addtoDummy_qu = new L.geoJson(buffered_qu, {color:"black", weight: 1, opacity:75, fillOpacity: 0.15}).addTo(map);
          return addtoDummy_qu;
    }
    function bufferQuarterMile() {
      getGlobalYX();
      createBuffer_qu();
      addtoMap_qu();
      bufferQuarterMile.called = true;
    }

// HALF MILE BUFFER
    function createBuffer_ha() {
          var pt = getGlobalYX();
          bufferDummy_ha = turf.buffer(pt, 0.5, unit);
          return bufferDummy_ha;
        }
    function addtoMap_ha() {
          var buffered_ha = createBuffer_ha();
          addtoDummy_ha = new L.geoJson(buffered_ha, {color:"black", weight: 1, opacity:75, fillOpacity: 0.15}).addTo(map);
          return addtoDummy_ha;
    }
    function bufferHalfMile() {
      getGlobalYX();
      createBuffer_ha();
      addtoMap_ha();
      bufferHalfMile.called = true;
    }

// ONE MILE BUFFER
    function createBuffer_on() {
          var pt = getGlobalYX();
          bufferDummy_on = turf.buffer(pt, 1, unit);
          return bufferDummy_on;
        }
    function addtoMap_on() {
          var buffered_on = createBuffer_on();
          addtoDummy_on = new L.geoJson(buffered_on, {color:"black", weight: 1, opacity:75, fillOpacity: 0.15}).addTo(map);
          return addtoDummy_on;
    }
    function bufferOneMile() {
      getGlobalYX();
      createBuffer_on();
      addtoMap_on();
      bufferOneMile.called = true;
    }

// FIVE MILE BUFFER
    function createBuffer_fi() {
          var pt = getGlobalYX();
          bufferDummy_fi = turf.buffer(pt, 5, unit);
          return bufferDummy_fi;
        }
    function addtoMap_fi() {
          var buffered_fi = createBuffer_fi();
          addtoDummy_fi = new L.geoJson(buffered_fi, {color:"black", weight: 1, opacity:75, fillOpacity: 0.15}).addTo(map);
          return addtoDummy_fi;
    }
    function bufferFiveMile() {
      getGlobalYX();
      createBuffer_fi();
      addtoMap_fi();
      bufferFiveMile.called = true;
    }

// ADD ALL BUFFERS
    function allBuffers() {
      bufferQuarterMile();
      bufferHalfMile();
      bufferOneMile();
      bufferFiveMile();
      allBuffers.called = true;
    }

// CLEARING BUFFERS IF THEY HAVE BEEN MAPPED
    function clearQuarterMile() {
        if ((bufferQuarterMile.called === true)) {
          map.removeLayer(addtoDummy_qu);
        }
        else {}
    }
    function clearHalfMile() {
        if ((bufferHalfMile.called === true)) {
          map.removeLayer(addtoDummy_ha);
        }
        else {}
    }
    function clearOneMile() {
        if ((bufferOneMile.called === true)) {
          map.removeLayer(addtoDummy_on);
        }
        else {}
    }
    function clearFiveMile() {
        if ((bufferFiveMile.called === true)) {
          map.removeLayer(addtoDummy_fi);
        }
        else {}
    }
    function clearallBuffers() {
      if ((allBuffers.called === true)) {
        map.removeLayer(addtoDummy_qu);
        map.removeLayer(addtoDummy_ha);
        map.removeLayer(addtoDummy_on);
        map.removeLayer(addtoDummy_fi);
      }
      else {}
    }

// THIS IS THE ACTUAL FUNCTION THAT WILL BE USED
    function clearBuffers() {
      clearQuarterMile();
      clearHalfMile();
      clearOneMile();
      clearFiveMile();
      clearallBuffers();
    }


// Station selection Functions
function MapSelected() {
  if (($("#station_name").text() === "Exton Station") && (rb1.checked === true)) {
    console.log("Someone wants to map Exton 2011!");
    exton2011();
    return;
  }
    else if (($("#station_name").text() === "Exton Station") && (rb2.checked === true)) {
      console.log("Someone wants to map Exton 2016!");
      exton2016();
      return;
    }
    else if (($("#station_name").text() === "Thorndale Station") && (rb1.checked === true)) {
      console.log("Someone wants to map Thorndale 2016!");
      thorndale2016();
      return;
    }
    else {
      alert("Please select data to map");
      console.log("No data is selected!");
    }
}

function showDropdown() {
    showDropdown.called = true;
    console.log("showDropdown.called()"+ " " + "=" + " " + showDropdown.called);
    console.log("dataPull called within showDropdown");
    $("#myDropdown").show();
}

// Results Functions
function extonResults(){
  $("#myDropdown").hide();
  $("#station_name").text("Exton Station");
  $("#line_name").text("Paoli/Thorndale Line");
  $("#station_location").text("Chester, Pennsylvania");
  $("#station_location").text("Chester, Pennsylvania");
  $("#year1").text("2011");
  $("#year2").show();
  $("#rb2").show();
  $("#year2").text("2016");
  $("#results").show();
}

function thorndaleResults(){
  $("#myDropdown").hide();
  $("#station_name").text("Thorndale Station");
  $("#line_name").text("Paoli/Thorndale Line");
  $("#station_location").text("Chester, Pennsylvania");
  $("#station_location").text("Chester, Pennsylvania");
  $("#year1").text("2016");
  $("#year2").hide();
  $("#rb2").hide();
  $("#results").show();
}

// Click Events
$("#Home").click(function(){
  console.log("Re-center map has been clicked");
  stationData.hide();
  map.panTo(new L.LatLng(39.952372, -75.163584),8);
  $("#myDropdown").hide();
  $("#results").hide();
  clearBuffers();
});

$("#Exton").click(function(){
  console.log("Exton has been clicked in the dropdown menu");
  console.log("Exton clearMap() has been called");
  map.panTo(new L.LatLng(40.01943118, -75.62175724));
  extonResults();
  extonCoordinates();
  clearBuffers();
});

$("#Thorndale").click(function(){
  console.log("Thorndale has been clicked in the dropdown menu");
  console.log("Thorndale clearMap() has been called");
  console.log("stationData.hide() executed");
  map.panTo(new L.LatLng(39.99277222, -75.76289642));
  thorndaleResults();
  thorndaleCoordinates();
  clearBuffers();
});

$("#mapSelected").click(function(){
  console.log("The 'Map Selected' button has been clicked");
  stationData.hide();
  MapSelected();
  stationData.show();
  console.log("stationData.show() executed");
});