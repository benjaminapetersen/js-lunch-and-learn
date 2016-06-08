```javascript

// Some homework items to refresh last weeks concepts!
var personData = ['Bob', 32, 'bob@redhat.com'];



// plain function
// ------------------------------
var makePerson = function(arr) {
  return {
    // what goes here?
  };
}

var person1 = makePerson(personData);
console.log(person1); // should log {name: 'Bob', age: 32, email: 'bob@redhat.com' }



// Constructor
// ------------------------------
var Person = function(arr) {
  // what goes here?
}

var person2 = new Person(personData);
console.log(person2); // should log {name: 'Bob', age: 32, email: 'bob@redhat.com' }




// List of data w/a constructor
// ------------------------------
var animals = [
  ['lion', 'mammal'],
  ['penguin', 'bird'],
  ['shark', 'fish'],
  ['elephant', 'mammal']
];

// need Animal constructor here


animals.forEach(function(animalData) {
  var animal = new Animal(animalData);  
  console.log(animal); // {name: 'lion', type: 'mammal'}
});



//////////

var personData = ['Bob', 32, 'bob@redhat.com'];
// i need to make this:
var obj = {
  name: '',
  age: '',
  email: ''
}

// I just want to turn the above array into an object...
var makePerson = function(arr) {
   return {
     name: arr[0],
     age: arr[1],
     email: arr[2]
   };
};



var Person = function(arra) {
  this.name = arr[0];
  this.age = arr[1];
  this.email = arr[2];
}

///////////




```

- animals.forEach() works because all arrays have the same methods (functions) available
- we want to do the same thing with our custom objects.... all Persons, all Animals, should have the same methods (functions) available
- next lesson....
