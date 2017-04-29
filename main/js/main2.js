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

function circleQuarter() {
    var quarterMile = L.circle([globalYX[0],globalYX[1]], 402.336, {color:"black", weight: 1, opacity:75, fillOpacity: 0.15}).addTo(map);
  }
function circleHalf() {
    var halfMile = L.circle([globalYX[0],globalYX[1]], 804.672, {color:"black", weight: 1, opacity:75, fillOpacity: 0.10}).addTo(map);
  }
function circleOne() {
    var oneMile = L.circle([globalYX[0],globalYX[1]], 1609.34, {color:"black", weight: 1, opacity:75, fillOpacity: 0.05}).addTo(map);
  }
function circleFive() {
    var fiveMile = L.circle([globalYX[0],globalYX[1]], 8046.72, {color:"black", weight: 1, opacity:75, fillOpacity: 0.05}).addTo(map);
  }


function bufferQuarter() {
    var bufferDummy = L.circle([globalYX[0],globalYX[1]], 402.336,
      {
        color:"black",
        weight: 1,
        opacity:75,
        fillOpacity: 0.15
      }, function (layer) {
        bufferDataQuarter = layer;
      }).addTo(map);
      return bufferDummy;
}
