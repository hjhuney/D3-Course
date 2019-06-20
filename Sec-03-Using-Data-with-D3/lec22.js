// select the svg container
const svg = d3.select('svg');

// grab the data
d3.json('menu.json').then(data => {

    // create a linear scale
    const y = d3.scaleLinear()
        // domain is total scale of values
        .domain([0,1000])
        // range is our new adjusted scale of values
        .range([0,500]);

    
    
    // join data to rect
    const rects = svg.selectAll('rect')
        .data(data)

    rects.attr('width', 50)
        .attr('height', d => d.orders)
        .attr('fill', 'orange')
        .attr('x', (d,i) => i * 70);

    // append the enter selection to the DOM
    rects.enter()
        .append('rect')
        .attr('width', 50)
        .attr('height', d => y(d.orders))
        .attr('fill', 'orange')
        .attr('x', (d,i) => i * 70);

})