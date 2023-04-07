// console.log("hello world")
report = "../data/alldatawithyrinfo.json"

sel_year = ""
sel_country = ""

function init(){
    d3.json(report).then(function(data) {
        // Extract desired columns from data
        // console.log(data)
        // console.log('happy world')

        //setup year drop down
        let years = ["","2015","2016","2017","2018","2019"]
        let drop_menu = d3.select("#YemiselDataset");
        years.forEach(function (years) {
            drop_menu.append("option").text(years);
        });


        let country_names = [''];
        for (let i = 0; i < 146; i++) {
            // Variable to hold current movie in loop
            country_names.push(data[i].Country);
        }
        let drop_menu_2 = d3.select("#YemiselCountry");
        country_names.forEach(function (country_names) {
            drop_menu_2.append("option").text(country_names);
        });


        printTable()
    
    });

};

init()

function printTable(){
    if(sel_year != ""){
        yemi_optionChanged(sel_year);
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
        var table = Plotly.newPlot('Yemi', [{
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
            line: {width: 1, color: '#808080'},
            fill: {color: "white"},
            font: {family: "verdana, arial, sans-serif", size: 12, color: "#444444"},
            // columnwidth: 300
            }
        }]);
    
    });

};


function yemi_optionChanged(selected_value){
    sel_year = selected_value

    if(sel_country != '' && selected_value == ""){
        yemi_countryProbe(sel_country);
        return;

    }
    
    if(selected_value == ""){
        printTable()
        return
    }

    if(sel_country != ''){
        yemi_countryProbe(sel_country);
        return;

    }

    

    d3.json(report).then(function(data) {
        var columns = ['Rank', 'Country', 'Region', 'Score', 'Year'];
    

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

        Plotly.update('Yemi', {
            cells: {
                values: Object.values(transposedFilteredData)
            }
        });
    
    });
}


function yemi_countryProbe(selected_country){
    // drop_menu.select('option').text('')
    
    sel_country = selected_country;
    // console.log(sel_year);
    // console.log(sel_country);

    if(selected_country == "" && sel_year == ""){
        printTable();
        return;
    } else if(selected_country == ''){
        yemi_optionChanged(sel_year);
        return;

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
            if(sel_year == ""){
                return d.Country == selected_country;
            } else {
                return d.Country == selected_country && d.Year == sel_year;
            }
            // return d.Country == selected_country;
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

    
        // Transpose filtered data to display rows as columns
        var transposedFilteredData = {};
        columns.forEach(function(column) {
            transposedFilteredData[column] = filteredTableData.map(function(d) {
                return d[column];
            });
        });

        Plotly.update('Yemi', {
            cells: {
                values: Object.values(transposedFilteredData)
            }
        });
    
    });
}