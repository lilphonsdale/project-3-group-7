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
    dystopia = []
    gdp = []
    trust = []
    life = []

    for (let i = 0; i < countryofInterest.length; i++) {
      years.push(countryofInterest[i].Year)
      happinessScore.push(countryofInterest[i].Score)
      family.push(countryofInterest[i].Family)
      freedom.push(countryofInterest[i].Freedom)
      generosity.push(countryofInterest[i].Generosity)
      dystopia.push(countryofInterest[i].DystopiaResidual)
      gdp.push(countryofInterest[i].GDP)
      trust.push(countryofInterest[i].GovernmentTrust)
      life.push(countryofInterest[i].LifeExpectancy)

    };
    
  ////// OPTION 1 - ANIMATION

  // var frames = [];
  // for (i = 0; i < 5; i++) {
  //   frames.push({
  //     name: years[i],
  //     data: (years[i], happinessScore[i])
  //   })
  // }

  // // Now create slider steps, one for each frame. The slider
  // // executes a plotly.js API command (here, Plotly.animate).
  // // In this example, we'll animate to one of the named frames
  // // created in the above loop.
  // var sliderSteps = [];
  // for (i = 0; i < 5; i++) {
  //   sliderSteps.push({
  //     method: 'animate',
  //     label: years[i],
  //     args: [[years[i]], {
  //       mode: 'immediate',
  //       transition: {duration: 300},
  //       frame: {duration: 300, redraw: false},
  //     }]
  //   });
  // }

  // var layout1 = {
  //   xaxis: {
  //     title: 'Years',
  //     range: [2015, 2019]
  //   },
  //   yaxis: {
  //     title: 'Score',
  //   },
  //   hovermode: 'closest',
	//  // We'll use updatemenus (whose functionality includes menus as
	//  // well as buttons) to create a play button and a pause button.
	//  // The play button works by passing `null`, which indicates that
	//  // Plotly should animate all frames. The pause button works by
	//  // passing `[null]`, which indicates we'd like to interrupt any
	//  // currently running animations with a new list of frames. Here
	//  // The new list of frames is empty, so it halts the animation.
  //   updatemenus: [{
  //     x: 0,
  //     y: 0,
  //     yanchor: 'top',
  //     xanchor: 'left',
  //     showactive: false,
  //     direction: 'left',
  //     type: 'buttons',
  //     pad: {t: 87, r: 10},
  //     buttons: [{
  //       method: 'animate',
  //       args: [null, {
  //         mode: 'immediate',
  //         fromcurrent: true,
  //         transition: {duration: 300},
  //         frame: {duration: 500, redraw: false}
  //       }],
  //       label: 'Play'
  //     }, {
  //       method: 'animate',
  //       args: [[null], {
  //         mode: 'immediate',
  //         transition: {duration: 0},
  //         frame: {duration: 0, redraw: false}
  //       }],
  //       label: 'Pause'
  //     }]
  //   }],
	//  // Finally, add the slider and use `pad` to position it
	//  // nicely next to the buttons.
  //   sliders: [{
  //     pad: {l: 130, t: 55},
  //     currentvalue: {
  //       visible: true,
  //       prefix: 'Year:',
  //       xanchor: 'right',
  //       font: {size: 20, color: '#666'}
  //     },
  //     steps: sliderSteps
  //   }]
  // };

  // // Create the plot:
  // Plotly.newPlot('animation', {
  //   data: traces,
  //   layout: layout1,
  //   frames: frames
  // });


      var frames = []
      var x = years
      var y = happinessScore
    
      var n = 5;
      for (var i = 0; i < n; i++) {
        frames[i] = {d: [{x: [], y: []}]}
        frames[i].d[0].x = x.slice(0, i+1);
        frames[i].d[0].y = y.slice(0, i+1);
      }

      console.log(frames)
    
      Plotly.newPlot('animation', [{
        x: frames[1].d[0].x,
        y: frames[1].d[0].y,
        fill: 'tozeroy',
        type: 'scatter',
        mode: 'lines',
        line: {color: 'green'}
      }], {
        title: "Filled-Area Animation",
        xaxis: {
          // type: 'date',
          range: [
            frames[0].d[0].x[0],
            frames[4].d[0].x[4]
          ]
        },
        yaxis: {
          range: [
            0,
            10
          ]
        },
        updatemenus: [{
          x: 0.1,
          y: 0,
          yanchor: "top",
          xanchor: "right",
          showactive: false,
          direction: "left",
          // type: "buttons",
          // pad: {"t": 87, "r": 10},
          // buttons: [{
          //   method: "animate",
          //   args: [null, {
          //     fromcurrent: true,
          //     transition: {
          //       duration: 0,
          //     },
          //     frame: {
          //       duration: 40,
          //       redraw: false
          //     }
          //   }],
          //   label: "Play"
          // }, {
          //   method: "animate",
          //   args: [
          //     [null],
          //     {
          //       mode: "immediate",
          //       transition: {
          //         duration: 0
          //       },
          //       frame: {
          //         duration: 0,
          //         redraw: false
          //       }
          //     }
          //   ],
          //   label: "Pause",
            sliders: [{
                  pad: {l: 130, t: 55},
                  currentvalue: {
                    visible: true,
                    prefix: 'Year:',
                    xanchor: 'right',
                    font: {size: 20, color: '#666'}
                  },
                  steps: [years]
                }]
          }]
        // }]
        });
      }).then(function() {
        Plotly.addFrames('animation', frames);
      });

///// OPTION 2 - STATIC

  // var trace8 = {
  //   type: "scatter",
  //   mode: "lines",
  //   name: 'Dystopia ',
  //   x: years,
  //   y: dystopia,
  //   line: {color: 'yellow'}
  // }

  var trace7 = {
    type: "scatter",
    mode: "lines",
    name: 'GDP',
    x: years,
    y: gdp,
    line: {color: 'orange'}
  }

  var trace6 = {
    type: "scatter",
    mode: "lines",
    name: 'Government Trust',
    x: years,
    y: trust,
    line: {color: 'lightred'}
  }

  var trace5 = {
    type: "scatter",
    mode: "lines",
    name: 'life Expenctancy',
    x: years,
    y: life,
    line: {color: 'lightblue'}
  }

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
      line: {color: 'lightgrey'},
      fill: 'tonexity'
    }

    var traces = [trace1, trace2, trace3, trace4, trace5, trace6, trace7]

    Plotly.newPlot('static', traces)

// ///// OPTION 3: SLIDER

  var layout2 = {
    title: 'Time series with range slider',
    width: 1000,
    height: 1000,
    xaxis: {
        rangeslider: {}
    },
    yaxis: {
        fixedrange: true
    }
};
Plotly.newPlot('slider', traces, layout2);
};

// // A function to update the charts when a selection is made from the dropdown menu

function optionChanged(newCountry) {
  visualize(newCountry);
}

// Run the init function!

init()