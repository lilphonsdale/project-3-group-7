function DashBoardInit() {

    d3.json('./data/alldatawithyrinfo.json').then(function (data) {
        console.log(data[2]);
        // if(data[2].Year == 2015){
        //     console.log("number");
        // }
        let firstdataset = data[0]
        let country_names = [];
        for (let i = 0; i < 146; i++) {
            // Variable to hold current movie in loop
            country_names.push(data[i].Country);
        }
        let drop_menu = d3.select("#selDataset");
        country_names.forEach(function (country_names) {
            drop_menu.append("option").text(country_names);
        });

        let year_list = ['2015', '2016', '2017', '2018', '2019'];


        dataforplot = [{
            type: 'scatterpolar',
            r: [firstdataset.Family, firstdataset.Freedom, firstdataset.GDP, firstdataset.Generosity, firstdataset.GovernmentTrust, firstdataset.LifeExpectancy],
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

        Plotly.newPlot("myDiv", dataforplot, layout)

        var initial_country = country_names[0];
        optionChanged(initial_country)
    });

}
DashBoardInit()

function optionChanged(selected_country) {

    // Get Data Set

    d3.json('./data/alldatawithyrinfo.json').then(function (data) {

        let familyval = data.filter((x) => x.Country == selected_country);
        let meanfamilyvalue = (familyval[0].Family + familyval[1].Family + familyval[2].Family + familyval[3].Family + familyval[4].Family)/5;
        let meanfreedomval = (familyval[0].Freedom + familyval[1].Freedom + familyval[2].Freedom + familyval[3].Freedom + familyval[4].Freedom)/5;
        let meangdpval = (familyval[0].GDP + familyval[1].GDP + familyval[2].GDP + familyval[3].GDP + familyval[4].GDP)/5;
        let meangenerosityval = (familyval[0].Generosity + familyval[1].Generosity + familyval[2].Generosity + familyval[3].Generosity + familyval[4].Generosity)/5;
        let meantrustval = (familyval[0].GovernmentTrust + familyval[1].GovernmentTrust + familyval[2].GovernmentTrust + familyval[3].GovernmentTrust + familyval[4].GovernmentTrust)/5;
        let meanlifeval = (familyval[0].LifeExpectancy + familyval[1].LifeExpectancy + familyval[2].LifeExpectancy + familyval[3].LifeExpectancy + familyval[4].LifeExpectancy)/5;

        console.log(familyval);
        console.log(meanfamilyvalue);

        dataforplot = [{
            type: 'scatterpolar',
            r: [meanfamilyvalue, meanfreedomval, meangdpval, meangenerosityval, meantrustval, meanlifeval],
            theta: ['Family','Freedom','GDP Per Capita', 'Generosity', 'Government Trust', 'Life Expecancy'],
            fill: 'toself',
            name: selected_country,
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
          
          Plotly.newPlot("myDiv", dataforplot, layout)

    });

}


