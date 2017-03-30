
What is function scope?  Basically it is:
- The parent function, in which the called function has been declared
- The window, or global scope, if the function has been declared as a top level function
- We will go over scope in a touch more detail below

### Arguments

Functions can take any object, even another function, as an argument, and can take multiple arguments.
Giving a function arguments is how you make it flexible. A good function can be called to do a
certain set of work, but should be able to do that work with different data & respond with the
correct output.  Hard coding data within a function often limits its usefulness.

```JavaScript
var add = function(a, b) {
  return a + b;
}

add(1,2); // 3;
add(4,6); // 10 yay! reusable


// a function can even take another function as an argument.
// this is called a higher order function, we will go over these
// in the future. It may seem a bit hard to grasp, but higher
// order functions are things you use constantly in JS.
var callItOrReturnIt = function(it) {
  return (typeof it === 'function') ?
    it() :
    it;
}
console.log( callItOrReturnIt(1) );
console.log( callItOrReturnIt('foo') );
console.log( callItOrReturnIt({ jQuery: 'does this a lot!'}) );
console.log( callItOrReturnIt(function() { return 42;  }) );

```

### The Arguments Object

There is also a special object call the `arguments` object.  Every function has this object,
but it is only useful in certain cases.  The `arguments` object is an "array-like" object
that represents all of the arguments given to a function as a set. This is useful when you
want a function to take arguments without limit:

```JavaScript
let addAllArgs = function() {
  // var args = Array.prototype.slice.call(arguments);
  let args = [].slice.call(arguments);
  let total = 0;
  let i = 0;
  for(i; i < args.length; i++) {
    total = total + args[i];
  }
  return total;  // total should be the sum of all the args
};

addAllArgs(1,2);
addAllArgs(5,7,9);
addAllArgs(1,2,5,7,9, -1, 0 -49, 75);
```

### Scope vs context

The scope and context of a function are the next two things we will hit.  Scope and context are
not the same, but are often confused.  Here is the difference:

- Scope is the variable access of a function
  - it looks upward.  a function has access to:
    - its own variables (inside the function)
      - this is called `local scope`
    - the variables "up the chain" in parent functions, all the way to the top (the window)
    - variables on the window are called `global scope`
    - (NOTE: es6 introduced `block scope`, through `let` and `const`, which means a variable
    can be scoped to an `if`, `for`, or other "smaller" scope than a function)

- the word `closure` comes into play here, it is related to scope
  - a clojure is created when:
    - a function is defined within another function
    - the inner function is called, but uses variables from the outer function
    - it is like a bubble around a bubble:
    ```JavaScript

      function foo() {
        let a = 1;
        let b = 2;
        function bar() {
          let c = a + b;
        }
        return bar;
      }

      let baz = foo(); // returns a bar.  foo is done now, yet the "bubble" it created with a & b remains.
      baz();  // now we are calling bar, which still has access to the bubble that has a & b.
    ```

- Context is the value of the "this" keyword inside a function
  - the "this" keyword points at the object that "owns" the currently executing code (function)
  - "this" might be the function itself.  If it isn't the function, it is some object, ultimately
    it can be the window object
  - JavaScript is very flexible.  The "this" keyword can easy change depending on how you call a function.


### Context & 'this'

The [MDN for this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

Scope is fairly straightforward, as stated above.  But context changes. A function can be called in
different contexts, affecting how it works & what the "this" keyword represents.

- global context

When a top level function is called (w/o strict mode), it is called with the global context (window)
by default.

```JavaScript
// when not in strict mode,
// top level functions are bound to the window object,
// which means that 'this' means 'window'.
// this is essentially the same as writing:
//   window.foo = function() {}
function foo() {
  return this;
}

foo() === window; // true.   

// OH! wait, except strict mode:

```

- function context, strict mode

When `strict mode` is applied, the above behavior is removed.  Unless `this` is given a context, it will
have `undefined` as its context.  This will make more sense when we get into Contructors, call, apply, and bind.

```JavaScript
// in strict mode, functions don't automatically attach to the window.
// this is exactly as above, it is a function in a global context, but
// there isnt the strange behavior of automatically attaching to the window
function foo() {
  'use strict';
  return this;
}

foo() === undefined // true.

```

- object method

A function that is a method of another object will have that object as its context.  

```JavaScript

let obj = {
  foo: function() {
    return this;
  },
  bar: function() {
    return this.foo(); // whoa, meta.
  }
};

obj.foo() === obj // true. it returned 'this', which is the object, not the foo function.
```

- constructor

A constructor is a function that acts like a "factory". It is used to create copies of objects, though
when given arguments these objects can have unique properties.

```JavaScript  
// foo is an instance of a foo object: { }
// it is not the same as the constructor Foo (function),
// Foo is a factory for making objects.
function Foo() {
  return this;
}

new Foo() === Foo; // false. calling new Foo() returns a new object, in this case an empty object.


function Bar(baz, shizzle) {
  this.baz = baz;
  this.shizzle = shizzle;
}

new Bar() === { baz: undefind, shizzle: undefind };
new Bar(1, 'hello') === { baz: 1, shizzle: 'hello' };

```

There are a few more contexts, but we will go over them in a future session:
- DOM event handler
- in-line event handler
- call, apply, bind
  - these take a function & change its calling context (what!)
- arrow functions
  - these cannot change their calling context, even if the above call,apply, or bind are used.




## Homework

As before, use `node filename.js` to run your homework.  Wrapping the answer to each question in an IIFE will
be helpful:
```JavaScript
'use strict';
/* jshint esversion: 6 */
// oh, and we will talk about IIFE next week. :)
(function() {
  // Answer to Q1:
})();

// then run your homework:
// $ node ./my-lesson-5-homework.js
```

First, try to solve each problem as outlined.  If that comes easily, think about edge cases and update your functions to handle things like unexpected inputs (arguments).

1.  Write a function called `average` that takes any number of arguments and returns the average of them.

  ```JavaScript
   // average(50,25) // 37.5
   // average(50,25,10) // 28.33
  ```

1.  Create a function called `indexOf`.  It should take an array, and a second object.  It will loop the array to check and
see if any of the items in the array match the second object.  If so, it returns the index (number) of that item.

1. Create a similar function called `includes` that takes an array and a value. It should return `true` if the value
exists in the array, and false if it does not. If you had trouble with the previous question, doing this one may help you
answer both.

1. Create a function called `Person` that will be used as a constructor.  It should receive arguments
such as name and age (and anything else you give it), and, when called with `new`, should return an
object representing a person.

1.  Add a `sayHello` method to your `Person` function above. When you create a `new Person()`, you should be able to
call `person.sayHello()` and have the `sayHello` method return a string that is a greeting that includes information
about the person.  For example, "Hi, my name is <name>.  I'm <age> old, and I like <favorite_food>".
