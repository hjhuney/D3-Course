// map with resizing
// http://bl.ocks.org/jczaplew/4444770


// get viewport dimensions
var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);



// resize window
d3.select(window)
    .on("resize", sizeChange);

// add color scheme
var color = d3.scaleSequential(d3.interpolatePlasma)
    .domain([45, 20]);
    // .range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]);

// geopath and svg
var path = d3.geoPath();
var svg = d3.select(".canvas").append("svg")
    .attr("width", "100%")
    .append("g");

// add all .json and .csv files to queue
queue()
    .defer(d3.json, "us-states.json")
    .defer(d3.csv, "dental_prems_v2.csv")
    .await(ready);

// function to draw map
function ready(error, us, dental) {
    if (error) throw error;
    var premById = {};
    dental.forEach(d => {
        premById[d.id] = +d.avg_prem;
    });

    // add states
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

    // add counties and dental premium data
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
            let content = `<div class="tooltip-left"><strong>County: </strong><span class="tooltip-right">${countyNames[d.id].slice(0,15)}</span></div>`;
            content += `<div class="tooltip-left"><strong>Avg Prem: </strong><span class="tooltip-right">$&nbsp${premById[d.id]}</span></div>`;

            return content;
        })

    svg.call(tip);


    // add events
    svg.selectAll('path')
        // mouse hover event
        .on('mouseover', (d, i, n) => {

            // console.log(d3.event.pageX, viewportWidth - 170); 
  
            // add tooltip on mouse hover
            if (premById[d.id]){
                tip.show(d,n[i])
                // add if-else testing on location of mouse relative to viewport
                if(d3.event.pageX < (viewportWidth - 170)){
                    tip.style("left", d3.event.pageX + 5 + "px")
                    tip.style("top", d3.event.pageY + 8 + "px");
                }  else {
                    tip.style("left", d3.event.pageX - 170 + "px")
                    tip.style("top", d3.event.pageY + 8 + "px");
                }

                // handleMouseOver(d,i,n);
                }                
        })
        // remove mouse hover
        .on('mouseout', (d, i, n) => {
            tip.hide();
            // handleMouseOut(d, i, n);
        });



};


// resize function
function sizeChange() {
    d3.select("g").attr("transform", "scale(" + $(".canvas").width()/960 + ")");
    $("svg").height($(".canvas").width()/1.6);
}




