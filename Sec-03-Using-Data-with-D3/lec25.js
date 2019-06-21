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

// create x and y axis
const xAxisGroup = graph.append('g')
    // shift x axis to the bottom
    .attr('transform', `translate(0, ${graphHeight})`);

const yAxisGroup = graph.append('g');

// grab the data
d3.json('menu.json').then(data => {

    const min = d3.min(data, d => d.orders);
    const max = d3.max(data, d => d.orders);
    const extent = d3.extent(data, d => d.orders);

    // alert(min)
    // alert(max)

    // create a linear scale
    const y = d3.scaleLinear()
        // domain is total scale of values
        .domain([0,max])
        // range is our new adjusted scale of values
        .range([graphHeight,0]);

    const x = d3.scaleBand()
        // cycle thru objects and take "name" key out of each item
        .domain(data.map(item => item.name))
        // width of overall chart
        .range([0,500])
        // add padding to bars
        .paddingInner(0.2)
        .paddingOuter(0.2);

    // console log to see width of each bar
    // console.log(x.bandwidth())
    // alert(x.bandwidth())
    
    // join data to rect
    const rects = graph.selectAll('rect')
        .data(data)

    // we don't use the parenthesis for x.bandwith this time
    rects.attr('width', x.bandwidth)
        .attr('height', d => graphHeight - y(d.orders))
        .attr('fill', 'orange')
        .attr('x', d => x(d.name))
        .attr('y', d => y(d.orders));

    // append the enter selection to the DOM
    rects.enter()
        .append('rect')
        .attr('width', x.bandwidth)
        .attr('height', d => graphHeight - y(d.orders))
        .attr('fill', 'orange')
        .attr('x', (d,i) => x(d.name))
        .attr('y', d => y(d.orders));

    // create and call the axes
    const xAxis = d3.axisBottom(x);
    
    const yAxis = d3.axisLeft(y)
        // add tick marks
        .ticks(5)
        .tickFormat(d => d + ' orders');

    // call the axes
    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    xAxisGroup.selectAll('text')
        .attr('transform', 'rotate(-40)')
        .attr('text-anchor', 'end')
        .attr('fill', 'purple');

})