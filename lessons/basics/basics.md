```html
<html>
<head>

<p>JavaScript Lesson 1: homework</p>

<script>
// Summary is before the actual homework
//
// Mozilla link to an overview of some of the basics:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_Types
// SUMMARY:
// -------------------------
// true and false are booleans, they work well with 'if/else' statements
var bool = true;    
var bool2 = false;   
// booleans work well with if/else statements
// TIP: everything in JavaScript is 'truthy' or 'falsy' & can act like a boolean
if(bool) {
  console.log('Stuff');
} else {
  console.log('Things');
}
// strings are objects. that means they have properties & functions (methods)
var name = 'Ben';               // string literal is like this.
var name2 = new String('Ben');  // this uses what is called a Constructor function, but is the same thing!
name.charAt(1);                  // strings can do lots of things, this is one example
// arrays are essentially lists
// arrays are objects. they also have properties & functions (methods)
var numbers = [1,2,3];          // array literal
var numbers2 = new Array();     // Array Constructor.  This can be weird...
numbers.length;                  // 3
// for loop.  one by one go through the list and do something with each item
// in this case, we are logging multiplying the number by 2: console.log(1 * 2);
for(var i=0; i<=numbers.length; i++) {
  console.log(numbers[i] * 2);  
};
// there are lots of other ways to do a for loop:
// we will discuss this more later.
$.each();
_.each();
numbers.forEach();
Array.prototype.forEach();
// objects.
// you can make your own objects, we didn't cover this yet:
var person = {};
var person2 = new Object();


// ASSIGNMENT:
// -------------------------
// given this array:
// (If animals are too corny, feel free to make your own array of coffees, cars, or whatever)
var animals = ['panda', 'llama', 'lion', 'elephant', 'duck', 'camel'];
// 1. Write a for loop that will console.log each animal name.
// 2. Write a for loop that will console.log the length of each animal name.
// 3. Use animals.forEach() to console.log each animal name.
// 4. BONUS: Loop over the array and console.log ONLY the last letter in each animal name
// This one requires a bit more problem solving, using:
// array.length
// string.length
/// string.charAt
// a for loop OR array.forEach
</script>

</head>
</html>

```


## Homework assignment answers

```javascript
var animals = ['panda', 'llama', 'lion', 'elephant', 'duck', 'camel'];
// 1. a loop that logs each animal name.
(function() {  
  var i;
  var count = animals.length;
  for(i = 0; i < count; i++) {
    console.log(animals[i]);
  }
})();
// 2. a loop that logs the length of each animals name.
(function() {  
  var i;
  var count = animals.length;
  for(i = 0; i < count; i++) {
    console.log(animals[i].length);
  }
})();
// 3. use animals.forEach() to console.log each animal name.
(function() {  
  animals.forEach(function(animal) {
    console.log(animal, animal.length);
  });
})();
// 4.BONUS: Loop over the array and console.log ONLY the last letter in each animal name
// This one requires a bit more problem solving, using:
// array.length
// string.length (remember, zero index!  so the length of an animal's name is 1 less than you think...)
/// string.charAt
// a for loop OR array.forEach
(function() {
  animals.forEach(function(animal) {
    console.log('The last character in ', animal, 'is', animal.charAt(animal.length-1));
  });
})();


```
