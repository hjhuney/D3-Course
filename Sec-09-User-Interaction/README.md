# User Interaction and Events

## Event Listeners

* Click events
* Mouseover events
* Double-click events
* Etc

```
const rects = d3.selectAll('rect')

rects.on('click', function)
```

## Mouseover Events

```
// event handlers;
const handleMouseOver = (d, i, n) => {
    d3.select(n[i])
        .transition('changeSliceFill').duration(500)
            .attr('fill', '#fff');
}

const handleMouseOut = (d, i, n) => {
    d3.select(n[i])
        .transition().duration(500)
            .attr('fill', color(d.data.name));
}
```

```
// event handlers;
const handleMouseOver = (d, i, n) => {
    d3.select(n[i])
        .transition('changeSliceFill').duration(500)
            .attr('fill', '#fff');
}

const handleMouseOut = (d, i, n) => {
    d3.select(n[i])
        .transition().duration(500)
            .attr('fill', color(d.data.name));
}
    
```

## D3 Tip (Tooltip)

[D3-Tip Library](https://cdnjs.com/libraries/d3-tip)

Paste the CDN above graph.js, but below the D3 library in the HTML file. 
