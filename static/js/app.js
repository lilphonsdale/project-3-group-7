// Identify the source of the data and store it in a variable

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


// populate the default dashboard with an init function

function init() {
  d3.json("samples.json").then((data) => {
    console.log(data)
    let samples = data.samples;

      // Add the sample Ids to the dropdown menu
      let sampleIDs = samples.map(x => x.id)

      var choices = d3.select("#selDataset");
      Object.entries(sampleIDs).forEach(([k,v]) => {
      choices.append("option").attr("value", v).text(v)});

      //Use the first sampleId to generate the first charts

    let firstSample = sampleIDs[0];
    visualize(firstSample)
    describe(firstSample)
  }
)};

// make the charts

function visualize(sample) {
   d3.json(url).then((data) => {
    let samples = data.samples;
    let sampleofInterest = samples.filter(x => x.id == sample);
    let firstSample = sampleofInterest[0]
    let otuIds = firstSample.otu_ids
    let sampleValues = firstSample.sample_values
    let otuLabels =  firstSample.otu_labels

// create a trace for the bar chart

      var bar_data = [
        {
          x: sampleValues.slice(0,10).reverse(),
          y: otuIds.slice(0, 10).map(otuIds => `OTU ${otuIds}`).reverse(),
          text: otuLabels.slice(0,10).reverse(),
          orientation: 'h',
          type: "bar",
        }]
      bar_layout = {
          title: "<b>Top 10 OTUs found in the individual<b>",
      }
    Plotly.newPlot("bar", bar_data, bar_layout);
    
// create a trace for the bubble chart

    var bubble_data = [
      {
      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      mode: 'markers',
      marker: {
        size: sampleValues,
        color: otuIds,
      }}
    ];

    var bubble_layout = {
      title: "<b>Bacteria Cultures Per Sample</b>",
      xaxis: {title: "OTU ID"},
      hovermode: 'closest'
    };

    Plotly.newPlot("bubble", bubble_data, bubble_layout);
  })
}

// Display the sample's metadata/ demographics

function describe(sample) {
  d3.json(url).then((data) => {
    let metadata = data.metadata;
    let sampleInquestion = metadata.filter(x => x.id == sample);
    let theSample = sampleInquestion[0];
    let demographics = d3.select("#sample-metadata");
    demographics.html("");
    Object.entries(theSample).forEach(([k, v]) => {
      demographics.append("h6").text(`${k.toUpperCase()}: ${v}`);
    });
});
}

// A function to update the charts when a selection is made from the dropdown menu

function optionChanged(newSample) {
  visualize(newSample)
  describe(newSample);
}

// Run the init function!

init()

