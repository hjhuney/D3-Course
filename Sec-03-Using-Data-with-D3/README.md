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

