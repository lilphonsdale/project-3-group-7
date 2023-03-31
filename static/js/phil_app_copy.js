// populate the default dashboard with an init function

report = "../alldatawithyrinfo.json"

function init() {
  d3.json(report).then((data) => {
    console.log(data)

      // Add the country Ids to the dropdown menu
      let countryIDs = data.map(x => x.Country)

      var choices = d3.select("#selDataset");
      Object.entries(countryIDs).forEach(([k,v]) => {
      choices.append("option").attr("value", v).text(v)});

      //Use the first country to generate the first chart

    let firstCountry = countryIDs[0];
    visualize(firstCountry)
  }
  )};

// make the chart

function visualize(country) {
   d3.json(report).then((data) => {
    let countryofInterest = data.filter(x => x.Country == country);
    console.log(countryofInterest);
    years = []
    happinessScore = []
    family = []
    freedom = []
    generosity = []
    for (let i = 0; i < countryofInterest.length; i++) {
      years.push(countryofInterest[i].Year)
      happinessScore.push(countryofInterest[i].Score)
      family.push(countryofInterest[i].Family)
      freedom.push(countryofInterest[i].Freedom)
      generosity.push(countryofInterest[i].Generosity)
    };

    // var trace4 = {
    //   type: "scatter",
    //   mode: "lines",
    //   name: 'Generosity',
    //   x: years,
    //   y: generosity,
    //   line: {color: 'blue'}
    // }

    // var trace3 = {
    //   type: "scatter",
    //   mode: "lines",
    //   name: 'Freedom',
    //   x: years,
    //   y: freedom,
    //   line: {color: 'red'}
    // }

    // var trace2 = {
    //   type: "scatter",
    //   mode: "lines",
    //   name: 'Family',
    //   x: years,
    //   y: family,
    //   line: {color: 'green'}
    // }
  
    // var trace1 = {
    //   type: "scatter",
    //   mode: "lines",
    //   name: 'Happiness Score',
    //   x: years,
    //   y: happinessScore,
    //   line: {color: 'lightgrey'}
    // }

    // var traces = [trace1, trace2, trace3, trace4]

    // Plotly.newPlot('myDiv', traces)

  var trace2 = {
    type: "scatter",
    mode: "lines",
    name: 'Happiness Score',
    fill: 'tonexty',
    x: years,
    y: happinessScore,
    line: {color: 'grey'}
  }

  var trace1 = {
    type: "scatter",
    mode: "lines",
    name: 'Generosity',
    x: years,
    y: generosity,
    line: {color: 'lightgrey'}
  }

  var data = [trace1,trace2];

  var selectorOptions = {
    buttons: [{
        step: 'month',
        stepmode: 'backward',
        count: 1,
        label: '1m'
    }, {
        step: 'month',
        stepmode: 'backward',
        count: 6,
        label: '6m'
    }, {
        step: 'year',
        stepmode: 'todate',
        count: 1,
        label: 'YTD'
    }, {
        step: 'year',
        stepmode: 'backward',
        count: 1,
        label: '1y'
    }, {
        step: 'all',
    }],
};

  var layout = {
    title: 'Time series with range slider and selectors',
    xaxis: {
        rangeselector: selectorOptions,
        rangeslider: {}
    },
    yaxis: {
        fixedrange: true
    }
};

Plotly.newPlot('myDiv', data, layout);
   })};
// // A function to update the charts when a selection is made from the dropdown menu

function optionChanged(newSample) {
  visualize(newSample)
}

// Run the init function!

init()