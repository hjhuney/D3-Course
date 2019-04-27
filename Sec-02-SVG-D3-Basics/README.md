# SVG and D3 Basics

## Simple SVG Shapes

Creating an SVG manually in HTML. 

```
  <svg width="600" height="600">
      <rect x="300" y="100" fill="blue" width="100" height="200"> </rect>
      <circle cx="200" cy="200" r="50" fill="pink" stroke="black" stroke-width="2"></circle>
      <line x1="100" y1="100" x2="120" y2="300" stroke="gray" stroke-width="3"></line>
  </svg>
```

For circle "cx" means position center of circle from x direction. 
    
## SVG Paths



```
<path d = "M150 0 L75 200 L225 200 Z" />
```

M = move to<br>
L = line to<br>
Z = close path<br>
H = horizontal line to<br>
V = vertical lineto<br>
C = curveto<br>
S = smooth curveto<br>
L = line to<br>
Z = close path<br>

"C" at the end of the path curves the line. 

```
<svg width="600" height="600">
    <rect x="200" y="100" fill="blue" width="100" height="200"> </rect>
    <circle cx="200" cy="200" r="50" fill="pink" stroke="black" stroke-width="2"></circle>
    <line x1="100" y1="100" x2="120" y2="300" stroke="gray" stroke-width="3"></line>
    <!-- <path d="M 150 0 L 75 200 L 225 200 Z" fill="orange" ></path>/> -->
    <path d="M 150 50 L 75 200 L 225 200 C 225 200 150 150 150 50" fill="orange" ></path>/>
    <path d="M 425 50 L 350 200 L 500 200 C 500 200 450 200 425 50" fill="purple" ></path>/>
    <circle cx="150" cy="150" r="5" fill="gray"></circle>
    <line x1="225" y1="200" x2="150" y2="150" stroke="black"></line>
</svg>
```

## Selecting Elements


Use d3.select and d3.selectAll. 

```
const b = d3.select('div');
const c = d3.selectAll('div);
```

Example of using class:

```
// HTML
<div class="canvas"></div>

// JS
const canvas = d3.select(".canvas");
```

## Appending Elements

```
const canvas = d3.select('.canvas');

const svg = canvas.append('svg');

// append shapes to svg container

svg.append('rect');
svg.append('circle');
svg.append('line');
```

## Method Chaining & Attributes

```
// method chaining
const svg = canvas.append('svg')
    .attr('height', 600)
    .attr('width', 600);

// append shapes to svg container

svg.append('rect')
    .attr('width', 200)
    .attr('height', 100)
    .attr('fill', 'blue')
    .attr('x', 20)
    .attr('y', 20);

svg.append('circle')
    .attr('r', 50)
    .attr('cx', 300)
    .attr('cy', 70)
    .attr('fill', 'pink');

svg.append('line')
    .attr('x1', 370)
    .attr('x2', 400)
    .attr('y1', 20)
    .attr('y2', 120)
    .attr('stroke', 'red');
```

## Text SVGs

```
// append text
svg.append('text')
    .attr('x', 20)
    .attr('y', 200)
    .attr('fill', 'grey')
    .text("Ninjas!")
    .style('font-family', 'arial');
```

## Grouping Elements

Use transform to move entire group:

```
// create group

const group = svg.append('g')
    .attr('transform', 'translate(50,100)');

// append shapes to svg container

group.append('rect')
    .attr('width', 200)
    .attr('height', 100)
    .attr('fill', 'blue')
    .attr('x', 20)
    .attr('y', 20);

group.append('circle')
    .attr('r', 50)
    .attr('cx', 300)
    .attr('cy', 70)
    .attr('fill', 'pink');

group.append('line')
    .attr('x1', 370)
    .attr('x2', 400)
    .attr('y1', 20)
    .attr('y2', 120)
    .attr('stroke', 'red');

// append text
group.append('text')
    .attr('x', 20)
    .attr('y', 200)
    .attr('fill', 'grey')
    .text("Ninjas!")
    .style('font-family', 'arial');
```



