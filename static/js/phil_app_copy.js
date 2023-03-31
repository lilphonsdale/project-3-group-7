// populate the default dashboard with an init function

report = "../alldatawithyrinfo.csv"
report = "../alldatawithyrinfo.json"

function init() {
  d3.json(report).then((data) => {
    console.log(data)

      // Add the sample Ids to the dropdown menu
      // Add the country Ids to the dropdown menu
      let countryIDs = data.map(x => x.Country)

      var choices = d3.select("#selDataset");
      Object.entries(countryIDs).forEach(([k,v]) => {
      choices.append("option").attr("value", v).text(v)});

      //Use the first sampleId to generate the first charts
      //Use the first country to generate the first chart

    let firstCountry = countryIDs[0];
    visualize(firstCountry)
  }
  )};

// make the chart

function visualize(country) {
   d3.csv(report).then((data) => {
    let countryofInterest = data.filter(x => x.country == country);
    let firstCountry = countryofInterest[0]
    let score = firstCountry.Score
    let years = firstCountry.Year
    // let sampleValues = firstSample.sample_values
    // let otuLabels =  firstSample.otu_labels

    d3.csv(report, function(err, rows){

    function unpack(rows, key) {
      return rows.map(function(row) { return row[key]; });
    }
    
      var frames = []
      var x = unpack(rows, score)
      var y = unpack(rows, years)
    
      var n = 100;
      for (var i = 0; i < n; i++) {
        frames[i] = {data: [{x: [], y: []}]}
        frames[i].data[0].x = x.slice(0, i+1);
        frames[i].data[0].y = y.slice(0, i+1);
      }
    
      Plotly.newPlot('myDiv', [{
        x: frames[1].data[0].x,
        y: frames[1].data[0].y,
        fill: 'tozeroy',
        type: 'scatter',
        mode: 'lines',
        line: {color: 'green'}
      }], {
        title: "Filled-Area Animation",
        xaxis: {
          type: 'date',
          range: [
            frames[99].data[0].x[0],
            frames[99].data[0].x[99]
          ]
        },
        yaxis: {
          range: [
            0,
            90
          ]
        },
        updatemenus: [{
          x: 0.1,
          y: 0,
          yanchor: "top",
          xanchor: "right",
          showactive: false,
          direction: "left",
          type: "buttons",
          pad: {"t": 87, "r": 10},
          buttons: [{
            method: "animate",
            args: [null, {
              fromcurrent: true,
              transition: {
                duration: 0,
              },
              frame: {
                duration: 40,
                redraw: false
              }
            }],
            label: "Play"
          }, {
            method: "animate",
            args: [
              [null],
              {
                mode: "immediate",
                transition: {
                  duration: 0
                },
                frame: {
                  duration: 0,
                  redraw: false
                }
              }
            ],
            label: "Pause"
          }]
        }]
      }).then(function() {
        Plotly.addFrames('myDiv', frames);
      });
    
    })
  })};
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

//       var bar_data = [
//         {
//           x: sampleValues.slice(0,10).reverse(),
//           y: otuIds.slice(0, 10).map(otuIds => `OTU ${otuIds}`).reverse(),
//           text: otuLabels.slice(0,10).reverse(),
//           orientation: 'h',
//           type: "bar",
//         }]
//       bar_layout = {
//           title: "<b>Top 10 OTUs found in the individual<b>",
//       }
//     Plotly.newPlot("bar", bar_data, bar_layout);
    
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

  var layout = {
    title: 'Time series with range slider and selectors',
    width: 1000,
    height: 1000,
    xaxis: {
        rangeslider: {}
    },
    yaxis: {
        fixedrange: true
    }
};

Plotly.newPlot('myDiv', data, layout);
   })};
// // A function to update the charts when a selection is made from the dropdown menu

function optionChanged(newCountry) {
  visualize(newCountry);
function optionChanged(newSample) {
  visualize(newSample)
}

// Run the init function!

init()