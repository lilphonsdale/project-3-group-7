// populate the default dashboard with an init function

report = "../data/alldatawithyrinfo.json"

function init() {
  d3.json(report).then((data) => {
    console.log(data)

      // Add the country Ids to the dropdown menu
      let countryIDs = data.map(x => x.Country)

      var choices = d3.select("#PhilselDataset");
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
    gdp = []
    trust = []
    life = []

    for (let i = 0; i < countryofInterest.length; i++) {
      years.push(countryofInterest[i].Year)
      happinessScore.push(countryofInterest[i].Score)
      family.push(countryofInterest[i].Family)
      freedom.push(countryofInterest[i].Freedom)
      generosity.push(countryofInterest[i].Generosity)
      gdp.push(countryofInterest[i].GDP)
      trust.push(countryofInterest[i].GovernmentTrust)
      life.push(countryofInterest[i].LifeExpectancy)
    };

// traces for the lines on the chart

  var trace7 = {
    type: "scatter",
    mode: "lines",
    name: 'GDP',
    x: years,
    y: gdp,
    stackgroup: 'one'
  }

  var trace6 = {
    type: "scatter",
    mode: "lines",
    name: 'Government Trust',
    x: years,
    y: trust,
    stackgroup: 'one'
  }

  var trace5 = {
    type: "scatter",
    mode: "lines",
    name: 'Life Expenctancy',
    x: years,
    y: life,
    stackgroup: 'one'
  }

    var trace4 = {
      type: "scatter",
      mode: "lines",
      name: 'Generosity',
      x: years,
      y: generosity,
      stackgroup: 'one'
    }
    
    var trace3 = {
      type: "scatter",
      mode: "lines",
      name: 'Freedom',
      x: years,
      y: freedom,
      stackgroup: 'one'
    }

    var trace2 = {
      type: "scatter",
      mode: "lines",
      name: 'Family',
      x: years,
      y: family,
      stackgroup: 'one'
    }
  
    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: 'Happiness Score',
      x: years,
      y: happinessScore,
      fill: 'tozeroy'
    }

    var traces = [trace1, trace2, trace3, trace4, trace5, trace6, trace7]

// adding a slider

  var layout = {
    title: 'Time series with range slider',
    width: 900,
    height: 900,
    colorway : ['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69'],
    xaxis: {
        rangeslider: {},
        nticks: 5,
    },
    yaxis: {
        fixedrange: true,
        range: [0,8],
    }
};
Plotly.newPlot('Phil', traces, layout);
})};

// // A function to update the charts when a selection is made from the dropdown menu

function optionChanged(newCountry) {
  visualize(newCountry);
}

// Run the init function!

init()