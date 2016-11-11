var clockGroupFriday, fields, formatHour, formatMinute, formatSecond, height, offSetX, offSetY, pi, renderFriday, scaleHours, scaleSecsMins, vis, width;

var radius = 80;
var tickLength = 10;
var fromClock = 0.25;
var toClock = 1;
var circleDegree = 360;
var intervalo ="";
var actividad ="";

function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

function clockToRad(clock, direction) {
    var unit = circleDegree / 24;
    var degree =  unit * clock;
    return degToRad(degree);
}

function getCoordFromCircle(deg, cx, cy, r) {
    var rad = degToRad(deg);
    var x = cx + r * Math.cos(rad);
    var y = cy + r * Math.sin(rad);
    return [x, y];
}

function splitDegrees(num) {
    var angle = circleDegree / num;
    var degrees = [];

    for (var ang = 0; ang < circleDegree; ang += angle) {
        degrees.push(ang);
    }

    return degrees;
}

function hourToDec(p)
{

    var h= p;
    var hora = p.split("-");
    var horaInicio = hora[0].split(":");
    var inicioHora = horaInicio[0];
    var inicioMinuteDec = horaInicio[1]/60;
    var horaFin = hora[1].split(":");
    var finHora = horaFin[0];
    var finMinuteDec=horaFin[1]/60;


    return [+inicioHora+ +inicioMinuteDec , +finHora + +finMinuteDec];
}




formatSecond = d3.time.format("%S");

formatMinute = d3.time.format("%M");

formatHour = d3.time.format("%H");


fields = function() {
    var d, data, hour, minute, second;
    d = new Date();
    second = d.getSeconds();
    minute = d.getMinutes();
    hour = d.getHours() + minute / 60;
    return data = [{
        "unit": "seconds",
        "text": formatSecond(d),
        "numeric": second
    }, {
        "unit": "minutes",
        "text": formatMinute(d),
        "numeric": minute
    }, {
        "unit": "hours",
        "text": formatHour(d),
        "numeric": hour
    }];
};




width = 800;

height = 400;

offSetX = 200;

offSetY = 200;

pi = Math.PI;

scaleSecsMins = d3.scale.linear()
    .domain([0, 59 + 59 / 60])
    .range([0, 2 * pi]);

scaleHours = d3.scale.linear()
    .domain([0, 23 + 59 / 60])
    .range([0, 2 * pi]);

vis = d3.selectAll(".thursday")
    .append("svg:svg")
    .attr("width", width)
    .attr("height", height);

clockGroupFriday = vis.append("svg:g")
    .attr("transform", "translate(" + offSetX + "," + offSetY + ")");

var hourScale = d3.scale.linear()
    .range([0,330])
    .domain([0,11]);





colors = ['green', 'blue', 'yellow', 'red', 'purple','#E53D00'];
arcs = [[],[],[],[],[],[]];


for (i = 0; i < friday.length; i++) {

    clockGroupFriday.append("svg:circle")
        .attr("r", (radius+120)*(1-((i)*0.1)))
        .attr("fill", "white")
        .attr("class", "clock outercircle")
        .attr("stroke", "black")
        .attr("stroke-opacity", .3)
        .attr("stroke-width", 2);
    for (j = 0; j < friday[i].length; j++) {



        console.log(friday[i][j].intervalo);

        var arc = d3.svg.arc()
            .innerRadius(0)
            .outerRadius((radius+120)*(1-(i*0.1)))
            .startAngle(clockToRad(hourToDec(friday[i][j].intervalo)[0], -1))
            .endAngle(clockToRad(hourToDec(friday[i][j].intervalo)[1], 1));
        arcs[i][j] = arc;
        clockGroupFriday.append('path')
            .attr('d', arcs[i][j])
            .attr("class", friday[i][j].Activity)
            .style('fill', colors[i])
            .style("stroke", colors[i])
            .attr("intervalo",friday[i][j].intervalo)
            .style("fill-opacity", .8)
            .style("stroke-opacity", .9)
            .on('mouseover',function(d)
            {

                actividad = d3.select(this)[0][0].getAttribute('class')
                intervalo = d3.select(this)[0][0].getAttribute('intervalo');

                $('.tooltip').css('left', 5).css('top', 25).css('display', 'block');

                z='path.'+d3.select(this).attr("class");
                clockGroupFriday.selectAll('path')
                    .style("fill-opacity",.3)
                    .style("stroke-opacity", .3);


                clockGroupFriday.selectAll(z)
                    .style("fill-opacity", .9)
                    .style("stroke-opacity", 1);


            }).on('mouseout', function(){
            clockGroupFriday.selectAll('path')
                .style("fill-opacity", .8)
                .style("stroke-opacity", .9);})
            .append('svg:image');
    }

}
clockGroupFriday.append("svg:circle")
    .attr("r", (radius+120)*(1-((friday.length)*0.1)))
    .attr("fill", "white")
    .attr("class", "clock outercircle")
    .attr("stroke", "black")
    .attr("stroke-opacity", .3)
    .attr("stroke-width", 2);


clockGroupFriday.append('g')
    .attr('class', 'ticks')
    .selectAll('path')
    .data(splitDegrees(24))
    .enter()
    .append('path')
    .attr('d', function(d) {
        var coord = {
            outer: getCoordFromCircle(d, 0, 0, radius+120),
            inner: getCoordFromCircle(d, 0, 0, radius - tickLength)
        };
        return 'M' + coord.outer[0] + ' ' + coord.outer[1] + 'L' + coord.inner[0] + ' ' + coord.inner[1] + 'Z';
    })
    .attr('stroke', 'black')
    .attr("stroke-opacity", .3);


clockGroupFriday.selectAll('.minuteLabel')
    .data(d3.range(5,24,5))
    .enter()
    .append('text')
    .attr('class', 'second-label')
    .attr('text-anchor','middle')
    .attr('x',function(d){
        return radius + offSetX;
    })
    .attr('y',function(d){
        return radius + offSetY			})
    .text(function(d){
        return d;
    });


clockGroupFriday.selectAll('.minuteLabel')
    .data(d3.range(5,24,5))
    .enter()
    .append('text')
    .attr('class', 'second-label')
    .attr('text-anchor','middle')
    .attr('x',function(d){
        return radius + offSetX;
    })
    .attr('y',function(d){
        return radius + offSetY			})
    .text(function(d){
        return d;
    });




clockGroupFriday.append("svg:circle")
    .attr("r", 4)
    .attr("fill", "black")
    .attr("class", "clock innercircle");




renderFriday = function(data) {
    var hourArc, minuteArc, secondArc;
    clockGroupFriday.selectAll(".clockhand").remove();
    secondArc = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(70)
        .startAngle(function(d) {
            return scaleSecsMins(d.numeric);
        }).endAngle(function(d) {
            return scaleSecsMins(d.numeric);
        });

    minuteArc = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(70)
        .startAngle(function(d) {
            return scaleSecsMins(d.numeric);
        })
        .endAngle(function(d) {
            return scaleSecsMins(d.numeric);
        });

    hourArc = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(50)
        .startAngle(function(d) {
            return scaleHours(d.numeric % 24);
        }).endAngle(function(d) {
            return scaleHours(d.numeric % 24);
        });

    clockGroupFriday.selectAll(".clockhand")
        .data(data)
        .enter()
        .append("svg:path")
        .attr("d", function(d) {
            if (d.unit === "seconds") {
                return secondArc(d);
            } else if (d.unit === "minutes") {
                return minuteArc(d);
            } else if (d.unit === "hours") {
                return hourArc(d);
            }
        })
        .attr("class", "clockhand")
        .attr("stroke", "black")
        .attr("stroke-width", function(d) {
            if (d.unit === "seconds") {
                return 2;
            } else if (d.unit === "minutes") {
                return 3;
            } else if (d.unit === "hours") {
                return 3;
            }
        })
        .attr("fill", "none");
};

setInterval(function() {
    var data;
    data = fields();
    return renderFriday(data);
}, 1000);

var w = 500,
    h = 500;

var text = clockGroupFriday.append("text")
    .attr("class", "title")
    .attr('transform', 'translate(-300,-90)')
    .attr("x", w +100)
    .attr("y", 0)
    .attr("font-size", "20px")
    .attr("font-family","Arial")
    .attr("fill", "Black")
    .text("Friday");

var text0 = clockGroupFriday.append("text")
    .attr("class", "title")
    .attr('transform', 'translate(-300,-90)')
    .attr("x", w - 204)
    .attr("y", 35)
    .attr("font-size", "15px")
    .attr("font-family","Arial")
    .attr("fill", "Black")
    .text("0");

var text1 = clockGroupFriday.append("text")
    .attr("class", "title")
    .attr('transform', 'translate(-300,-90)')
    .attr("x", w-140 )
    .attr("y", 95)
    .attr("font-size", "15px")
    .attr("font-family","Arial")
    .attr("fill", "Black")
    .text("6");

var text2 = clockGroupFriday.append("text")
    .attr("class", "title")
    .attr('transform', 'translate(-300,-90)')
    .attr("x", w-210 )
    .attr("y", 155)
    .attr("font-size", "15px")
    .attr("font-family","Arial")
    .attr("fill", "Black")
    .text("12");

var text2 = clockGroupFriday.append("text")
    .attr("class", "title")
    .attr('transform', 'translate(-300,-90)')
    .attr("x", w-270 )
    .attr("y", 95)
    .attr("font-size", "15px")
    .attr("font-family","Arial")
    .attr("fill", "Black")
    .text("18");


var legend = clockGroupFriday.append('g')
    .attr("class", "legend")
    .attr("height", 100)
    .attr("width", 200)
    .attr('transform', 'translate(-300,-70)');



for (i = 0; i < friday.length; i++) {
    console.log(friday[i][1].Activity);
    //Create colour squares
    legend.append("rect")
        .attr("class", friday[i][1].Activity)
        .attr("x", w +100)
        .attr("y", i*20)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", colors[i])
        .on('mouseover',function(d)
        {
            z='path.'+d3.select(this).attr("class");
            clockGroupFriday.selectAll('path')
                .style("fill-opacity",.05)
                .style("stroke-opacity", 0.6);

            clockGroupFriday.selectAll(z)
                .style("fill-opacity", .7)
                .style("stroke-opacity", 1);




        }).on('mouseout', function(){
        clockGroupFriday.selectAll('path')
            .style("fill-opacity",.8)
            .style("stroke-opacity", .9);});

    //Create text next to squares
    legend.append("text")
        .attr("class", friday[i][1].Activity)
        .attr("x", w +130)
        .attr("y", 10 + i*20)
        .attr("font-size", "12px")
        .attr("font-family","Arial")
        .attr("fill", "black")
        .text(friday[i][1].Activity)
        .on('mouseover',function(d)
        {
            z='path.'+d3.select(this).attr("class");

            clockGroupFriday.selectAll('path')
                .style("fill-opacity",.05)
                .style("stroke-opacity", .6);

            clockGroupFriday.selectAll(z)
                .style("fill-opacity", .7)
                .style("stroke-opacity", 1);




        }).on('mouseout', function(){
        clockGroupFriday.selectAll('path')
            .style("fill-opacity",.8)
            .style("stroke-opacity", .9);});

}
$('svg g path').tipsy({
    track: true,
    delay: 0,
    html: true,
    title: function() {
        return  actividad + " usually at " + intervalo;
    }
});


/**
 * Created by Mario Cifuentes on 10/11/2016.
 */
