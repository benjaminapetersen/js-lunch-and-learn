```javascript
// Function utilties
// --------------------
// There is nothing explicitly new here, but hammering home functions & how they work
// is pretty key.  If we get to the point of writing them in our sleep/by muscle memory
// we are in good shape.
//
//
// The idea of a "utility" is a funciton that does some menial work that you dont want to
// write over and over and over. Consider this implementation of an each function:
//
// each
// --------------------
var each = function(list, callback) {
  for(var i = 0; i < list.length; i++) {
    cb(list[i], i, list);
  }
}
// and using the each() funciton:
var numbers = [1,2,3,4,5];
var doubledNumbers = [];

each(numbers, function(number, index, list) {
  doubledNumbers.push(number * 2);
});

console.log(doubledNumbers); // [2,4,6,8,10]

// The purpose of each:
// - nobody wants to write a for loop. its ugly and limited.
// - a for loop has limitations:
//   - you cannot declare variables inside a for loop, it does not have its own scope like a function does
//   - you have to keep track of the item you are working with like this: list[i], instead of a name like "item"
//       doubledNumbers.push(list[i] * 2);
//     vs
//       doubledNumbers.push(number * 2);
//   - it is noisy, all the guts of how it works are in your face:
//       for(var i = 0; i < list.length; i++) {
//          // do stuff
//       }
//     vs
//       each(numbers, function() { /* do stuff */    });
//   - it is much preferrable to "hide away the details" of how looping actually works, so that you can just
//     write the function that describes what YOU ACTUALLY WANT TO DO.  Conceptually, this is call "abstraction".
//
//
// Abstraction examples
// --------------------

// code that looks like this might be called prodedural.  all the steps are right in your face:
var people = [
  ['john', 'doe', 34],
  ['jane', 'doe', 22],
  ['jack', 'sparrow', 43, 'thesparrow@gmail.com']
];

var profiles = [];

for(var i = 0; i < people.length; i++) {
  profiles.push({
    name: {
      first: people[i][0].charAt(0).toUpperCase() + people[i][0].slice(1),
      last: people[i][1].charAt(0).toUpperCase() + people[i][1].slice(1)
    },
    age: people[i][2],
    email: people[i][3] || people[i][1].charAt(0) + people[i][2].substring(0,7) + '@' + 'rehat.com'
  });
};

console.log(profiles);  
// [
//  { name: {
//      first: 'John',
//      last: 'Doe'
//    },
//    age: 34,
//    email: 'jdoe@rehat.com'
//  }
//]
//
// How can we abstract it to make it more readable?
// Can we abstract it and get some reusable functions?
// Can we deal with some problematic data in a smart way?
// - try to do the same thing as above, but write funcitons to help make it more readable
// - be sure to validate data!
// - what are some good ways to handle problematic data?
//   - an email that is malformed
//   - an entire person that appears to have been input as a joke/hack/bot
var people = [
  ['john', 'doe', 34],
  ['jane', 'doe', 22],
  ['jack', 'sparrow', 43, 'thesparrow@gmail.com'],
  ['ChUcK', 'noRRis', 76, 'chuckNorris@gmaaaaaaail.coooooom'],
  [1,2,3,4],
  ['%&^&*$(#)#)#', '-----', 33333333333, 'dosigodsijgofdijofdgs']
];


```

## Homework 1

- We are going to create a utils library called `lang`.  It will be a collection of functions we can use to do basic things.

```javascript
(function() {

   window.lang = {
       each: function() {},
       // rest of functions go here
   }

})();


```



## Homework 2

- Transforming an array of arrays representing "people" into an array of objects
  with keys clarifying what each data point means.
- Hints:
  - make a plain ol isString function
  - make a plan ol isNumber function
  - make a plain ol capitalize function. every step is a variable!
  - make a plain ol email function.  ever step is a variable!

```javascript
// Here is the base data,
// as if something a bit ugly straight from some database somewhere:
var people = [
  ['john', 'doe', 34],
  ['jane', 'doe', 22],
  ['jack', 'sparrow', 43, 'thesparrow@gmail.com'],
  ['ChUcK', 'noRRis', 76, 'chuckNorris@gmaaaaaaail.coooooom'],
  // hint: comment these last two out until you are ready for them, they may break your functions!
  [1,2,3,4],
  ['%&^&*$(#)#)#', '-----', 33333333333, 'dosigodsijgofdijofdgs']
];

// OR
// perhaps we just make one thing with this:
var johnData =  ['john', 'doe', 34];
var janeData = {name: {first: 'jane', last: 'doe'}, age: 34};


// we are going to transform it into something we would rather work with!

// make an array to hold onto people.
var people = [];

// make a new people object for each item in the data
each(data, function(item) {
	// make a new object that will represent a person
	var person = {};
	person.name = {};
	person.name.first = '';
	person.name.last = '';
	person.age = '';
	person.email = '';

});

```
