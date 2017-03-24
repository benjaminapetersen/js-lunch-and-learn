```javascript

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions
//
// Functions

// A function is a sub-program.  
// It is a mini program that can be called repeatedly
// It is composed of a sequence of statements called a function body
// Values can be passed to a function (called parameters, or arguments)
// Functions can return a value
// ...
// In JavaScript, functions are first class objects, they can
// have properties and methods like any other object (such as strings, numbers, arrays...)
// the fact that a function can be called is what makes it unique among objects.

// this is just a random set of statements:
var a = 1;
var b = 2;
var c = a + b;
var d = c.toString();
var e = [a,b,c,d];

// this brings the same statements into a function
// and makes it reusable:
var func = function(a, b) {
  var c = a + b;
  var d = c.toString();
  return [a,b,c,d];
}
// a function can be called with different values:
var stuff = func(1, 2);
var things = func('shoes', 'socks');


// Returning
// -------------------
// Functions return a value:
var func2 = function() {
  return 1;
}
// if you omit 'return', it will return undefined
// if it is used as a constructor, it will return 'this' ('this' is an object {} )




// Homework time!
// For each of these, create a function(s) that:
//
// 1. return the square of its argument
// square(3); // returns 9
//
// 2. return the first item in an array, or the first letter in a string:
// first([4,5,6]);    // returns 4
// first('kittens');  // returns 'k'
// extra credit:  write a last() function as well
//
// 3. return the larger of 2 numbers
// larger(23, 54);   // returns 54
// larger(45, 45);   // do something sensible if they ===
//
// 4. compare 3 numbers and return the largest!
// largest(3,5,7);      // returns 7
// largest(154, 44, 6)  // returns 154
//
// 5. is arg a vowel?
// isVowel('b');        // false
// isVowel('e');        // true
// isVowel('hobbit');   // false
// isVowel(123);        // false
//
// 6. add all the numbers in an array, no matter how long, and return the total
// sum([1,2,3,4])         // 10
// sum([4,6,3,6,4,6,7]);  // 36
//
// 7. multiply all the numbers in an array, no matter now long, and return the total
// multiply([1,2,3])      // 6
//
// 8. reverse a string of characters and return it
// reverse('chucky')      // 'ykcuhc'
//
// 9. find the # of characters in the longest word in an array of words
// longestWord(['bob', 'elephant', 'kitten', 'Frodo']);  // 8
//
// 10. write a function that takes a string and returns the same string, but all words with first letter uppercase
// uppercase('hi my name is fred.') // 'Hi My Name Is Fred'
//
// 11. write a function that tells you if an array includes a value
// includes(['bob', 'jim', 'sue'], 'jim');   // true
// includes(['bob', 'jim', 'sue'], 'fred');   // false
// includes(['bob', 'jim', 'sue'], 'Jim');   // false, capitalized!  
// extra credit, add an arg that lets you ignore case & spaces:
// includes(['bob', 'jimmy', 'sue'], ' JiMmY   ');   // true
//
// 12. write a funciton that gives all but the last item in an array
// initial([1,2,3,4,5]) // [1,2,3,4]
//
// 13.




```
