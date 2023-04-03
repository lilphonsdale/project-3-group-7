// populate the default dashboard with an init function

report = "../alldatawithyrinfo.json"
// report = "../data/alldatawithyrinfo.json"

years = [2015, 2016, 2017, 2018, 2019]

function init() {
  d3.json(report).then((data) => {
    console.log(data)

    // Get Countries
    var countries_list = []
    for (var i = 0; i < data.length; i++) {
      var country= data[i].Country
      if (countries_list.includes(country) == false){
        countries_list.push(country);
      }
    };

    //append to dropdown
    var choices = d3.select("#MarcselDataset");
    Object.entries(countries_list).forEach(([k,v]) => {
    choices.append("option").attr("value", v).text(v)});
    
    //Use the first sampleId to generate the first charts
    let firstSample = countries_list[0];
    visualize_pie_chart(firstSample)
  }
)};

// // make the charts
function visualize_pie_chart(sample) {
   d3.json(report).then((data) => {

    let sampleofInterest = data.filter(x => x.Country == sample);

    var DystopiaResidual_list = [];
    var Family_list = [];
    var Freedom_list = [];
    var GDP_list = [];
    var Generosity_list = [];
    var GovernmentTrust_list = [];
    var LifeExpectancy_list = [];

    // Get Results for specific Country Selected
    for (var i = 0; i < years.length; i++) {

      DystopiaResidual_list.push(sampleofInterest[i].DystopiaResidual);
      Family_list.push(sampleofInterest[i].Family);
      Freedom_list.push(sampleofInterest[i].Freedom);
      GDP_list.push(sampleofInterest[i].GDP);
      Generosity_list.push(sampleofInterest[i].Generosity);
      GovernmentTrust_list.push(sampleofInterest[i].GovernmentTrust);
      LifeExpectancy_list.push(sampleofInterest[i].LifeExpectancy);

      // var Rank_x= sampleofInterest[i].Rank;
      // var Region_x = sampleofInterest[i].Region;
      // var Score_x= sampleofInterest[i].Score;
    };
    
    // Getting Average of each Column
    lists = [DystopiaResidual_list,Family_list,Freedom_list, GDP_list,Generosity_list,GovernmentTrust_list,LifeExpectancy_list];
    var average_results_list = []
    
    for (var z = 0; z < lists.length; z++) {
      var selected_list = lists[z];
      var total = 0;
      for(var i = 0; i < selected_list.length; i++) {
          total += selected_list[i]
      };
      var avg = total / selected_list.length;
      average_results_list.push(avg);
    };

// create a trace for the bar chart
    var pie_data = [{
      values: average_results_list,
      labels: ['Dystopia Residual', 'Non-ResEconomy (GDP per Capita)', 'Family', 'Freedom', 'Generosity','Health (Life Expectancy)', 'Trust (Government Corruption)'],
      type: 'pie',
      // colorscale: 'Portland',
      name: sample,
      hoverinfo:'sample',
      hole: .4, 
    }];

    pie_layout = {
        title: "<b> Happiness Score Over Last 5 Years<b>",
        annotations: [
          {
            font: {size: 7},
            showarrow: false,
            text: sample + ' Average Scores',
            x: 0.5,
            y: 0.5
          },]
    };
    Plotly.newPlot("Marc", pie_data, pie_layout);
    
  })
}

// A function to update the charts when a selection is made from the dropdown menu
function optionChanged(newSample) {
  visualize_pie_chart(newSample)
};

// Run the init function!
init();