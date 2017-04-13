
# Function Arguments & Scope

## Arguments

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

let someFunc = function(a, b) {
  let first = arguments[0];  // or 'a'
  let second = arguments[1]; // or 'b'
  let fifth = arguments[4];  // would be "e", but we didn't go that far!
  // etc. you can give ANY function as many arguments as you like,
  // but if the function doesnt know how to handle them, then they
  // will be ignored.
}


let addAllArgs = function() {
  // var args = Array.prototype.slice.call(arguments);
  let allArguments = [].slice.call(arguments);
  let total = 0;
  let i = 0;
  for(i; i < allArguments.length; i++) {
    total = total + allArguments[i];
  }
  return total;  // total should be the sum of all the args
};

addAllArgs(1,2);
addAllArgs(5,7,9);
addAllArgs(1,2,5,7,9, -1, 0 -49, 75);
```

## Function Scope

What is function scope?  Basically it is:
- The parent function, in which the called function has been declared
- The window, or global scope, if the function has been declared as a top level function
- We will go over scope in a touch more detail below


### Scope and closure

The scope and context of a function are two important concepts that sound similar,
but are slightly different. Lets talk about scope, we will save context for next week.  
Here is a basic outline of scope:

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
      // scope A
      function foo() {
        // scope B
        let a = 1;
        let b = 2;
        function bar() {
          // scope C
          let c = a + b;
          return c;
        }
        return bar;
      }

      // calling foo() returns the function 'bar'
      // foo executes & should vaporize... yet the variables
      // it created, a and b, remain.  Why? it created a closure...
      // essentially the "bubble" of the function lives on until
      // nothing needs its variables anymore.  'a' and 'b' will be
      // used inside of bar, they have references, so the "bubble"
      // continues to exist until the returned function is called
      // and the variables are no longer needed.  Then the bubble will
      // pop and the closure will go away.  
      let baz = foo();
      baz();  // now we are calling bar, which still has access to the bubble that has a & b.


      // put into a practical example:
      // lets make some functions that calcuate sales tax for us:
      let taxCalculator = function() {
        let stateTax = 1;
        let localTax = 2;
        let calculator = function(itemCost) {
          return itemCost + stateTax + localTax;
        }
        return calculator;
      }

      // taxCalculator returns the inner function `calculator`...
      // but strangely, calculator takes stateTax & localTax with it!
      // these variables aren't returned, but they live on after the
      // function taxCalculator() is done with its work.  The "bubble"
      // that was created by taxCalculator doesn't pop and go out of
      // existance because `calculator` needs these variables to do
      // its own work.  This is called a closure.  `calculator` "closes over"
      // the variables it needs to keep doing its work.
      // Once `calculator` is finished & no longer used, the bubble will
      // finally pop and stateTax & localTax will go out of existence.
      let totalSodaCost = taxCalculator();

      let cokeCost = 5;
      let spriteCost = 6;
      let laCroixCost = 7;

      // the inner function can still do the math with stateTax and localTax
      totalSodaCost(cokeCost);
      totalSodaCost(spriteCost);
      totalSodaCost(laCroixCost);
    ```

For more on closures, here is the [MDN entry](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures).  There are a
few more terms that ride along with closure, such as `lexical scope`, or `static scope`.
Try not to be afraid of these terms, so long as you get the idea that a function `scope`
is everything within the function plus the variables in its parent(s), you will be fine.
If the above MDN article doesn't do it for you, [Todd Motto has another post](https://toddmotto.com/everything-you-wanted-to-know-about-javascript-scope/) that
may do the trick.

In summary, a closure (remember, its a function!) does the following:
- Uses a variable locally, even though that variable is defined in a parent scope
- Essentially, it "remembers" the environment in which it was created & can keep using variables from that environment
  - The "bubble" around it doesn't pop until the function is done with its work


## Homework

Since this lesson was split in half, the homework is being modified.

<!--

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
   // call it with lots of numbers!
   // call it with an array of numbers, what then?
   // call it with things other than numbers, what should it do?
   // - is it ok to just error?
   // - or should you make it specially handle these things?
   // - sometimes an error is the right answer, give it some thought!
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

1. Now, update your say hello function so that this works:

```JavaScript
let bob = new Person('Bob', 12);
let betty = new Person('Betty', 13);

bob.sayHello();       // Hi, I'm Bob, I'm 12 years old.
// if given a person as an argument, adjust the greeting:
bob.sayHello(betty);  // Hi, Betty, I'm Bob!  I'm 12 years old, how are you?
```

-->
