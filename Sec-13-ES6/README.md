# ES6

## Arrow Functions

Regular function in JS:

```
function addOne(a,b){
  return a + b
}
```

Arrow function:

```
const addTwo = (a,b) => {
  return a + b
}
```

Single-line arrow function:

```
const addTwo = (a,b) => a+b
```

With a one-line arrow function, return is implied. We don't need the "return" keyword. 

## Arrow Functions and This Keyword

However, the "this" keyword works differently inside arrow function than regular function. 

Regular function uses this keyword like so:

```
const PersonOne = {
  name: 'yoshi', 
  speak: function(){
    console.log('my name is ', this.name);  
  }
}
```
With an arrow function, the "this" keyword is not bound. The following code doesn't work:

```
const PersonTwo = {
  name: 'yoshi', 
  speak: () => {
    console.log('my name is ', this.name);  
  }
}
```

## Promises

## Filter

For example, if we have an array and we want to filter out all names with less than 5 characters:

```
const names = ['shaun', 'yoshi', 'ryu', 'ken']

const filteredNames = names.filter((item) => {
  return name.length > 4
})
```

## Map

Create new array (for instance) based on information in one array. 

```
const names = ['shaun', 'yoshi', 'ryu', 'ken']

const nameChars = names.map((item) => {
  return name.length;
})
```

## Template Strings

Template strings use backticks and curly braces


```
const name = 'Shaun';
const age = 30;

const msg = `Hi may name is ${name} and I am ${age}`
```
