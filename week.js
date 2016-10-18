/**
 * Created by Mario Cifuentes on 17/10/2016.
 */
/**
 * Created by Mario Cifuentes on 17/10/2016.
 */
/**
 * Created by Mario Cifuentes on 17/10/2016.
 */
console.log(monday);

var clockGroupWeek, fields, formatHour, formatMinute, formatSecond, height, offSetX, offSetY, pi, renderWeek, scaleHours, scaleSecsMins, vis, width;

var radius = 80;
var tickLength = 10;
var fromClock = 0.25;
var toClock = 1;
var circleDegree = 360;

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
    console.log(p);
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


console.log( hourToDec("9:30-11:30"));

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




width = 400;

height = 200;

offSetX = 100;

offSetY = 100;

pi = Math.PI;

scaleSecsMins = d3.scale.linear()
    .domain([0, 59 + 59 / 60])
    .range([0, 2 * pi]);

scaleHours = d3.scale.linear()
    .domain([0, 23 + 59 / 60])
    .range([0, 2 * pi]);

vis = d3.selectAll(".week")
    .append("svg:svg")
    .attr("width", width)
    .attr("height", height);

clockGroupWeek = vis.append("svg:g")
    .attr("transform", "translate(" + offSetX + "," + offSetY + ")");

var hourScale = d3.scale.linear()
    .range([0,330])
    .domain([0,11]);




colors = ['green', 'blue', 'yellow', 'red', 'purple','#E53D00'];
arcs = [[],[],[],[],[],[]];

for (i = 0; i < week.length; i++) {
    console.log(week[i][1].Activity);
    for (j = 0; j < week[i].length; j++) {
        console.log(week[i][j].intervalo);
        var arc = d3.svg.arc()
            .innerRadius(0)
            .outerRadius(radius)
            .startAngle(clockToRad(hourToDec(week[i][j].intervalo)[0], -1))
            .endAngle(clockToRad(hourToDec(week[i][j].intervalo)[1], 1));
        arcs[i][j] = arc;
        clockGroupWeek.append('path')
            .attr('d', arcs[i][j])
            .attr("class", week[i][j].Activity)
            .style('fill', colors[i])
            .style("stroke", colors[i])
            .style("fill-opacity", .8)
            .style("stroke-opacity", .9)
            .on('mouseover',function(d)
            {
                z='path.'+d3.select(this).attr("class");
                clockGroupWeek.selectAll('path')
                    .style("fill-opacity",.3)
                    .style("stroke-opacity", .3);

                clockGroupWeek.selectAll(z)
                    .style("fill-opacity", .9)
                    .style("stroke-opacity", 1);


            }).on('mouseout', function(){
                clockGroupWeek.selectAll('path')
                    .style("fill-opacity", .8)
                    .style("stroke-opacity", .9);})
            .append('svg:image');
    }
}




clockGroupWeek.append("svg:circle")
    .attr("r", radius)
    .attr("fill", "none")
    .attr("class", "clock outercircle")
    .attr("stroke", "white")
    .attr("stroke-width", 2);

clockGroupWeek.append("svg:circle")
    .attr("r", radius+0.5)
    .attr("fill", "none")
    .attr("class", "clock outercircle")
    .attr("stroke", "black")
    .attr("stroke-width", 2);



clockGroupWeek.append('g')
    .attr('class', 'ticks')
    .selectAll('path')
    .data(splitDegrees(24))
    .enter()
    .append('path')
    .attr('d', function(d) {
        var coord = {
            outer: getCoordFromCircle(d, 0, 0, radius),
            inner: getCoordFromCircle(d, 0, 0, radius - tickLength)
        };
        return 'M' + coord.outer[0] + ' ' + coord.outer[1] + 'L' + coord.inner[0] + ' ' + coord.inner[1] + 'Z';
    })
    .attr('stroke', 'black')


clockGroupWeek.append('g')
    .attr('class', 'ticks')
    .selectAll('path')
    .data(splitDegrees(12))
    .enter()
    .append('path')
    .attr('d', function(d) {
        var coord = {
            outer: getCoordFromCircle(d, 0, 0, radius-40),
            inner: getCoordFromCircle(d, 0, 0, radius - 40 -tickLength)
        };
        return 'M' + coord.outer[0] + ' ' + coord.outer[1] + 'L' + coord.inner[0] + ' ' + coord.inner[1] + 'Z';
    })
    .attr('stroke', 'gray');




clockGroupWeek.append("svg:circle")
    .attr("r", 4)
    .attr("fill", "black")
    .attr("class", "clock innercircle");


var w = 500,
    h = 500;

var text = clockGroupWeek.append("text")
    .attr("class", "title")
    .attr('transform', 'translate(-300,-90)')
    .attr("x", w - 70)
    .attr("y", 10)
    .attr("font-size", "20px")
    .attr("font-family","Arial")
    .attr("fill", "Black")
    .text("Week");

var legend = clockGroupWeek.append('g')
        .attr("class", "legend")
        .attr("height", 100)
        .attr("width", 200)
        .attr('transform', 'translate(-300,-70)')
    ;

for (i = 0; i < week.length; i++) {
    console.log(week[i][1].Activity);
    //Create colour squares
    legend.append("rect")
        .attr("class", week[i][1].Activity)
        .attr("x", w - 65)
        .attr("y", i*20)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", colors[i])
        .on('mouseover',function(d)
        {
            z='path.'+d3.select(this).attr("class");
            clockGroupWeek.selectAll('path')
                .style("fill-opacity",.05)
                .style("stroke-opacity", .6);

            clockGroupWeek.selectAll(z)
                .style("fill-opacity", .7)
                .style("stroke-opacity", 1);


        }).on('mouseout', function(){
            clockGroupWeek.selectAll('path')
                .style("fill-opacity",.8)
                .style("stroke-opacity", .9);});

    //Create text next to squares
    legend.append("text")
        .attr("class", week[i][1].Activity)
        .attr("x", w - 52)
        .attr("y", 10 + i*20)
        .attr("font-size", "12px")
        .attr("font-family","Arial")
        .attr("fill", "black")
        .text(week[i][1].Activity)
        .on('mouseover',function(d)
        {
            z='path.'+d3.select(this).attr("class");
            clockGroupWeek.selectAll('path')
                .style("fill-opacity",.05)
                .style("stroke-opacity", .6);

            clockGroupWeek.selectAll(z)
                .style("fill-opacity", .7)
                .style("stroke-opacity", 1);


        }).on('mouseout', function(){
            clockGroupWeek.selectAll('path')
                .style("fill-opacity",.8)
                .style("stroke-opacity", .9);});

}
renderWeek = function(data) {
    var hourArc, minuteArc, secondArc;
    clockGroupWeek.selectAll(".clockhand").remove();
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

    clockGroupWeek.selectAll(".clockhand")
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
    return renderWeek(data);
}, 1000);


