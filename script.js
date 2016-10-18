var w = 500,
    h = 500;

var colorscale = d3.scale.category20();

//Legend titles
var LegendOptions = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];



//Data
var d = [
    [
        {axis:"Eating",value:0.166},
        {axis:"Enter Home",value:0.177},
        {axis:"Meal Preparation",value:0.25},
        {axis:"Sleeping",value:0.2708},
        {axis:"Wash Dishes",value:0.1145},
        {axis:"Work",value:0.1354}
    ],[
        {axis:"Eating",value:0.1770},
        {axis:"Enter Home",value:0.1979},
        {axis:"Meal Preparation",value:0.40625},
        {axis:"Sleeping",value:0.2291},
        {axis:"Wash Dishes",value:0.09375},
        {axis:"Work",value:0.0625}
    ],[
        {axis:"Eating",value:0.1458},
        {axis:"Enter Home",value:0.15625},
        {axis:"Meal Preparation",value:0.375},
        {axis:"Sleeping",value:0.1875},
        {axis:"Wash Dishes",value:0.1458},
        {axis:"Work",value:0.125}
    ],[
        {axis:"Eating",value:0.1458},
        {axis:"Enter Home",value:0.2708},
        {axis:"Meal Preparation",value:0.4270},
        {axis:"Sleeping",value:0.28125},
        {axis:"Wash Dishes",value:0.1041},
        {axis:"Work",value:0.125}
    ],[
        {axis:"Eating",value:0.1875},
        {axis:"Enter Home",value:0.2916},
        {axis:"Meal Preparation",value:0.2291},
        {axis:"Sleeping",value:0.2395},
        {axis:"Wash Dishes",value:0.125},
        {axis:"Work",value:0.2291}
    ],[
        {axis:"Eating",value:0.125},
        {axis:"Enter Home",value:0.1666},
        {axis:"Meal Preparation",value:0.28125},
        {axis:"Sleeping",value:0.2604},
        {axis:"Wash Dishes",value:0.1041},
        {axis:"Work",value:0.1770}
    ],[
        {axis:"Eating",value:0.1666},
        {axis:"Enter Home",value:0.1145},
        {axis:"Meal Preparation",value:0.3541},
        {axis:"Sleeping",value:0.1770},
        {axis:"Wash Dishes",value:0.0833},
        {axis:"Work",value:0.15625}
    ]
];

var d2 = [
    [
        {axis:"Eating",value:0.125},
        {axis:"Enter Home",value:0.1666},
        {axis:"Meal Preparation",value:0.28125},
        {axis:"Sleeping",value:0.2604},
        {axis:"Wash Dishes",value:0.1041},
        {axis:"Work",value:0.1770}
    ],[
        {axis:"Eating",value:0.1666},
        {axis:"Enter Home",value:0.1145},
        {axis:"Meal Preparation",value:0.3541},
        {axis:"Sleeping",value:0.1770},
        {axis:"Wash Dishes",value:0.0833},
        {axis:"Work",value:0.15625}
    ]
];





//Options for the Radar chart, other than default
var mycfg = {
    w: w+250,
    h: h+250,
    maxValue: 0.1,
    levels: 5,
    ExtraWidthX: 200
}

//Call function to draw the Radar chart
//Will expect that data is in %'s
RadarChart.draw("#chart", d, mycfg);


////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

var svg = d3.select('#body')
    .selectAll('svg')
    .append('svg')
    .attr("width", w+500)
    .attr("height", h)


//Create the title for the legend
var text = svg.append("text")
    .attr("class", "title")
    .attr('transform', 'translate(275,300)')
    .attr("x", w - 70)
    .attr("y", 10)
    .attr("font-size", "12px")
    .attr("font-family","Arial")
    .attr("fill", "#C9DCB3")
    .text("Percentage per activity");

//Initiate Legend	
var legend = svg.append("g")
        .attr("class", "legend")
        .attr("height", 100)
        .attr("width", 200)
        .attr('transform', 'translate(275,320)')
    ;
//Create colour squares
legend.selectAll('rect')
    .data(LegendOptions)
    .enter()
    .append("rect")
    .attr("x", w - 65)
    .attr("y", function(d, i){ return i * 20;})
    .attr("width", 10)
    .attr("height", 10)
    .on('mouseover',function(d)
    {

        legend.selectAll('rect')
            .style("fill-opacity",.3)
            .style("stroke-opacity", .3);




    })
    .style("fill", function(d, i){ return colorscale(i);})
;
//Create text next to squares
legend.selectAll('text')
    .data(LegendOptions)
    .enter()
    .append("text")
    .attr("x", w - 52)
    .attr("y", function(d, i){ return i * 20 + 9;})
    .attr("font-size", "13px")
    .attr("font-family","Arial")
    .attr("fill", "#F2F6D0")
    .text(function(d) { return d; })
;
