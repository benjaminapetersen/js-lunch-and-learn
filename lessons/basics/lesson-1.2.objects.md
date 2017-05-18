# Objects

Everything (nearly) in JavaScript is an object.  

An object can be seen of as a set of:
- properties
- methods

All objects in JS are simply collections of properties and methods.
[MDN on working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)

# {} vs new Object();

```JavaScript

// shorthand:
var myCar = {};

// using a constructor:
var myCar2 = new Object();

```

Objects in JavaScript are very flexible.  You can add properties to an object at any time:

```JavaScript

var myCar = new Object();

myCar.make = 'Toyota';
myCar.model = 'Camry';
myCar.year = 2016;
// you can even attach functions!
// functions on an object are called its 'methods'
myCar.drive = function() {}

```

Objects have a handy `dot syntax`, but you can also use a familiar `array syntax` (though requires more typing):

```JavaScript

var myCar = {};
myCar['make'] = 'Toyota';
myCar['model'] = 'Camry';
myCar['year'] = 2016;

// But why? The main reason is to use dynamic property names. You cannot use dot syntax for
// dynamic property names:

var propName = 'maxSpeedMPH';
myCar[propName] = 180;        // resolves to myCar.maxSpeedMPH = 180;
// myCar.propName = 180;      // resolves to myCar.propName = 180;  Probably not what whas intended!

```

## Object Constructor

We will get into constructors later, but another way to create objects is to use a constructor function:

```JavaScript

// by convention, capitalize the first letter in a constructor function name
function Foo() {}

// the `new` keyword tells JS to run the function as a constructor
// constructors always return a new object.  this is fundamental to their design.
// even if your function does nothing, it will still result in the creation of an object.
var foo = new Foo();   // resolves to {}

function Car(make, model, year) {
  // the keyword `this`, when used inside a constructor function,
  // represents the object that will be created.
  // adding properties to `this` will add them to the object the Constructor
  // ultimately returns
  this.make = make;
  this.model = model;
  this.year = year;
  // note: you do not have to return `this`, it is automatic with a constructor
}

var car = new Car('Toyota', 'Camry', 2016); // resolves to { make: 'Toyota', model: 'Camry', year: 2016 }

car instanceof Car; // true. a single car is an instance of the type of object returned by Car
```

You can attach objects to other objects:

```JavaScript
function Person(name, age, sex) {
  this.name = name;
  this.age = age;
  this.sex = sex;
}

function Car(make, model, year, owner) {
  this.make = make || '';
  this.model = model || '';
  this.year = year || 0;
  this.owner = owner || undefined; // owner will be a person.
}

var jack = new Person('Jack', 23, 'male');
// resolves to: {make: "Toyota", model: "Camry", year: 2016, owner: Person}
var jacksCar = new Car('Toyota', 'Camry', 2016, jack);

```

## Object.create()

If you don't care for constructor functions, there is `Object.create`:

```JavaScript
// We will create an object as a 'default' object,
// and use it as the prototype for future objects
// that we will create
var Car = {
  make: 'Toyota',
  model: 'Camry',
  year: 2016
};

// Object.create() essentially makes a copy of Car
var car1 = Object.create(Car);  
var car2 = Object.create(Car);  
// now, we can override properties if we want to make adjustments
car2.model = 'Corolla';
car2.year = 2017;

```

Prototype is a special concept in JavaScript. Everything (almost) in JavaScript is an object,
and nearly all objects are instances of another object, ultimately of Object (capitalized).  The
prototype can be thought of as the "default" object.  Objects inherit properties from their prototype,
which they can then override & change (if desired).

Prototypes are a powerful feature of JavaScript.  It provides significant flexibility.

```JavaScript
// lets say we want to make 100 cars:
var count = 0;
var cars = [];
while(count <= 100) {
  cars.push(new Car());
  count++;
};
// now we have a bunch of cars...
// uh oh, we want to give them all a defalt prop.
// how?
// by updating the prototype once:
Car.prototype.wheelCount = 4;

// did it work? yup. all cars now have a wheel count
console.log(cars[0].wheelCount); // 4
console.log(cars[20].wheelCount); // 4
console.log(cars[99].wheelCount); // 4
// and we can override for some:
cars[0].wheelCount = 6;
```

As usual, there is plenty more to know about objects, but this covers the basics of what you need to begin using them.  
Consult the MDN page referenced at the top of this document for more information.
