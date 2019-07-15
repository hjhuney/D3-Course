// get viewport dimensions
var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

console.log(viewportWidth);

if (viewportWidth > 960) {
    viewportWidth = 960;
}

if (viewportHeight > 600) {
    viewportHeight = 600;
}

console.log(viewportWidth);

var chartDiv = document.getElementsByClassName("canvas");
var svg = d3.select(chartDiv).append("svg");

function redraw() {

    // Extract the width and height that was computed by CSS.
    var width = chartDiv.clientWidth;
    var height = chartDiv.clientHeight;

    // Use the extracted size to set the size of an SVG element.
    svg
        .attr("width", width)
        .attr("height", height);



    // var color = d3.scaleLinear()
    //     .domain([15.02, 23.04, 26.06, 32.08, 55.10])
    //     .range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]);

    var color = d3.scaleSequential(d3.interpolateInferno)
        .domain([45, 20]);
    // .range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]);
    var path = d3.geoPath();
    var svg = d3.select(".canvas").append("svg")
        .attr("width", width)
        .attr("height", height);

    queue()
        .defer(d3.json, "us-states.json")
        .defer(d3.csv, "dental_prems_v2.csv")
        .await(ready);



    function ready(error, us, dental) {
        if (error) throw error;
        var premById = {};
        dental.forEach(d => {
            premById[d.id] = +d.avg_prem;
        });

        svg.append("g")
            .attr("class", "states")
            .selectAll("path")
            .data(topojson.feature(us, us.objects.states).features)
            .enter().append("path")
            .attr("d", path)


        var countyNames = {};
        dental.forEach(d => {
            countyNames[d.id] = d.county;
        })

        svg.append("g")
            .attr("class", "counties")
            .selectAll("path")
            .data(topojson.feature(us, us.objects.counties).features)
            .enter().append("path")
            .attr("d", path)
            .style("fill", d => {
                return color(premById[d.id]);
            });


        // add tooltip
        const tip = d3.tip()
            .attr('class', 'tooltip-container')
            .html(d => {
                let content = `<div class="tooltip-left"><strong>County: </strong><span class="tooltip-right">${countyNames[d.id]}</span></div>`;
                content += `<div class="tooltip-left"><strong>Avg Prem: </strong><span class="tooltip-right">$&nbsp${premById[d.id]}</span></div>`;

                return content;
            })

        svg.call(tip);

        // add events
        svg.selectAll('path')
            // mouse hover event
            .on('mouseover', (d, i, n) => {

                if (d.id.length > 4) {
                    tip.show(d, n[i]);
                    // handleMouseOver(d,i,n);
                }
            })
            // remove mouse hover
            .on('mouseout', (d, i, n) => {
                tip.hide();
                // handleMouseOut(d, i, n);
            });



    };


}


// function sendHeight() {
//     var height = $('.canvas').height();
//     window.parent.postMessage({
//       'height': height,
//       'location': window.location.href
//     }, "*");
//   }

//   $(window).on('resize', function() {
//     sendHeight();
//   }).resize();









// Draw for the first time to initialize.
redraw();

// Redraw based on the new size whenever the browser window is resized.
window.addEventListener("resize", redraw);








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