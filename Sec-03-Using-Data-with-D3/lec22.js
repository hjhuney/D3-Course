// select the svg container
const svg = d3.select('svg');

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
        .range([0,500]);



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
    const rects = svg.selectAll('rect')
        .data(data)

    // we don't use the parenthesis for x.bandwith this time
    rects.attr('width', x.bandwidth)
        .attr('height', d => y(d.orders))
        .attr('fill', 'orange')
        .attr('x', d => x(d.name));

    // append the enter selection to the DOM
    rects.enter()
        .append('rect')
        .attr('width', x.bandwidth)
        .attr('height', d => y(d.orders))
        .attr('fill', 'orange')
        .attr('x', (d,i) => x(d.name));

})