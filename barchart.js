report = "data/alldatawithyrinfo.json"

function init() {
    d3.json(report).then((data) => {
      console.log(data)

      let regionIDs = data.map(x => x.Region)
  
  
  
        var choices = d3.select("#AthiaselDataset");
        Object.entries(regionIDs).forEach(([k,v]) => {
        choices.append("option").attr("value", v).text(v)});
  
  
      let firstRegion = regionIDs[0];
      visualize(firstRegion)
    }
    )};
  
  function visualize(region) {
     d3.json(report).then((data) => {
      let regionofInterest = data.filter(x => x.Region == region);
      console.log(regionofInterest);
      happinessScore = [0,0,0,0,0]
      years = [2015, 2016, 2017, 2018, 2019]
      economy = [0,0,0,0,0]
      family = [0,0,0,0,0]
      freedom = [0,0,0,0,0]
      generosity = [0,0,0,0,0]
      health = [0,0,0,0,0]
      trust = [0,0,0,0,0]
      dystopiaResidual = [0,0,0,0,0]
      console.log(regionofInterest[0])
      for (let i = 0; i < regionofInterest.length; i++) {
        if (regionofInterest[i].Year==2015){
          happinessScore[0]+=regionofInterest[i].Score
          economy[0]+=regionofInterest[i].GDP
          freedom[0]+=regionofInterest[i].Freedom
          family[0]+=regionofInterest[i].Family
          generosity[0]+=regionofInterest[i].Generosity
          health[0]+=regionofInterest[i].LifeExpectancy
          dystopiaResidual[0]+=regionofInterest[i].DystopiaResidual
          trust[0]+=regionofInterest[i].GovernmentTrust
          
        } else if (regionofInterest[i].Year == 2016){
          happinessScore[1]+=regionofInterest[i].Score
          freedom[1]+=regionofInterest[i].Freedom
          economy[1]+=regionofInterest[i].GDP
          family[1]+=regionofInterest[i].Family
          generosity[1]+=regionofInterest[i].Generosity
          health[1]+=regionofInterest[i].LifeExpectancy
          dystopiaResidual[1]+=regionofInterest[i].DystopiaResidual
          trust[1]+=regionofInterest[i].GovernmentTrust

        } else if (regionofInterest[i].Year == 2017){
          happinessScore[2]+=regionofInterest[i].Score
          freedom[2]+=regionofInterest[i].Freedom
          economy[2]+=regionofInterest[i].GDP
          family[2]+=regionofInterest[i].Family
          generosity[2]+=regionofInterest[i].Generosity
          health[2]+=regionofInterest[i].LifeExpectancy
          dystopiaResidual[2]+=regionofInterest[i].DystopiaResidual
          trust[2]+=regionofInterest[i].GovernmentTrust

        } else if (regionofInterest[i].Year == 2018){
          happinessScore[3]+=regionofInterest[i].Score
          freedom[3]+=regionofInterest[i].Freedom
          economy[3]+=regionofInterest[i].GDP
          family[3]+=regionofInterest[i].Family
          generosity[3]+=regionofInterest[i].Generosity
          health[3]+=regionofInterest[i].LifeExpectancy
          dystopiaResidual[3]+=regionofInterest[i].DystopiaResidual
          trust[3]+=regionofInterest[i].GovernmentTrust

        } else if (regionofInterest[i].Year == 2019){
          freedom[4]+=regionofInterest[i].Freedom
          happinessScore[4]+=regionofInterest[i].Score
          economy[4]+=regionofInterest[i].GDP
          family[4]+=regionofInterest[i].Family
          generosity[4]+=regionofInterest[i].Generosity
          health[4]+=regionofInterest[i].LifeExpectancy
          dystopiaResidual[4]+=regionofInterest[i].DystopiaResidual
          trust[4]+=regionofInterest[i].GovernmentTrust}




        //happinessScore.push(regionofInterest[i].Score)
        ///years.push(regionofInterest[i].Region)
       /// economy.push(regionofInterest[i].GDP)
        ///family.push(regionofInterest[i].Family)
        ///freedom.push(regionofInterest[i].Freedom)
        ///generosity.push(regionofInterest[i].Generosity)
       /// health.push(regionofInterest[i].Health)
        ///trust.push(regionofInterest[i].GovernmentTrust)
        ///dystopiaResidual.push(regionofInterest[i].DystopiaResidual)
        var trace1 = {
          type: "bar",
          name: 'Generosity',
          x: years,
          y: generosity,
        };
      
        var trace2 = {
          type: "bar",
          name: 'Family',
          x: years,
          y: family,
        };
      
        var trace3 = {
          type: "bar",
          name: 'Freedom',
          x: years,
          y: freedom,
        };
      
        var trace4 = {
          type:"bar",
          name: 'LifeExpectancy',
          x: years,
          y: health,
        };
      
        var trace5 = {
          type: "bar",
          name: "Economy",
          x: years,
          y: economy,
        };
    
        var trace6 = {
          type: "bar",
          name: "Dystopia Residual",
          x: years,
          y: dystopiaResidual
        };
    
        var trace7 = {
          type: "bar",
          name: "Trust",
          x: years,
          y: trust
        };
      
      
        var data = [trace1,trace2,trace3,trace4,trace5,trace6,trace7];
      
        var layout = {
          xaxis: {title: 'Years'},
          yaxis: {title: 'Factors'},
          barmode: 'stack',
          title: 'Happiness Scores by Year'};
      
      Plotly.newPlot('Athia', data, layout);
     }});
 /// console.log(health)

    
     };
  
  function optionChanged(newSample) {
    visualize(newSample)
    console.log(newSample)
  }
  
    
  init()
