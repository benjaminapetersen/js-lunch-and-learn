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


## Changing context:  call, apply, bind

The MDN links if you want to dive in further:

[MDN call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
[MDN apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
[MDN bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

A function's scope can be changed.  Practically, this works out to be like "borrowing" a function to
use it on another object.  Typically this is most useful when you are borrowing the method of an object.

### Call

This is going to sound a little dense, but let it sink in.  Using the Function method `call`, you can
call a function (you are always calling functions when you add the parens) as if it belonged to another
object (its context).

Lets set up a situation to use call:

```JavaScript

// Person is a constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHi = function() {
  return 'Hi, my name is' + this.name;
}


var jane = new Person('Jane', 30);

jane.sayHi();  // hi!

```

Now, somewhere in our app perhaps we have another object that isn't a person, but we could
borrow the `sayHi` method:

```JavaScript

var talkingCar = {
  name: 'Herbie',
  age: 60
}

// we can borrow sayHi from jane, or from Person
jane.sayHi.call(talkingCar); // Hi, my name is Herbie

Person.prototype.sayHi.call(talkingCar); // Hi, my name is Herbie

```

Now, lets say we want our `sayHi` to be able to greet a specific other person (or any object
that has a name property):

```JavaScript
Person.prototype.sayHi = function(obj) {
  if(obj.name) {
    return 'Hi, ' + obj.name + '. My name is ' + this.name;    
  }
  return 'Hi, my name is' + this.name;
}

var bill = new Person('Bill', 35);

bill.sayHi(jane);

// and our talking car can still borrow the method, but has the opportunity to
// also greet specific other named beings:
// who! weird, we borrowed bill's sayHi method to have herbie say Hi to...bill?
bill.sayHi.call(talkingCar, bill);
// and again to talk to Jane
bill.sayHi.call(talkingCar, jane);  
```

### Apply

Apply is a sibling to call.  It lets you do the same thing, but with a subtle difference:

```JavaScript
// if we updated our sayHi function to be able to greet multiple people,
// this is how it would look to call and apply the function:
// call takes arguments individually:
bill.sayHi.call(talkingCar, jane, jeff, jethro);
// apply takes arguments as an array
bill.sayHi.apply(talkingCar, [jane, jeff, jethro]);
```

### Bind

While call and apply borrow a function and use it temporarily, bind is the third sibling and is a
bit more demanding.  Bind takes the function, makes a copy, and PERMANENTLY sets the `this` object to
the new object:


```JavaScript
bill.sayHi.call(talkingCar, jane, jeff, jethro);
bill.sayHi.apply(talkingCar, [jane, jeff, jethro]);
var carSayHi = bill.sayHi.bind(talkingCar);
// carSayHi is an entirely new function
// it is permanently attached to talkingCar
carSayHi(jane, jeff, jethro);
// it is so permanently attached that you cannot even call or apply it
// to change the context again.  It will stubbornly stay attached to
// our talkingCar:
carSayHi.call(bill); // nope, its still gonna be a part of talkingCar!
carSayHi.apply(bill); // same

// now, if we wanted to be sensible we could do this:
talkingCar.sayHi = bill.sayHi.bind(talkingCar);

// aha!
bill.sayHi(talkingCar);
talkingCar.sayHi(bill);
```

There are a lot of applications for these functions, but admittedly they can be tricky.  Here
are some examples of use:


## Some examples

Examples help make crazy things appear to be at least somewhat useful.  Here is a few:


### call example

This one is taken from [MDN Call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) examples:

```JavaScript

function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

function Toy(name, price) {
  Product.call(this, name, price);
  this.category = 'toy';
}

var cheese = new Food('feta', 5);
var fun = new Toy('robot', 40);

```


## apply example

This one could be done with call as well, since they are siblings (remember, same just little different):

```JavaScript
// lets say we setup a person
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHi = function(otherPerson) {
  if(otherPerson) {
    return 'Hi ' + otherPerson.name + ', my name is ' + this.name;  
  }
  return 'Hi, my name is ' + this.name;
}


var jane = new Person('Jane', 30);

jane.sayHi();  // hi!

// but at some point, we realize sayHi isn't quite what we need.  
// This is called "monkey patching"

var originalSayHi = Person.prototype.sayHi;

// basically, we drop in a new function, do a little work,
// and then call the original that we replaced with this little trick:
Person.prototype.sayHi = function() {
  // perhaps we want to do a little more work first
  console.log('Hi, my name is ' + this.name);
  return originalSayHi.apply(this, arguments);
}

var bill = new Person('Bill', 40);
var whatBillSays = bill.sayHi(jane);
console.log('finally:',whatBillSays);
```


### bind example

```JavaScript
// Person is a constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// this time we are just console.logging' the greeting, for simplicity
Person.prototype.sayHi = function(objWithName) {
  console.log('Hi, my name is' + this.name);
}

// this will wait a second before sayingHi
Person.prototype.sayHiLater = function() {
  // this is broken!  sayHiLater will be called in the context of setTimeout
  // and lose track of the person who owns it
  setTimeout(this.sayHiLater, 100);  
  // however, this will work!
  // the .bind() will return a new function, permanently bound to the  
  // person who owns it at this moment, and when it is called in 1000ms
  // it will still work correctly.
  setTimeout(this.sayHiLater.bind(this), 1000);
}


var jane = new Person('Jane', 30);
jane.sayHi();  // hi!

```

## Homework

Nothing!  But...why?  

We are all super busy right now.  We'll get back to homework when things slow down.
