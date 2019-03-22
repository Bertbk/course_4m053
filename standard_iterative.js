//Credit :
//https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
function loadJSON(callback) {   

  var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
  xobj.open('GET', '../data_standard_iterative.json', true); 
  xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          callback(xobj.responseText);
        }
  };
  xobj.send(null);  
}


function makeplot() {
  loadJSON(function(response) {
    // Parse JSON string into object
      var data = JSON.parse(response);
      makePlotly(data);
      console.log("coucou");
    });
};

var layout = {
  title: {text:'Historique de convergence'},
  xaxis: {
    title: {
      text: "Numéro d'itération"
    },
  },
  yaxis: {
    title: {
      text: 'Résidu relatif (log)',
    },
    type: 'log'
  }
};

function makePlotly(data){
  let traces = [];
  for (var key in data) {
    traces.push({"name": data[key].method, "x" : data[key].niter, "y":data[key].resvec});
  }
  Plotly.newPlot('convergence_history', traces,layout, {responsive: true});
};

makeplot();
