// select the svg container
const svg = d3.select('.canvas')
    .append('svg')
    .attr('width', 600)
    .attr('height', 600);

// create margins on dimensons
const margin = {
    top: 20, right: 20, 
    bottom: 100, left: 100
}

const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

const graph = svg.append('g')
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    //es6 template string - use backticks not quotes
    .attr('transform', `translate(${margin.left},${margin.top})`)

//
graph.append('rect');
graph.append('rect');
graph.append('rect');

// create x and y axis
const xAxisGroup = graph.append('g')
    // shift x axis to the bottom
    .attr('transform', `translate(0, ${graphHeight})`);

const yAxisGroup = graph.append('g');

// scales

const y = d3.scaleLinear()
    .range([graphHeight,0]);

const x = d3.scaleBand()
    .range([0,500])
    .paddingInner(0.2)
    .paddingOuter(0.2);

// setup
const xAxis = d3.axisBottom(x);

const yAxis = d3.axisLeft(y)
    // add tick marks
    .ticks(5)
    .tickFormat(d => d + ' orders');

// update x-axis text
xAxisGroup.selectAll('text')
    .attr('transform', 'rotate(-40)')
    .attr('text-anchor', 'end')
    .attr('fill', 'purple');

// update function
const update = (data) => {

    // 1. update scales
    const max = d3.max(data, d => d.orders); 
    y.domain([0,max])
    x.domain(data.map(item => item.name))

    // 2. join updated data to elements
    const rects = graph.selectAll('rect').data(data);

    // 3. remove unwanted shapes using the exit selection
    rects.exit().remove();

    // 4. update current shapes in dom
    rects.attr('width', x.bandwidth)
        .attr('height', d => graphHeight - y(d.orders))
        .attr('fill', 'orange')
        .attr('x', d => x(d.name))
        .attr('y', d => y(d.orders));

    // 5. append the enter selection to the dom
    rects.enter()
        .append('rect')
        .attr('width', x.bandwidth)
        .attr('height', d => graphHeight - y(d.orders))
        .attr('fill', 'orange')
        .attr('x', (d,i) => x(d.name))
        .attr('y', d => y(d.orders));

    // call the axes
    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

};

// grab the data
db.collection('dishes').get().then(res => {

    var data = [];
    res.docs.forEach(doc => {
        // push data to an array
        data.push(doc.data());
    });

    update(data);

    // interval method
    d3.interval(() => {
        data.pop();
        // update(data);
    }, 5000)





})

