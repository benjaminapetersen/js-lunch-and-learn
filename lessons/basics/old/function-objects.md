```javascript
//
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
//


// Demystifying functions... we hope :)
//
// Functions are actually a type of object!
// and all objects have... properties and methods
// properties & methods are key-value pairs.
// example object:
// ------------------------------------------
// this is your basic object.
var a = {
  b: 'foo',  // it has a property
  c: function() {  // it has a method (function)
    alert('hello world!');
  }
};


// Function object properties
// ----------------------------
{
  lenght: 0,      // then number of arguments given to a function. (btw, angular uses this in interesting ways)
  name: ''        // the name of the function (if it has one)
}


// Function object methods
// There are 3 primary methods:
// ----------------------------
{
  call: function() {},
  apply: function() {},
  bind: function() {}
}
// when you make a new function:
var foo = function() {
  // do stuff...
};
// you call it like this:
foo();
// but really, JavaScript is calling it's call method:
foo.call();
// but it means the same thing.  
// this is called syntax sugar.
// nobody wants to write foo.call() over and over...
// so we just do the parens () and roll with it.


// new Function
// ----------------------------
// you can do this:
var adder = new Function('a', 'b', 'return a + b');
// but, as usual... don't.  its weird. and other reasons.

```
