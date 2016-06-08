```javascript
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects

// Objects
// objects are a collection ('bag') of properties & methods
// There are ad-hoc & formal objects
// JS is very good at letting you create ad-hoc objects
// - this is awesome & useful
// - this is dangerous & potentially catastrophic :)

// array vs object
var person1 = ['Jim', 29, 'jim@redhat.com'];
var person2 = {
  name: 'Bob',
  age: 29,
  email: 'bob@redhat.com'
};

// both can use 'staples' to access values:
// arrays use numeric index
// objects use strings, named properties
person1[0]; // 'Jim'
person2['name']; // 'Bob'

// objects additionally have 'syntax sugar'
// to make it easier to get at properties:
person2.name;   // 'Bob'


// new Object()
var myCar = new Object();
myCar.make = "Ford";
myCar.model = "Mustang";
myCar.year = 1969;


// proerties that do not exist are 'undefined', but will not error:
myCar.foo; // undefined
// but will error if you go lvls deep:
myCar.foo.bar;  // error!  foo does not exist, so can't check bar.




// iteration with a for loop:
for(var i in obj) {
  console.log(obj[i]); // uses array access syntax... cannot do obj.i
}

// but, Objects inherit from other objects!  So this is better:
//
for (var i in obj) {
  // should ensure the property is not inherited
  if (obj.hasOwnProperty(i)) {  
    console.log(obj[i]);
  }
}



// can get an Object's keys:
// Object.keys will do the .hasOwnProperty for you
Object.keys(myCar);  // ['make', 'model', 'year']
// which can be used to iterate
for(var i in Object.keys(myCar)) {
  console.log(myCar[i]);
}



// a constructor function as a factory to make objects:
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

var mycar = new Car("Eagle", "Talon TSi", 1993);
var kenscar = new Car("Nissan", "300ZX", 1992);
var bobsscar = new Car("Mazda", "Miata", 1990);


// another constructor function
function Person(name, age, sex) {
  this.name = name;
  this.age = age;
  this.sex = sex;
}

var rand = new Person("Rand McKinnon", 33, "M");
var ken = new Person("Ken Jones", 39, "M");



// now, make a car fancy, give it an owner, which is another object!
function Car(make, model, year, owner) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.owner = owner;
}

var car1 = new Car("Eagle", "Talon TSi", 1993, rand);   // rand was a new Person();
var car2 = new Car("Nissan", "300ZX", 1992, ken);      // key was a new Person();


// can arbitrarily add properties:
car2.color = 'black';


// Sharing methods:
// methods are functions on an object, the function is a property of the object
car.make;    // property
car.drive()  // this function is a method, also a property of the object.
// a "method" is a normal function, but it is called slightly differently.
// we will go over this later, but there are 4 ways to call a function & it
// will affect how that function behaves.




// inheritance:
// objects can inherit from other objects



// the "this" keyword
```
