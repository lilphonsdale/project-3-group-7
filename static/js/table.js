console.log("hello world")
report = "../data/alldatawithyrinfo.json"


function init(){
    d3.json(report).then(function(data) {
        // Extract desired columns from data
        console.log(data)
        console.log('happy world')

        //setup year drop down
        let years = ["","2015","2016","2017","2018","2019"]
        let drop_menu = d3.select("#YemiselDataset");
        years.forEach(function (years) {
            drop_menu.append("option").text(years);
        });

        printTable()
    
    });

};

init()

function printTable(){
    d3.json(report).then(function(data) {
        var columns = ['Rank', 'Country', 'Region', 'Score', 'Year'];
        var tableData = data.map(function(d) {
            return {
            Rank: d.Rank,
            Country: d.Country,
            Region: d.Region,
            Score: d.Score,
            Year: d.Year
            };
        });
        
        // Sort table data by rank
        tableData.sort(function(a, b) {
            return a.Rank - b.Rank;
        });
        
            // Transpose the data to display rows as columns
        var transposedData = {};
        columns.forEach(function(column) {
            transposedData[column] = tableData.map(function(d) {
                return d[column];
            });
        });
    
        // Create initial table with all data
        var table = Plotly.newPlot('table', [{
            type: 'table',
            columnwidth: [300, 500, 700, 500],
            header: {
            values: columns,
            align: 'center',
            line: {width: 1, color: 'black'},
            fill: {color: "#1f77b4"},
            font: {family: "Arial", size: 14, color: "white"},
            // columnwidth: 300
            },
            cells: {
            values: Object.values(transposedData),
            align: 'center',
            line: {width: 1, color: 'black'},
            fill: {color: "white"},
            font: {family: "verdana, arial, sans-serif", size: 12, color: "#444444"},
            // columnwidth: 300
            }
        }]);
    
    });

};

function yemi_optionChanged(selected_value){
    if(selected_value == ""){
        printTable()
        return
    }

    d3.json(report).then(function(data) {
        var columns = ['Rank', 'Country', 'Region', 'Score', 'Year'];
        var tableData = data.map(function(d) {
            return {
            Rank: d.Rank,
            Country: d.Country,
            Region: d.Region,
            Score: d.Score,
            Year: d.Year
            };
        });

        var filteredData = data.filter(function(d) {
            return d.Year == selected_value;
        });
        var filteredTableData = filteredData.map(function(d) {
        return {
            Rank: d.Rank,
            Country: d.Country,
            Region: d.Region,
            Score: d.Score,
            Year: d.Year
        };
        });
        filteredTableData.sort(function(a, b) {
            return a.Rank - b.Rank;
        });
    
        // Transpose filtered data to display rows as columns
        var transposedFilteredData = {};
        columns.forEach(function(column) {
            transposedFilteredData[column] = filteredTableData.map(function(d) {
                return d[column];
            });
        });

        Plotly.update('table', {
            cells: {
                values: Object.values(transposedFilteredData)
            }
        });
    
    });
}
