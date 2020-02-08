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

// data is assumed to be already loaded
makePlotly(data);
