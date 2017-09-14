# es6 Syntax Sugars

There are a number of new features & operators that comes with es6 that are intended to make
development easier.  Many of these are simply short hand versions of something that was
previously possible, but is now easier to express with less typing.  This doc is intended
to enumerate on a handful of these features.

A few resources for further study:

- [webapplog.com es6](https://webapplog.com/es6/)
- [luke hoban github notes](https://github.com/lukehoban/es6features#enhanced-object-literals)

MDN links will be included as well where appropriate.

## Items Covered

This week covers a lot of small items that are basically "syntax sugar".  They are things you
already know and do, but hopefully provide a simpler, cleaner way to do them.  In other words,
they reduce boilerplate, which is a good thing.

### Function Defaults

```JavaScript
// es6 allows us to add defaults to parameters.  so we can turn this:
function addFive(a) {
  a = a || 0;
  return a + 5;
}
// into this:
function addFive(a = 0) {
  return a + 5;
}
```

### Rest Parameters

The rest parameter syntax lets you represent an indefinite number of arguments as an array. yay!

```JavaScript
// the old way :(
function howManyArgs() {
  var args = Array.prototype.slice.call(arguments); // good grief
  return args.length;
}
// simpler!
function howManyArgs(...theArgs) {
  return theArgs.length;
}

// even better & more useful, you can have a few named args first, then just imply "the rest of them"
function foo(a, b, ...rest) {
  // do specific things with a & b,
  // do different things with rest!
  console.log(a);
  console.log(b);
  rest.forEach((item) => {
    console.log(item);
  })
}
```

### Spread

The spread operator is similar to the rest operator (...), but it allows you to use items in an array as
specific  arguments to a function.

```JavaScript
// the old way
function foo(x, y, z) {
  // do stuff
}
var args = [1,2,3]; // how do I call foo with these 3 values?
// foo(args) will put the array in the place of 'x', which is not what we want.
// foo(args[0], args[1], args[2]) // does what we want, but good grief.
foo.apply(null, args);  // gotta use apply, which is weird to many people
foo.apply(foo, args);

// the new way
function foo(x, y, z) {
  // do stuff
}
var args = [1,2,3];
foo(...args); // will automatically split the array up into individual args
```

### Template literals

Finally a way to make a template string that isn't annoying.

```JavaScript
// the old way
function fullName(first, last) {
  return first + ' ' + last; // don't forget that space or you will get `johndoe` instead of `john doe`
}

// the new way
function fullName(first, last) {
  return `${first} ${last}`;
}
function greeting(first, last) {
  return `Hi, ${first}, i see your last name is ${last}`;
}

function makeUrl(protocol, domain) {
  return `${protocol}://www.${domain}.com`;
}

```

### Destructuring

Destructuring is a simpler way to break up an object or array into individual objects.  It will fail soft to `undefined`.
[MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) are helpful
as there is a little bit of mind-bending here.

```JavaScript
// lets say we want parts of this list as separate variables
let list = [1,2,3,4,5];

let [a] = list; // will pluck out the first item

let [a,b,c] = list;  // will pluck out the first 3

let [a,,c] = list; // will pluck out the first & third

let [a, b, ...allTheRest] = list; // aha! even works with rest


// works with objects as well, plucking out keys that match
let obj = {a: 10, b: 20, c: 30};

let {a} = obj; // gets "a" key's value

let {a,,c} = obj;  // var a & var c how are individual

// can also assign a default value
let {a = 50, x = 100} = obj;   // if obj.a doesn't exist, it will get 50, x will get 100

// and... can rename the variables so you don't have to use the object keys
let {a:aa = 50} = obj // now the var aa will be mapped to obj.a, and will get a default 50 if no value exists

// can use a function
let [a,b] = function() { return [1,2,3] };  // will capture the first 2 items in the array


// a tad confusing, but lets you swap variables...
let a = 1;
let b = 2;
let [a,b] = [b,a];  // sneaky, swapped the values!
```

### Enhanced object literals

Enhanced object literals eliminates some of the repetition.

```JavaScript
// the old way:
function foo(bar) {
  return {
    bar: bar
  }
}

// the new way
function foo(bar) {
  return {bar};
}

function makeCar(make, model, year) {
  return {make, model, year} // same as {make: make, model: model, year: year}
}
```

### let, const

We have already covered let & const as the new ways to create more meaningful variables.


## Items not covered

A few items not covered bring new concepts to the table, or are a bit more complex & thus may
require more focused attention (read: their own week of study).  

- [iterators & generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)
- modules via [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) and
  [export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
- [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) now built-in

In addition, there are new features added to built-ins `String`, `Array`, etc. as well as entirely new
concepts like [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap).

At this point I'm going to leave these items for you to research on your own time if you see fit, but may come back
later to add some additional lessons as they become more mainstream.
