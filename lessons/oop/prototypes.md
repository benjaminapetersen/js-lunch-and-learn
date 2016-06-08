```javascript

// continuing to work through:
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript
// A couple blog posts elaborating on Constructors, Prototypes, & Objects
// - http://thecodeship.com/web-development/methods-within-constructor-vs-prototype-in-javascript/
// - https://blog.pivotal.io/labs/labs/javascript-constructors-prototypes-and-the-new-keyword
// A more elablorate exmplanation of the object model (we will get to this, but if you are curious)
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Details_of_the_Object_Model







// Adding methods to our Constructors
// -----------------------------------
// - everything inside a constructor is only available to the object instance created
// - this can be very memory inefficient
var Person = function(arr) {
  this.firstName = arr[0];
  this.lastName = arr[1];
  this.email = arr[2];
  this.fullName = function() {
    return this.firstName + ' ' + this.lastName;
    //return this.firstName.concat(' ', this.lastName);
  };
};


var john = new Person(['John', 'Doe']);
var fullName = john.fullName();
console.log(fullName);  // John Doe









// Sharing methods with the prototype
// -----------------------------------
// - efficient memory usage
var Person = function(firstName, lastName, email) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.email = email;
};

// Using the prototype allows us to define methods (functions) that will be available to all instances
// These functions are stored in memory once
// all instances of 'Person' have access to this method (function)
Person.prototype.fullName = function() {
  return this.firstName + ' ' + this.lastName
};

// A person should also be able to .sayHello(), which will return, 'Hi, my name is ______'!


var john = new Person('John', 'Doe');
var fullName = john.fullName();
var hello = john.sayHello();
console.log(fullName);  // John Doe
console.log(hello); // Hi, my name is John!









// Returning
// -----------------------------------
var Person = function(name) {
  this.name = name;
  return 5; // returning some primitive value
}
var bob = new Person('Bob'); // bob will be {name: 'Bob'}, not 5. The 'return 5' is ignored when a function is used as a constructor.


```
