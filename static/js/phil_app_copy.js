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
    for (let i = 0; i < countryofInterest.length; i++) {
      years.push(countryofInterest[i].Year)
      happinessScore.push(countryofInterest[i].Score)
    };




    // var trace2 = {
    //   type: "scatter",
    //   mode: "lines",
    //   name: 'AAPL High',
    //   fill: 'tonexty',
    //   x: frames[5].data[1].x,
    //   y: frames[5].data[1].y,
    //   line: {color: 'grey'}
    // }
  
    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: 'Happiness Score',
      x: years,
      y: happinessScore,
      line: {color: 'lightgrey'}
    }

    Plotly.newPlot('myDiv', [trace1])

    });
  // });
};


// // A function to update the charts when a selection is made from the dropdown menu

function optionChanged(newSample) {
  visualize(newSample)
}

// Run the init function!

init()