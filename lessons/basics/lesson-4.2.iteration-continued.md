# More Loops!

MDN on [loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)

Lesson 4.1 covered the basics of a loop & the `for` loop.  If you can get the `for` loop down, you have what you need to work with the other loops.  Fundamentally they do the same thing, however with a different syntax or an extra feature.

## Alternative for loops


### Do...While

The `do...while` statement is the first variant of `while`.  It looks something like this:

```JavaScript
do {
  // block
} while(/* condition */);
```

Its a strange construct, looking a bit like a backwards function (`do{ } while()`) with where the
curly braces exist.  The purpose is this:

```JavaScript
// the do {} block will execute at least once, before the while() is evaluated
do {

}
// then, after executing, the condition will be evaluated to decide if
// the block will be executed again (and again).  It will terminate when the
// condition evaluates to false
while()
```

An example:

```JavaScript
let foo = 0;
do {
  foo++;
  console.log('foo is', foo);
} while (foo < 5);
```

### While

The plain `while` statement, on the other hand, may not execute at all.  It looks much more like a
typical block statement:

```JavaScript
while(condition) {
  // statement to execute
}
```

An example:

```JavaScript
let foo = 0;
while(foo < 3) {
  foo++;
  console.log('foo is', foo);
}
```
This loop is simple to reason about & easy to use, just be sure that it is not infinite!

### For...in

`For...in` is better used to iterate over objects than arrays.  It lets you use a temporary variable
for all of the objects property NAMES (NAMES here is key, it is not the objects values):

```JavaScript
var bob = {
  name: 'Bob',
  age: 24
}

for(prop in bob) {
  console.log(bob[prop]);  // bob['name']
}

```

The key here is `all enumerable properties`.  We haven't done inheritance yet, but this means that it will enumerate over
all properties in the object up the chain of parent objects it has inherited from.  This means that there might be properties
that you did not expect.  The way to get around this is:

```JavaScript
var bob = {
  name: 'Bob',
  age: 24
}

for(prop in bob) {
  // ugh! annoying you have to add this, eh?
  // this is where a nice lib like lodash may give you helpers that
  // do things like this for you.
  // In addition, having to call a function on each iteration will cause this loop to run much slower
  if(bob.hasOwnProperty(prop)) {
    console.log(bob[prop]);  
  }
}
```

Why not do this for an array?  Because it will enumerate over user defined properties...

```JavaScript
var list = [1,2,3,4,5];
list.name = 'count';

for(prop in list) {  
  console.log('prop', prop, list[prop]);   //  1,2,3,4,5,'count'  --> this is a little odd!
}

```

### For...of

`For...of` iterates over iterable objects like Array, Map, Set and the arguments object. It iterates not over the NAMES, but the VALUES.  See the difference here:

```JavaScript
// an array with a prop to set us up to show the difference
let arr = [3, 5, 7];
arr.foo = 'hello';

// the previous for...in
// iterates over property NAMES
for (let item in arr) {
   console.log(item); // logs "0", "1", "2", "foo"
}
// the for...of
// iterates over property VALUES
for (let item of arr) {
   console.log(item); // logs 3, 5, 7
}

```

### A Few Gotchas

With any of the loops, doing strange things with the array of data you are going
to loop can cause unexpected results:

```JavaScript
// create an array with gaps:
let arr = [];
arr[10] = 5;     // you just made 10 empty spaces, then set the 11th to the value 5
arr[15] = 'bob'; // the slots between 10 and 15 are also empty
arr[125] = 34;   // a lot more empty slots
// and add some arbitrary properties to the array:
arr.id = 'foo123';
arr.someKey = 'bar';
arr.baz = 450;
// finally, we can cause our array to inherit a new prop:
Array.prototype.foo = 'bar';

// Now, using the above arr, what would happen with each of these loops:
// for(var i = 0; i < arr.length; i++) do?
// how about for(prop in arr) ?
// for(i of arr) ?
// while(i < arr.length) ?
// do { } while(i < arr.length) ?
```

In addition, properties on objects do not have an actual order.  Arrays have "slots" that will always
iterate in consecutive order (unless you choose to iterate in reverse or otherwise).  Properties can  
iterate randomly.

In the future, we may discuss speed & optimization.  Some loops are faster than others.

## Homework

```bash
# For the homework, choose a directory (perhaps near where you cloned this repo):
mkdir ~/js-lunch-and-learn
cd ~/js-lunch-and-learn
mkdir homework
cd homework
touch lesson-4.2.js
# then open lesson-4.2.js in whatever editor you want and paste the following:
#  'use strict';
#  (function() {
#     /* jshint esversion: 6 */
#     // homework question 1 goes here.  copy this IIFE for each question
#     // to ensure your answers don't collide.
#     // feel free to ask me if this is confusing.
#  })();
#
#
# Now, you can run your file with node in the terminal:
node ./lesson-4.2.homework.js
# and it should print out anything you console.log();
```

```JavaScript
// use the following data to work out the homework
// an array
let people = [
  {firstName: 'jill', lastName: 'doe', age: 23},
  {firstName: 'jane', lastName: 'doe', age: 32},
  {firstName: 'jack', lastName: 'sparrow', age: 44},
  {firstName: 'john', lastName: 'appleseed', age: 51}
];
// an object
let otherPeople = {
  jill: {firstName: 'jill', lastName: 'doe', age: 23},
  jane: {firstName: 'jane', lastName: 'doe', age: 32},
  jack: {firstName: 'jack', lastName: 'sparrow', age: 44},
  john: {firstName: 'john', lastName: 'appleseed', age: 51}
}

// wrap each answer in an IIFE so they don't collide!
(function() {

  while( /* what conditions? */ ) {
    // update your array
  }

})();
```

1. Create a list of first names using a `Do...While` loop:

```JavaScript
(function() {

  let firstNames = [];
  do {
    // update firstNames
  } while ( /* condition to start/stop the loop */ );

})();
```


2. Do the same thing, using only a `While` loop.

3. Using any of the loops from this lesson, `console.log` ONLY the final count of the number of
people in your list.  

```JavaScript
// OUTPUT:
// There are <number> people in the list.
```

4. Using your preferred looping statement, `console.log` output two lists of first names, those at even indices, and those at odd.

```JavaScript
// OUTPUT:
// The evens:
//  'jill', 'jack'
// The odds:
//  'jane', 'john'
```

5. Using any of the looping statements, output `lastName, firstName` for each person in reverse order.

6. Write or reuse your previous `makeEmail()` function, using both the people array `[]` and object `{}`.  Console.log() an email for
each person in the array, and each person in the object.

7. Write a looping function that will console log `lastName, firstName` for each person in the list, but
will skip the first 2 names.  Then, make the `skip` be a number you change and pass the function as well.

8. Write a `largest()` function that uses a loop to return the largest number in an array.

```JavaScript
var largest = largestNum([1,6,9,34,4,126,5])
console.log(largest);   // 126

// Bonus, do the same w/ individual arguments instead of an array, or ensure your function
// can handle either:
var largest = largestNum(1,6,9,34,4,126,5);
console.log(largest);  // 126
```
9. Write a function that uses a loop to iterate numbers from 0 to a max number (you provide).  For multiples of 3 it should log `Fizz`, for multiples of 5 it should log `buzz`, for both multiples of 3 and 5 it should log `FizzBuzz`

```JavaScript
// This is a bit of an old school problem, try not to google it!
fizzBuzz(100);
// 3, Fizz
// 5, Buzz
// 9, Fizz
// 10, Buzz
// 12, Fizz
// 15, FizzBuzz
// etc.
```
