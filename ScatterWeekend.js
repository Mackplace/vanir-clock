/**
 * Created by Mario Cifuentes on 30/10/2016.
 */
var w = 940,
    h = 300,
    pad = 20,
    left_pad = 100,
    Data_url = '/data.json';
var c20 = d3.scale.category20();



var svg = d3.select("#punchcard")
    .append("svg")
	.attr("class","grafica")
	.attr("id", "Gweekendchbx")
    .attr("width", w)
    .attr("height", h);


var text = svg.append("text")
    .attr("class", "title")
    .attr("x", 500)
    .attr("y", 15)
    .attr("font-size", "20px")
    .attr("font-family","Arial")
    .attr("fill", "Black")
    .text("Weekend");




var x = d3.scale.linear().domain([0, 23]).range([left_pad, w-pad]),
    y = d3.scale.linear().domain([0, 6]).range([pad, h-pad*2]);

var xAxis = d3.svg.axis().scale(x).orient("bottom")
        .ticks(24)
        .tickFormat(function (d, i) {
            var m = (d >= 12) ? "p" : "a";
            return (d%12 == 0) ? 12+m :  d%12+m;
        }),
    yAxis = d3.svg.axis().scale(y).orient("left")
        .ticks(7)
        .tickFormat(function (d, i) {
            return ['Sleeping', 'Wash Dishes', 'Work', 'M Preparation', 'Enter Home', 'Eating'][d];
        });

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0, "+(h-pad)+")")
    .call(xAxis);

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate("+(left_pad-pad)+", 0)")
    .call(yAxis);


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



var tempScale = d3.scale.linear()
    .domain([0,24])
    .range(20,940);





function hourToAxis(d)
{

    return d*35.5;

}


function hourPosition(d)
{

    return 100+ d*35.5;


}

function inicialHour(p)
{

    var h= p;
    var hora = p.split("-");
    var horaInicio = hora[0].split(":");
    var inicioHora = horaInicio[0];
    var inicioMinuteDec = horaInicio[1]/60;
    var horaFin = hora[1].split(":");
    var finHora = horaFin[0];
    var finMinuteDec=horaFin[1]/60;
    var tiempoTranscurrido= horaFin[0]-horaInicio[0]
    var horaInicial= +inicioHora+ +inicioMinuteDec;
    var horaFinal = +finHora+ +finMinuteDec;
    var transcurrido= horaFinal-horaInicial;


    return [horaInicial , transcurrido];
}


var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);




var altura= 225;
var colores_g = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00"]
for (i = 0; i <weekeend.length; i++) {

    for (j = 0; j < weekeend[i].length; j++)
    {
        svg.append("rect")
            .attr("x", hourPosition(inicialHour(weekeend[i][j].intervalo)[0]))
            .attr("y",altura)
            .attr("width",hourToAxis(inicialHour(weekeend[i][j].intervalo)[1]))
            .attr("height",20)
            .attr("fill",colores_g[i])
        ;

    }
    altura=altura-41.5;
}












