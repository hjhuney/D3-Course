
// examples
// http://bl.ocks.org/lwhitaker3/e8090246a20d9515789b
// https://bl.ocks.org/jadiehm/8f5adc05465a94e77e30



// create a container for counties
var width = 960,
    height = 600;


var color = d3.scaleSequential(d3.interpolateInferno)
    .domain([45, 20]);
    // .range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]);
var path = d3.geoPath();
var svg = d3.select(".canvas").append("svg")
    .attr("width", width)
    .attr("height", height);

queue()
    .defer(d3.json, "us-states.json")
    .await(ready);

function ready(error, us) {
    if (error) throw error;






    svg.append("g")
        .attr("class", "states")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", path)




    // // add tooltip
    // const tip = d3.tip()
    //     .attr('class', 'tooltip-container')
    //     .html(d => {

    //         let content = `<div class="tooltip-left"><strong>County: </strong><span class="tooltip-right">${countyNames[d.id]}</span></div>`;
    //         content += `<div class="tooltip-left"><strong>Avg Prem: </strong><span class="tooltip-right">$&nbsp${premById[d.id]}</span></div>`;

    //         return content;
    //     })

    // svg.call(tip);

    // // add events
    // svg.selectAll('path')
    //     // mouse hover event
    //     .on('mouseover', (d, i, n) => {
    //         tip.show(d, n[i])
    //         handleMouseOver(d, i, n);
    //     })
    //     // remove mouse hover
    //     .on('mouseout', (d, i, n) => {
    //         tip.hide();
    //         handleMouseOut(d, i, n);
    //     });




    // svg.append("path")
    //     .datum(topojson.mesh(us, us.objects.states, function (a, b) {
    //         return a.id !== b.id;
    //     }))
    //     .attr("class", "states")
    //     .attr("d", path);
};



// // event handlers;
// const handleMouseOver = (d, i, n) => {
//     d3.select(n[i])
//         .transition('changeSliceFill').duration(500)
//         .attr('fill', '#000');
// }

// const handleMouseOut = (d, i, n) => {
//     d3.select(n[i])
//         .transition('changeSliceFill').duration(500)
//         .attr('fill', 'purple');
// }