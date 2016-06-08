```javascript
// summarized from :
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript
//
// another helpful post:
// http://yehudakatz.com/2011/08/12/understanding-prototypes-in-javascript/
//
// The Object.prototype:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype
//
// Object.create:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create

// - OOP envisions software as a collection of cooperating objects rather than a collection of functions or simply a list of commands
// - Each object can be viewed as an independent little machine with a distinct role or responsibility.



// Typical terms in OOP (not necessarily JS...)
// --------------------------------------------------
// - Class
//   - defines a template for making objects
// - Object
//   - an instance of a class
// - Property
//   - an object characteristic
// - Method
//   - an object capability
// - Constructor
//   - A function responsible for creating objects (instances of a class)
// - Inheritance
//   - Properties or methods inherited from another class (a parent class)
// - Encapsulation
//   - Packaging of data + functions into one component
// - Abstraction
//   - Hiding the details
// - Polymorphism
//   - One consistent interface for many data types



// Caveats
// --------------------------------------------------
// - There are no classes in JavaScript, all objects are instances of an object
// - Objects are "bags of properties", key-value pairs
// - JS uses prototypes, not classes
//   - A class is a template
//   -


// Refresh: basics of creating an object
// --------------------------------------------------
var person = {firstName: 'Conroy', lastName: 'Cage'};
// is roughly the same as:
var person = Object.create(Object.prototype);
person.firstName = 'Conroy';
person.lastName = 'Cage';



// Object.prototype
// --------------------------------------------------
// - All objects in JavaScript are descended from Object (inherit from)
// - Therefore, all Objects inherit methods & properties from Object.prototype
// - A few notable:
//   - Object.prototype.constructor*
//     - the function that creates an objects prototype
//     - (this is difficult, and is ok to punt on until later)
//   - Object.prototype.hasOwnProperty()
//     - returns a boolean indicating if an object have a specified property?
//   - Object.prototype.toString()
//     - returns a string representation of the object



// "Classes" with prototypes in JavaScript
// A larger example
// --------------------------------------------------
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype
var Person = function() {
  this.canTalk = true;
};

Person.prototype.greet = function() {
  if (this.canTalk) {
    console.log('Hi, I am ' + this.name);
  }
};

var Employee = function(name, title) {
  Person.call(this);  // .call() is interesting!
  this.name = name;
  this.title = title;
};

Employee.prototype = Object.create(Person.prototype); // create an
Employee.prototype.constructor = Employee;

Employee.prototype.greet = function() {
  if (this.canTalk) {
    console.log('Hi, I am ' + this.name + ', the ' + this.title);
  }
};

var Customer = function(name) {
  Person.call(this);
  this.name = name;
};

Customer.prototype = Object.create(Person.prototype);
Customer.prototype.constructor = Customer;

var Mime = function(name) {
  Person.call(this);
  this.name = name;
  this.canTalk = false;
};

Mime.prototype = Object.create(Person.prototype);
Mime.prototype.constructor = Mime;

var bob = new Employee('Bob', 'Builder');
var joe = new Customer('Joe');
var rg = new Employee('Red Green', 'Handyman');
var mike = new Customer('Mike');
var mime = new Mime('Mime');

bob.greet();
// Hi, I am Bob, the Builder

joe.greet();
// Hi, I am Joe

rg.greet();
// Hi, I am Red Green, the Handyman

mike.greet();
// Hi, I am Mike

mime.greet();


// Namespace
// --------------------------------------------------
// A single container for all of the related functionality for a particular application or module
var myApp = myApp || {};
// is a global
window.myApp = window.myApp || {};

// sub-namespace for related functionality
myApp.views = {};
myApp.controllers = {};
myApp.models = {};
myApp.common = {};  // note: too generic typically is bad...

myApp.model.Person = Function() {}; // categorization







```
