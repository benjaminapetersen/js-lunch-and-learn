
# Functions as objects

Just like most other things in JavaScript, functions are objects.  All objects have
`properties` and `methods`.  Recall that arrays are objects, with properties such
as `length`, and methods such as `forEach`.  Numbers are both objects and primitives
(you can define a number as a primitive, but JavaScript converts it to an object when
you work with it), as objects they have methods like `toString` and `valueOf`.

- length
- call
- apply
- bind

And a neat thing called the function prototype.

## Constructors

The function itself is an object, but special functions called `constructors` are
used to create objects.  Note that any function can be used as a constructor, so they are
not special in that sense.  However, a function should be intentionally created as
a constructor to be effective.  By convention, this typically means the first letter
of the function name will be capitalized.

In ECMAScript 2015 (es6) the concept of a
[Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) was
introduced to JavaScript.  Class is a wrapper around a constructor function, it is a "syntax sugar".  
We are learning constructors first for this reason.  

We discussed constructors in [lesson-1.2](./lesson-1.2.objects.md) when we went over
objects and the various ways to create them.  As a refresher:

```JavaScript
function Person(name, age, sex) {
  this.name = name;
  this.age = age;
  this.sex = sex;
}

function Car(make, model, year, owner) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.owner = owner;
}

var carOwner = new Person('Bob', 34);
var car1 = new Car('Toyota', 'Camry', 2016);

// making a few cars
var carData = [
  ['Toyota', 'Sienna', 2016],
  ['Ford', 'Taurus', 1998],
  ['Lexus', 'RX', 2017],
  ['Tesla', 'S', 2017]
];

var cars = [];

carData.forEach(function(data) {
  // bob will own all the cars
  // but yucky array indexing :(
  cars.push(new Car(data[0], data[1], data[2], carOwner));
});
// what we get?
console.log(cars);

// Aside #1
// a possible clarification:
// carData.forEach(function(data) {
//   var make = data[0], model = data[1], year = data[2];
//   cars.push(new Car(make, model, year, carOwner));
// });
//
// Aside #2
// can't we use .call() or .apply() to get rid of the weird array indexes?
// well, kinda.
// the problem is that Car is a constructor.
// so you cannot use `new Car()` and .call() or .apply() as
// .call() and .apply() as they simply didn't design these two uses to go together.
//
var car = new Car.apply(data); // boo, no worky.
//
// that said,
// we can use a mix of other tricks that we have learned.
// head back to lesson-1.2 and refresh on Object.create();
// Object.create() takes a prototype, which we can get from Car:
var newCar = Object.create(Car.prototype); // even though our current Car.prototype really has nothing special
// then we can:
//  - use Car.apply() as a regular function
//  - pass it the newly created object returned from Object.create(Car.prototype) as its first arg,
//    which is the context arg
//  - give it the data array as the second arg
Car.apply(newCar, data);
// and now we have a car the same as we would using new Car(/*data*/):
cars.push(newCar);
// sadly, this hardly saves us lines of code,
// and it isn't any more clear. In fact, its more complex, requiring deeper
// understanding of the idiosyncrasies of JavaScript.
// (but then again, that is why we are here!)
```


### Methods

[MDN on methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain#Inheriting_methods)

Methods are just functions attached to objects. When you attach a function (via a property), the
context of the function is changed, the function *knows* it belongs to the object and when called
will behave this way.

There are a few ways to attach methods to an object.

```JavaScript
// A method can be attached directly from within the constructor.
// these are generally frowned upon as they "leak memory" (every time the constructor fn is called,
// the same function gets created again).
function Foo() {
  this.talk = function() {};
}
// A "static" method
// This adds a function to the Foo constructor function, but this will NOT be inherited by instances.
// In typical classical languages, this is called a "static" method.
Foo.bark = function() {}

// usage:
Foo.bark();
// wont work:
var foo = new Foo();
foo.bark()  // nope. Uncaught TypeError: foo.bark is not a function

// "instance methods", attached to the prototype & shared by all
// objects created from foo:
Foo.prototype.meow = function() {};

// usage:
let foo = new Foo();
foo.meow();  // yay!
foo.bark();  // error, sad
```

So lets dive into the prototype some more.

## Prototype

[MDN Object.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype)
[MDN Prototype Based Language?](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes)
[MDN Inheritance & Prototypes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

<!--
Primary ref for this section is:
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes
-->
JavaScript is a prototype language. This means that every object in JavaScript has a prototype.  A Prototype is more or less
a template for objects.  New objects are "stamped out" based on the prototype, inheriting properties and methods from it.
Remember, objects are basically "bags of properties", a `property` can be a value (`number`, `string`, etc) or a method (`function`).

We call it the "prototype chain" because objects can inherit from objects, which can inherit from other objects... with no
formal limit.  The top of the chain is the `Object` object, and its prototype is `Object.prototype`.

In a classical Object Oriented Programming (OOP) laugage, a `class` is used as a template, and when a new object is created,
all the properties and methods are copied.  JavaScript is different.  As a prototype based language, instead of copying
everything, JavaScript "links" an object to its prototype via a `constructor` function.

```JavaScript
// create a constructor
function Person(name, age, sex) {
  this.name = name;
  this.age = age;
  this.sex = sex;
}

// create an object using that constructor
var jane = new Person('Jane', 28, 'female');

// now, we know Jane has name, age and sex since she is a "Person"
// however, Person has a prototype, and jane inherits some interesting
// things from the Person constructor's prototype (which is Object):
jane.toString() // [object Object] -> bleh, not very helpful.
jane.hasOwnProperty('name') // true
jane.hasOwnProperty('interests') // false
jane.valueOf() // {name: "Jane", age: 28, sex: "female"}
// etc
```

In the case of `valueOf`, this is what happened:

- check to see if `jane` has a `valueOf` method. nope.
- check to see if `jane`'s prototype has it.  Person is jane's prototype.  nope.
- check to see if the Person() constructor's prototype has it.  Person's prototype is the Object consructor.
  Object does have `valueOf`, so it gets called (but the `this` context is still `jane`).

So... where are things inherited from?

jane the Person() instance inherits from:

```JavaScript
  Person.prototype // -> inherits from
    Object.prototype  

We use the prototype to say "I want this property/method" to be inherited.  

As for the constructor function, the prototypes "know" about their constructor:

```JavaScript
  Person.prototype.constructor // -> Person
  Object.prototype.constructor // -> Object
```

So any functions added to prototype objects are inherited, but functions added to
constructor functions are not.

```JavaScript
// static on the constructor:
Object.keys();
Object.is();

// inherited:
Object.prototype.toString();
Object.prototype.valueOf();

// compare in the browser:
console.log({});                      // instance (literal)
console.log(new Object());            // instance (constructor)
console.log(Object);                  // constructor
console.log(Object.prototype);        // prototype

// try a built-in
console.log('a string!');             // instance (literal)
console.log(new String('a string'));  // instance (constructor)
console.log(String);                  // constructor
console.log(String.prototype);        // prototype

console.log([1,2,3]);                 // instance (literal)
console.log(new Array(1,2,3));        // instance (constructor)   
console.log(Array);                   // constructor
console.log(Array.prototype);         // prototype

// note: for our custom objects, we don't have literal vs constructor
console.log(new Person('jane'));      // instance
console.log(Person);                  // constructor
console.log(Person.prototype);        // prototype

```


<!--
HOMEWORK NOTES:

// 1
var myListOfObjects = [];
myListOfObjects.push(new Person('jack'));
myListOfObjects.push(new Person('jane'));
myListOfObjects.push(new Car('jane'));

// make a new object of same kind w/o knowing exactly:

var something = new myListOfObjects[0].constructor('jill'); // yay, good thing it remembers :)
var something2 = new myListOfObjects[3].constructor('Honda'); // yay, again.

// 2.
- make a Person() constructor
- make an array of 5 people
- now add a greet() method to person
- loop the people & call .greet()
- update greet to optionally take a Person object & greet by name
- loop the people & call .greet()
- update Person.prototype & add .farewell()
- update ONLY 1 instance of Person, people[0] to have a method
- etc.

3.
- make a Creature() constructor
- put basic properties here
- make a Person() constructor
- inherit from Creature() ?

-->
