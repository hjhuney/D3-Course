// create a geo path - https://github.com/mbostock/d3/wiki/Geo-Paths
var path = d3.geo.path();
 
// create an svg element
var svg = d3.select(".canvas")
  .append("svg");
 
// create a container for counties
var counties = svg.append("g")
    .attr("id", "counties")
    .attr("class", "Blues");
 
// create a container for states
var states = svg.append("g")
    .attr("id", "states");
 
// load the county shape data
d3.json("us-states.json", function(json) {
  // create paths for each county using the json data
  // and the geo path generator to draw the shapes
  counties.selectAll("path")
      .data(json.features)
    .enter().append("path")
      .attr("class", data ? quantize : null)
      .attr("d", path);
});
 
// load the state shape data
d3.json("us-states.json", function(json) {
  // create paths for each state using the json data
  // and the geo path generator to draw the shapes
  states.selectAll("path")
      .data(json.features)
    .enter().append("path")
      .attr("d", path);
});
 
// load the unemployment by county data
d3.json("unemployment.json", function(json) {
  data = json;
 
  // for each county, set the css class using the quantize function
  // (an external CSS file contains the css classes for each color in the scheme)
  counties.selectAll("path")
      .attr("class", quantize);
});
 
// quantize function takes a data point and returns a number
// between 0 and 8, to indicate intensity, the prepends a 'q'
// and appends '-9'
function quantize(d) {
  return "q" + Math.min(8, ~~(data[d.id] * 9 / 12)) + "-9";
}