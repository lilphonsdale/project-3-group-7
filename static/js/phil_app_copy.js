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

      //Use the first sampleId to generate the first charts

    let firstCountry = countryIDs[0];
    visualize(firstCountry)
  }
  )};

// make the charts

function visualize(country) {
   d3.json(report).then((data) => {
    let countryofInterest = data.filter(x => x.Country == country);
    console.log(countryofInterest)
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

    var trace4 = {
      type: "scatter",
      mode: "lines",
      name: 'Generosity',
      x: years,
      y: generosity,
      line: {color: 'blue'}
    }

    var trace3 = {
      type: "scatter",
      mode: "lines",
      name: 'Freedom',
      x: years,
      y: freedom,
      line: {color: 'red'}
    }

    var trace2 = {
      type: "scatter",
      mode: "lines",
      name: 'Family',
      x: years,
      y: family,
      line: {color: 'green'}
    }
  
    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: 'Happiness Score',
      x: years,
      y: happinessScore,
      line: {color: 'lightgrey'}
    }

    var traces = [trace1, trace2, trace3, trace4]

    Plotly.newPlot('myDiv', traces)

    });
  // });
};


// // A function to update the charts when a selection is made from the dropdown menu

function optionChanged(newSample) {
  visualize(newSample)
}

// Run the init function!

init()