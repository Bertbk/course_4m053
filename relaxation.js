function makeplot() {
  Plotly.d3.csv("../data.csv", function(data){ processData(data) } );
};

var omegastar = 1.560387921274774214;
var omegastary = 0.5603879212747746585;

var layout = {
  title: {text:'Rayon spectral ρ(G_ω) pour N=10'},
  xaxis: {
    title: {
      text: 'ω'
    },
  },
  yaxis: {
    title: {
      text: 'Rayon Spectral ρ(G_ω)',
    },
    range: [0, 1.1],
  },
  showlegend: false,
  shapes: [{
    type: 'line',
    x0: omegastar,
    xanchor: omegastar,
    y0: 0,
    x1: omegastar,
    yref: 'paper',
    y1: 1,
    line: {
      color: 'grey',
      width: 1.5,
      dash: 'dot'
    }
  },
  {
    type: 'line',
    x0: 0,
    xref:'paper',
    y0: omegastary,
    x1: 1,
    y1: omegastary,
    line: {
      color: 'grey',
      width: 1.5,
      dash: 'dot'
    }
  }
  ],
  annotations: [
    {
      x: omegastar,
      y: omegastary,
      xref: 'x',
      yref: 'y',
      text: 'Optimum à ω*',
      showarrow: true,
      arrowhead: 17,
      ax: 40,
      ay: 40
    },
    {
      x: omegastar+ 0.2,
      y: omegastary+0.2,
      xref: 'x',
      yref: 'y',
      text: 'Droite (ω-1)',
      showarrow: true,
      arrowhead: 17,
      ax: 40,
      ay: 40
    }

  ]
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
    y: y,
    name:'ρ(G_ω)'
  },
  {
    x: [omegastar],
    y: [omegastary],
    type: 'scatter',
    mode:'markers', 
    marker:{size:10},
    name:'ρ(G_ω*)'
  }
];

  Plotly.newPlot('relaxation', traces,layout, {responsive: true});
};
makeplot();
