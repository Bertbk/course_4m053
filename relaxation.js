function makeplot() {
  Plotly.d3.csv("../data.csv", function(data){ processData(data) } );
};

var layout = {
  height: 300,
  title: {text:'Relaxation : rayon spectral vs. Omega'},
  xaxis: {
    title: {
      text: 'Omega'
    },
  },
  yaxis: {
    title: {
      text: 'Rayon Spectral',
    }
  }
};


function processData(allRows) {
  var x = [], y = [];
  for (var i=0; i<allRows.length; i++) {
    row = allRows[i];
    x.push( row['omega'] );
    y.push( row['rho'] );
  }
  makePlotly( x, y );
}

function makePlotly( x, y){
  var plotDiv = document.getElementById("plot");
  var traces = [{
    x: x,
    y: y
  }];


  Plotly.newPlot('relaxation', traces,layout);
};
makeplot();
