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
  let x = [], traces = [];
  let tab = document.getElementById('table_iterative_standard').getElementsByTagName( 'table' )[0];
  let i = 1;
  for (var firstKey in data) break;
  tab.rows[0].cells[0].innerHTML = "Méthode (N = " + data[firstKey].N + ")";
  for (var key in data) {
    traces.push({"name": data[key].method, "x" : data[key].niter, "y":data[key].resvec});
    tab.rows[0].cells[i].innerHTML = data[key].method;
    tab.rows[1].cells[i].innerHTML = data[key].n_iter;
    tab.rows[2].cells[i].innerHTML = data[key].cpu_time;
    i++;
  }
  Plotly.newPlot('convergence_history', traces,layout, {responsive: true});
};

makeplot();
