# Function context

<!--
  TODO:
  - MDN link for context
  - this has some helpful info:
    - https://ryanmorr.com/understanding-scope-and-context-in-javascript/
  - as does this:
    - https://toddmotto.com/everything-you-wanted-to-know-about-javascript-scope/
-->

We went over scope last week.  Scope is essentially function based and can be summed up:

- Scope is the variable access of a function

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
```

Context can be thought of as object based.

- Context is the value of the "this" keyword inside a function
  - the "this" keyword points at the object that "owns" the currently executing code
    - ie, the body of the function
  - "this" might be the function itself.  If it isn't the function, it is some object, ultimately
    it can be the window object
  - JavaScript is very flexible.  The "this" keyword can easy change depending on how you call a function.

## Context & 'this' examples: a variety of contexts

The [MDN for this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

Context changes. A function can be called in different contexts, affecting how it works & what the "this" keyword represents.

### Global context

When a top level function is called (w/o strict mode), it is called with the global context (window)
by default.

```JavaScript
// when not in strict mode,
// top level functions are bound to the window object,
// which means that 'this' means 'window'.
// it is equivalent to writing:
//   window.foo = function() {}
function foo() {
  return this;
}

foo() === window; // true

```

### Function context, strict mode

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

If you want to test both of the above, the following snippet will do the trick:

```JavaScript
(function(root) {

  'use strict';

  console.log('what is this?', this);
  console.log('what is root?', root);
  console.log('are they the same?', root === this);
  console.log('are they the same?', root === this === window);

  function foo() {
    console.log('foo\'s this', this);
    console.log('is foo\s this the window?', this === root);
    console.log('is foo\s this the window?', this === window);

    function bar() {
      console.log('bar\'s this', this);
      console.log('is bar\s this the window?', this === root);
      console.log('is bar\s this the window?', this === window);
    }

    return bar;
  }

  foo();

  foo.call(this);  // oop, gonna call foo on 'this', which is...?

  var baz = foo();

  baz.call(this); // now what context?

  // but
  // window.foo `undefined`
  // window.bar `undefined`

})(this);
```



### Object method

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

### Constructor

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

new Bar() === { baz: undefined, shizzle: undefined };   // true or false?
new Bar(1, 'hello') === { baz: 1, shizzle: 'hello' }; // true or false?

```

There are a few more contexts, but we will go over them in a future session:
- DOM event handler       (tentative, will be a while till we do DOM)
- in-line event handler
- call, apply, bind       (next week)
  - these take a function & change its calling context (what!)
- arrow functions         (couple weeks from now)
  - these cannot change their calling context, even if the above call,apply, or bind are used.


## Homework

Nothing!  But...why?  

We are all super busy right now.  We'll get back to homework when things slow down.
