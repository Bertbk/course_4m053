function makeplot() {
  Plotly.d3.csv("../data_standard_iterative.csv", function(data){ processData(data) } );
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
  }
};


function processData(allRows) {
  var x = [], jacobi = [], gauss=[], relaxation=[];
  for (var i=0; i<allRows.length; i++) {
    row = allRows[i];
    x.push( row['Niter'] );
    jacobi.push( row['Jacobi'] );
    gauss.push( row['Gauss-Seidel'] );
    relaxation.push( row['Relaxation'] );
  }
  makePlotly( x, jacobi, gauss, relaxation );
}

function makePlotly( x, jacobi, gauss, relaxation){
  var plotDiv = document.getElementById("plot");
  var traces = [{
    x: x,
    y: jacobi,
    name:'Jacobi'
  },{
    x: x,
    y: gauss,
    name:'Gauss-Seidel'
  },
  {
    x: x,
    y: relaxation,
    name:'Relaxation'
  }
];

  Plotly.newPlot('convergence_history', traces,layout, {responsive: true});
};
makeplot();
