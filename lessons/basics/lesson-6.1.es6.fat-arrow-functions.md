# Arrow Functions

[MDN on arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

Arrow functions are new to JavaScript as of es2015 (es6).  The arrow function
was influenced by coffeescript (a number of new features of JS have influences
from other languages, a short list can be [seen here](http://2ality.com/2015/10/es6-influences.html)).

So why another kind of function?  Aren't functions complex enough?  Thats the
point, actually.  Fat arrow functions are intended to be simpler than regular
functions.  They have just a few key points:

- fat arrow functions have less syntax (less to type) than regular functions
- fat arrow functions `lexically bind their this value`
  - um, wut?
  - it means that `this` in a fat arrow function does not change.  it is
    scoped to the immediate context around it.  You cannot use `.bind()`
    and the other tricks that come with regular functions to change its
    scope.


The syntax. Though we said it is simpler, there are a number of variants (all intended
to reduce the syntax you have to type to write a function).

```JavaScript
// the basic fat arrow function
let foo = () => {};

// you can omit a lot of the structure so long as you keep the arrow!
// if just one parameter, parens are not necessary.
// if the funciton is one expression, you don't even need the curly braces.
let foo = x => x * x;

// some more alternatives... (but didn't we say its simpler?)
let foo = () => 2*2;         // braces are optional if only 1 expression...
let bar = (qux) => { };
let bar = qux => { };        // parens are optional with only one parameter name
let baz = () => ({foo:bar})  // use parens if just returning an object literal
```

Lets compare to regular functions and see how they are used.  We will use
examples from [this page](https://googlechrome.github.io/samples/arrows-es6/),
but will break them down into smaller bits.

```JavaScript
// lets start with this simple array of data and illustrate the syntax change
let nums = [1,2,3,4,5];

// with a normal function
let oddNums = nums.filter(function(num) {
  return num % 2;
});

// with a fat arrow
let oddNums2 = nums.filter((num) => { return num % 2; });
// the simpler form can ommit a bunch more syntax
let oddNums3 = nums.filter(num => num % 2 );
// but, sadly, this doesn't work
// why? syntax is correct (not an error), BUT lack of return statement
// will result in an empty array. I find this problematic since
// the automatic return is touted as an important feature.
let shouldBeOddNumsButWut = nums.filter((num) => { num % 2; });
// so what is the key takeaway?
// how do we remember this quirk?
// its based on the existence of the block: { }
// curlies imply a block, which implies multiple statements (typically)
// if there are NO CURLIES and just an expression after the arrow =>
// then the return is implicit
// NOTE: this is a feature in other languages, though maybe a bit
// different. For example, ruby always implicitly returns the value of
//  the last evaluated expression.
```

Lets try another

```JavaScript
// parens optional if one arg
let square = x => x * x;
// but necessary if multiple
let add = (a, b) => a + b;

square(10);  // 100
add(2,5);    // 7
```
So we didn't need to use a normal `function` because `this` is not relevant.

Beyond less typing, its easier to see the advantage of the fat arrow in
some key contexts, such as `timeouts`:


```JavaScript
// normal functions lose context:
function someCounter() {
  this.seconds = 0;
  window.setInterval(function() {
    this.seconds++;   // oh snap! these two references are different.
  }, 1000);
}

// the "old way" to fix
// is a bit awkward for most people unfamiliar with .bind,.call,.apply
function someCounter() {
  this.seconds = 0;
  window.setInterval(function() {
    this.seconds++;   
  }.bind(this), 1000); // immediately bind the anonymous fn to the outer context...
}


// the simpler fat arrow version
function someCounter() {
  this.seconds = 0;
  window.setInterval(() => {
    this.seconds++;   // automatically bound to the outer function, same `this`
  }, 1000); // no strange .bind()
}

// and, of course, can do less syntax

```

If we get into constructors (classes), we can definitely see some more benefits.
Traditional functions are tricky to use as "methods" on other functions and objects
as the scope can be a lot to workaround.

```JavaScript
// The problem:
// --------------------------
function Person(greeting) {
  this.greeting = greeting || 'Hi, ';
}
Person.prototype.greet = function(toBeGreeted) {
  return othersToGreet.map(function(toGreet) {
    return this.greeting + toGreet;  // oh, bother. this.greeting is out of scope...
  });
}

// And a bevvy of workarounds
// --------------------------

// Solution A: `that` or `self`
// this is a workaround that isn't idiomatic, bit it is easy
function Person(greeting) {
  this.greeting = greeting || 'Hi, ';
}
Person.prototype.greet = function(toBeGreeted) {
  var self = this;
  return othersToGreet.map(function(toGreet) {
    return self.greeting + toGreet;  // fixed, even if it feels a bit janky
  });
}


// Solution B: implicit `this` binding
function Person(greeting) {
  this.greeting = greeting || 'Hi, ';
}
Person.prototype.greet = function(toBeGreeted) {
  return othersToGreet.map(function(toGreet) {
    return this.greeting + toGreet;   // works, why? next line:
  }, this); // so passing a `this` to .map as a second argument will bind the fn..
}


// Solution C: explicit `this` binding
function Person(greeting) {
  this.greeting = greeting || 'Hi, ';
}
Person.prototype.greet = function(toBeGreeted) {
  return othersToGreet.map(function(toGreet) {
    return this.greeting + toGreet;   // works
  }.bind(this)); // the same thing we saw with setTimeout() & an anonymous function
}


// Fat arrow solution
// --------------------------
function Person(greeting) {
  this.greeting = greeting || 'Hi, ';
}
Person.prototype.greet = function(othersToGreet) {
  return othersToGreet.map((toGreet) => { // yay. fat arrows auto bind `this` so you don't have to think.
    return this.greeting + toGreet;   // works
  });
}


// Now, lets do the same with a class:
class Person {
  constructor(greeting) {
    this.greeting = greeting || 'Hi, ';
  }
  greet(toBeGreeted) {
    return othersToGreet.map((toGreet) => {
      return this.greeting + toGreet;
    })
  }
}

```

Any other things?

```JavaScript
// IIFE
// the old IIFE:
(function() {

})();
// the new IIFE:
(() => {

})();

```

There are a handful of others use cases as well.  As usual, this isn't exhaustive, but MDN is
great for that.  This guide is to get you comfortable with the main uses of fat arrow functions
so that when you meet them "in the wild", you have a pretty good idea of what they can do.
