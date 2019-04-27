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
    
