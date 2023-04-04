d3.json('../alldatawithyrinfo.json',function(data) {
    // Extract desired columns from data
    console.log(data)
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
        columnwidth: [50, 500, 500, 100, 100],
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
        line: {color: 'black', width: 1},
        font: {family: "Arial", size: 14, color: ["black"]},
        // columnwidth: 300
        }
    }]);
    
    // Filter table based on selected year
    d3.select("#selTableYear").on("change", function() {
        var selectedYear = d3.select("#selTableYear").node().value;
        var filteredData = data.filter(function(d) {
            return d.Year == selectedYear;
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
    });


