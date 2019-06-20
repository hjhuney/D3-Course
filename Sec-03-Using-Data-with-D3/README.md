# Using Data with D3

## Joining Data to a Method

```
// create an array for data
const data = [
    {width: 200, height: 100, fill: 'purple'}
];


const svg = d3.select('svg');

// join data array with element via .data

const rect = svg.select('rect')
    .data(data)
    .attr('width', function(d) {return d.width})
    .attr('height', function(d) {return d.height})
    .attr('fill', function(d) {return d.fill});
```

## Arrow Functions

In ES6, arrow functions become an option. Works the same, but uses an arrow. The only thing that changes is the value of "this". 

```
const rect = svg.select('rect')
    .data(data)
    .attr('width', (d, n, i) => {return d.width})
    .attr('height', (d) => {return d.height})
    .attr('fill', (d) =>{return d.fill});
```

To make the arrow function equivalent to the other function for "this", we need to do this:

```
const rect = svg.select('rect')
    .data(data)
    // (data, index of element in array, array of elements)
    .attr('width', (d, i, n) => {
        console.log(n[i])
        return d.width})
    .attr('height', function(d) {
        console.log(this)
        return d.height})
    .attr('fill', function(d) {return d.fill});
 ```
 
 In the above example, both console logs will return the same thing. 
 
 If we're doing our arrow function all on one line, we can shorten it like this:
 
 ```
 const rect = svg.select('rect')
    .data(data)
    // (data, index of element in array, array of elements)
    .attr('width', (d, i, n) => d.width)
    .attr('height', (d) => d.height)
    .attr('fill', (d) => d.fill);
 ```
 
If we're only passing one parameter into arrow function, we also don't need parenthesis. But we have to use the parenthesis for multiple parameters. 
 
```
const rect = svg.select('rect')
    .data(data)
    // (data, index of element in array, array of elements)
    .attr('width', (d, i, n) => d.width)
    .attr('height', d => d.height)
    .attr('fill', d => d.fill);
```
 
 ## Joining Data to Multiple Elements
 
 
 ```
 // create an array for data
const data = [
    {width: 200, height: 100, fill: 'purple'},
    {width: 100, height: 60, fill: 'pink'},
    {width: 50, height: 30, fill: 'red'}
];


const svg = d3.select('svg');

// join data array with element via .data

const rect = svg.selectAll('rect')
    .data(data)
    // (data, index of element in array, array of elements)
    .attr('width', (d, i, n) => d.width)
    .attr('height', d => d.height)
    .attr('fill', d => d.fill);
 ```

## The Enter Selection

```
const rects = d3.selectAll('rect').data(data)

rects.enter().append('rect').attr()
```

## External Data (JSON)

JSON data:

```
[
    {
      "radius": 50,
      "distance": 110,
      "fill": "orange"
    },
    {
      "radius": 70,
      "distance": 260,
      "fill": "red"
    },
    {
      "radius": 35,
      "distance": 400,
      "fill": "brown"
    },
    {
      "radius": 55,
      "distance": 530,
      "fill": "green"
    }
  ]
```


HTML:

```
<body>
    
    <div class="canvas">
        <svg width="600" height="600">
            <circle></circle>

        </svg>
    </div>    

    <script src="https://d3js.org/d3.v5.js"></script>
    <script src="index_external.js"></script>
        
</body>
```

JS

```
// select svg container first
const svg = d3.select('svg');

// grab the data
d3.json('planets.json').then(data => {
    
    const circs = svg.selectAll('circle')
        .data(data)

    // add attrs to circs already in DOM
    // 'cy' = center-y
    // 'cx' = center-x
    circs.attr('cy', 200)
        .attr('cx', d => d.distance)
        .attr('r', d => d.radius)
        .attr('fill', d => d.fill);

    // append the enter selection to the DOM
    circs.enter()
        .append('circle')
        .attr('cy', 100)
        .attr('cx', d => d.distance)
        .attr('r', d => d.radius)
        .attr('fill', d => d.fill);
})
```

## Linear Scales

```
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
```

## Band Scales


