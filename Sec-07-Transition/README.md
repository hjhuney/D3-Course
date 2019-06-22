# Transitions and Animations

```
// set up constant for transitions
const t = d3.transition().duration(1000);

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
        .attr('fill', 'black')
        .attr('x', d => x(d.name));
            // .transition(t)
            // .attr('y', d => y(d.orders))
            // .attr('height', d => graphHeight - y(d.orders));

    // 5. append the enter selection to the dom
    rects.enter()
        .append('rect')
        .attr('width', x.bandwidth)
        .attr('height', 0)
        .attr('fill', 'orange')
        .attr('x', (d,i) => x(d.name))
        .attr('y', graphHeight)
        .merge(rects)
        .transition(t)
            .attr('y', d => y(d.orders))
            .attr('height', d => graphHeight - y(d.orders));

    // call the axes
    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

};
```

## Tweens

```
// tweens

const widthTween = (d) => {

    // define interpolation
    //d3.interpolate returns a function which we call 'i'
    let i = d3.interpolate(0, x.bandwidth());
    
    // return a function which takes in a time ticker 't'
    return function(t) {

        // return the value from passing the ticker into the interpolation
        return i(t);
    }
}
```

```
    // 5. append the enter selection to the dom
    rects.enter()
        .append('rect')
        // .attr('width', 0)
        .attr('height', 0)
        .attr('fill', 'orange')
        .attr('x', (d,i) => x(d.name))
        .attr('y', graphHeight)
        .merge(rects)
        .transition(t)
            .attrTween('width', widthTween)
            .attr('y', d => y(d.orders))
            .attr('height', d => graphHeight - y(d.orders));
```
