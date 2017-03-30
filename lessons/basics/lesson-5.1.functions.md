# Functions

MDN on [functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)

MDN [exhaustive reference on functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)

Functions are likely the most important building block in JavaScript.  A function basically is a set of
statements that perform some work, optionally return a value, and can be called repeatedly.

## Defining

We discussed functions briefly in [lesson 2](./lesson-2.md), briefly touching on function declarations
and function expressions. A simple function definition looks like many of the other constructs we
have already discussed:

```JavaScript
function(/* arguments */) {

}

for(/* conditions */) {

}

while(/* condition */) {

}
// etc
```
A simple example function with a return statement:

```JavaScript
// named function, which is a function declaration
function square(num) {
  return num * num;
}
```
The above function is named.  This is a divergence from the other statements we have discussed.  
You don't name your loops, but you can optionally name your functions.  Unnamed functions are
anonymous, and most useful when stored in a variable:

```JavaScript
// an anonymous function, which is a function expression
// it is an "expression" because it evaluates to a single value (the function itself) and is stored in the variable
let square = function(num) {
  return num * num;
}
```

And of course, you can use both forms:

```JavaScript
// we can assign the variable named square's value to be the square function
let square = function square(num) {
  return num * num;
}

```

## Calling functions

There is a difference between defining a function and calling it. When you define a function,
you are essentially grouping a set of actions in a way that allows them to easily be performed
multiple times, possibly with different inputs (and thus producing a different output).

Parens are used to execute/call a function:

```JavaScript
square(4);
```

Functions can only be called if they are defined in the same scope as the place where they are called.

```JavaScript
(function() {  
  square(4); // this won't work. `square` is undefined at this point in the code...
})();

(function() {  
  function square(num) { return num * num };
  square(4); // works.
})();

(function() {  
  square(4); // still works, because the declaration is hoisted.
  function square(num) { return num * num };
})();

(function() {  
  square(4); // ah, no worky. the variable `square` is hoisted in this case, but it isn't assigned to a function until later...
  let square = function(num) { return num * num };
})();

let square = function(num) { return num * num };
(function() {  
  square(4); // works. functions in an outer scope can be referenced & called.  just not in a sibling or child/grandchild/etc scope
})();

// ASIDE, pretty strange...
// anonymous block, this could replace the IIFE,
// so long as you use `let` and do not use `var`
// (though its still weird!)
{
  2;
  2 + 2;
  function bar() {console.log('wheeeee!')}
  bar();
  let foo = function() { console.log('its a foo, with a let, in a anonymous block, wleeeeee'); }
}

bar();
foo();

```


### Homework


- TODO: split off some stuff from lesson 5.1.2 and put it in here
