let selections = {};

function DashBoardInit() {

    d3.json('../data/alldatawithyrinfo.json').then(function (data) {
        console.log(data[2]);

        let firstdataset = data[0];
        let seconddataset = data[1];
        let country_names = [];
        for (let i = 0; i < 146; i++) {
            // Variable to hold current movie in loop
            country_names.push(data[i].Country);
        }
        let drop_menu = d3.select("#country1");
        country_names.forEach(function (country_names) {
            drop_menu.append("option").text(country_names);
        });

        let year_list = ['2015', '2016', '2017', '2018', '2019'];

        let drop_menu_two = d3.select("#country2");
        country_names.forEach(function (country_names) {
            drop_menu_two.append("option").text(country_names);
        });

        let year_menu = d3.select("#year1");
        year_list.forEach(function (year_list) {
            year_menu.append("option").text(year_list);
        });

        let year_menu_two = d3.select("#year2");
        year_list.forEach(function (year_list) {
            year_menu_two.append("option").text(year_list);
        });

        dataforplot = [{
            type: 'scatterpolar',
            r: [firstdataset.Family, firstdataset.Freedom, firstdataset.GDP, firstdataset.Generosity, firstdataset.GovernmentTrust, firstdataset.LifeExpectancy],
            theta: ['Family', 'Freedom', 'GDP Per Capita', 'Generosity', 'Government Trust', 'Life Expecancy'],
            fill: 'toself',
            name: firstdataset.Country,
            opacity: 1
        },
        {
            type: 'scatterpolar',
            r: [seconddataset.Family, seconddataset.Freedom, seconddataset.GDP, seconddataset.Generosity, seconddataset.GovernmentTrust, seconddataset.LifeExpectancy],
            theta: ['Family', 'Freedom', 'GDP Per Capita', 'Generosity', 'Government Trust', 'Life Expecancy'],
            fill: 'toself',
            name: firstdataset.Country,
            opacity: 1
        }
        ]
        layout = {
            polar: {
                radialaxis: {
                    visible: true,
                    range: [0, 1.5]
                }
            },
            showlegend: true
        }

        Plotly.newPlot("Ezgidiv", dataforplot, layout)

        var initial_country = country_names[0];
        selections = {
            country1: initial_country,
            year1: year_list[0],
            country2: initial_country
        }
        optionChanged('year2', year_list[0]);
    });

}
DashBoardInit()

function optionChanged(param, selected_value) {

    // update selections with new value
    selections[param] = selected_value;

    // display results
    d3.json('../data/alldatawithyrinfo.json').then(function (data) {

        let countryvalues1 = data.filter((x) => x.Country == selections['country1'] && x.Year == selections['year1']);
        let countryvalues2 = data.filter((x) => x.Country == selections['country2'] && x.Year == selections['year2']);

        
         let familyval1 = countryvalues1[0].Family;
         let freedomval1 = countryvalues1[0].Freedom;
         let gdpval1 = countryvalues1[0].GDP;
         let generosityval1 = countryvalues1[0].Generosity;
         let trustval1 = countryvalues1[0].GovernmentTrust;
         let lifeval1 = countryvalues1[0].LifeExpectancy;

         let familyval2 = countryvalues2[0].Family;
         let freedomval2 = countryvalues2[0].Freedom;
         let gdpval2 = countryvalues2[0].GDP;
         let generosityval2 = countryvalues2[0].Generosity;
         let trustval2 = countryvalues2[0].GovernmentTrust;
         let lifeval2 = countryvalues2[0].LifeExpectancy;

        dataforplot = [{
            type: 'scatterpolar',
            r: [familyval1, freedomval1, gdpval1, generosityval1, trustval1, lifeval1],
            theta: ['Family', 'Freedom', 'GDP Per Capita', 'Generosity', 'Government Trust', 'Life Expecancy'],
            fill: 'toself',
            name: selections['country1'],
            opacity: 1
        },
        {
            type: 'scatterpolar',
            r: [familyval2, freedomval2, gdpval2, generosityval2, trustval2, lifeval2],
            theta: ['Family', 'Freedom', 'GDP Per Capita', 'Generosity', 'Government Trust', 'Life Expecancy'],
            fill: 'toself',
            name: selections['country2'],
            opacity: 1
        }
        ]
        layout = {
            polar: {
                radialaxis: {
                    visible: true,
                    range: [0, 1.5]
                }
            },
            showlegend: true
        }

        Plotly.newPlot("Ezgidiv", dataforplot, layout)

        demo_html = `${selections['country1']} in ${selections['year1']}: ${countryvalues1[0].Rank}<br>${selections['country2']} in ${selections['year2']}: ${countryvalues2[0].Rank}`;
        console.log(demo_html);
        var demo_div =  d3.select("#sample-metadata");
        demo_div.html(demo_html);

    });

}