```javascript
// Invoking functions
// There are many ways to invoke functions.
// For the most part, they do the same thing.
// A couple of these actually do something unique.
//
// Function declaraction
// - Defines a named function variable without requiring variable assignment
// - Sometimes called a function statement.
// Function expression
// - Defines a function in a larger expression, such as while creating a variable
// Anonymous function
// - A function without a name.  
// Immediately Invoking Function
// - or Self Executing Anonymous Function
// - or Self-Invoked Anonymouse Function
// - uh... it has too many names. and they are all long.
// - http://benalman.com/news/2010/11/immediately-invoked-function-expression/
// Closure
// - Closures are functions that create an environment within which variables exist but are hidden to the outside world.
//   Functions defined within that function maintain access to those variables.  
//   Essentially, a Closure is a bubble.
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
//
// There are many examples of calling functions below. FWIW,
// clever is not always good. It is often best to pick the way
// that is most clear & use it consistently.
//
// Additional reading/sources
// https://javascriptweblog.wordpress.com/2010/07/06/function-declarations-vs-function-expressions/


// function declaraction
// creates a named function.
function foo() {
  console.log('A');
};

// function expressions
// Defines a function as part of a larger syntax, such as creating a variable.
// These functions may or may not be anonymous (irrelevant, do as you like)
var foo2 = function() {
  console.log('A again');
}
var foo3 = function foo3() {
  console.log('A... one more time!');
}

// other, stranger function expressions....
// these exist 'in the wild' so its good to know them.
// however, don't be confused, they aren't special, just... a little weird.
+function() {
  console.log('B');
};


!function() {
  console.log('C');
};

// parents can be used as liberally as desired
(function() {
  console.log('D');
});


// this will error!
// the JavaScript parser sees a function being declared and freaks out
// when you try to use it immediately with the extra () at the end.
// function bar() {
//   console.log('E');
// }();

// but this will not error
// fyi, twitter bootstrap does this all the time.
+function() {
  console.log('F');
}();

// This also won't error, but it will make people angry if you do it becuase... what?!?!?
function() {
  console.log('F...again');
}(1); // haha i tricked the parser by putting something in the parens that i dont even use

// IIFE: immediately invoking function expression
(function() {
  console.log('G');
})();

// also invokes immediately
// since it is envoked immediately, bar will not be the function,
// it will be whatever the function returns.
// this is harder to read
var baz = function() {
  console.log('H');  
  return 'H';  
}();

// this is a bit better
var bar2 = (function() {
  console.log('I');
  return 'I';
})();

// yet another swap of the parens!
(function() {
  console.log('J');
}());


// function.call is a method of functions
// all functions have .call, .bind, .apply
// (and perhaps a few others)
~function() {
  console.log('L');
}.call(this);

// This wont work, remember, the parser sees the function
// as a declaraction, not an expression, so it freaks out.
function() {
  console.log('K');
}.call(null);

// you can 'new' a function.... but nobody does this.
new function() { }
// yup, you could do this too, but nobody does this.
new function() {}();

// Go nuts.  Just don't really do this ever in real code unless you want to get into an argument.
+(+(function(){ var scope = 'stuff!'; return "4"; })());


// Summary
// - Favor function expressions over function declarations.  
// - Function expressions are more versatile
// - Favoring expressions will help you get comfortable with the fact that you can pass functions around in variables

```

Its worth reading http://benalman.com/news/2010/11/immediately-invoked-function-expression/ a couple 15 times or so as he will explain all the weird function behaviors. Even if you don't use them, familiarization so they don't look intimidating is good... lots of people like to use this stuff.

Items for the future lessons:

- hoisting
- return statements
- can you put code after a return statement? (ah, hoisting gotcha!)
- hoisting w/anonymous functions
