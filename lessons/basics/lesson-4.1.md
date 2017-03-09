# Loops, Iteration & Arrays


## Types of loops

MDN on [loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration).

There are a number of different kinds of loops, but they all essentially do the same thing.  The job of a loop is to repeat a task once for each iteration of the loop, and often once for each item in the list being looped.  The different kinds of loops give us different ways to determine how the loop will start and end.

- for
- do...while
  - can include labels
- break
- continue
- for...in
- for...of

You can go a long way with a simple for loop, but it will be beneficial to learn the other loop types as well.

Before we can loop, we need something to loop over.  Thus, we are going to take a quick excursion back into arrays as these are the most common object that you will loop.  Besides arrays, you can loop over object keys, or choose to increment/decrement a number, such as 1 to 5.    


## Arrays, a quick refresh so we have something to loop

MDN overview of [arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

Fundamentally, an array is a list (but with a lot of bells and whistles).  

```JavaScript
// you create an array literal with "staples", opening and closing square brackets:
// the items in an array are separated by commas
let arr = [1,2,3,4,5];

// JavaScript lets you mix and match arrays:
// including nesting arrays within another array
let arr2 = [1,2,3,'four','5','kittens','unicorns',[10, 'what just happened?!']]
let nested = [[1,2],[3,4]];

// and you can deliberately leave empty spots in your array:
// (but this is kinda weird)
let arr3 = [,,,4,,,,,,5,,,,,6];

```

It is important to remember that in JavaScript, arrays are objects, and they have properties and methods, just like other objects.  So while arrays have nifty things like `array.length`, `array.push()`, `array.pop()`, etc, we are concerned today only with the fact that an array is a list of items that we can use in our loops.

Aside, when programming, you will likely come across at least 2 styles: Object Oriented, and Functional.  Object oriented styles will likely make use of array methods directly:

```JavaScript
// Object oriented will "ask" the list object for what it wants.
let list = [5,10,15,20,25];
let firstLargerThanFifteen = list.find(function(item) { return item > 15; });
```
Functional, on the other hand, will likely treat the array as data and will use functions that act on the data:

```JavaScript
let list = [5,10,15,20,25];
let firstLargerThanFifteen = _.find(list, function(item) { return item > 15; });
```

This is a simple, quick and dirty comparison, but it illustrates how an array can be treated as just data, or much, much more.

Now, back to loops!


## The For Loop

MDN reference for the [for loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/statements/for).

We're gonna focus on the for loop because if you can nail this one down, you should be able to pick up other kinds of loops without too much trouble.  I highly recommend practicing a for loop until you have it down to muscle memory. It feels a bit clunky to write at first.

A for loop looks much like an if statement initially:

```JavaScript
// keyword, parens, a block to execute (repeatedly)
for() {

}
```
However, a for loop takes 3 statements (expressions) :

```JavaScript
// 3 expressions, separated by a semicolon.
// the for loop uses all three to do its job
for(/* initial */; /* condition */; /* increment */) {

}

// with the initial
for(let iterator = 0; /* condition */; /* increment */) {

}

// what will kill the loop?
for(let iterator = 0;  iterator < 10; /* increment */) {

}

// what should it do at the end of each loop to ensure it moves a step closer to completion?
for(let iterator = 0;  iterator < 10; iterator++) {

}

// the full loop:
for(let iterator = 0;  iterator < 10; iterator++) {
  console.log('looped', iterator, 'times');
}

// using an array
let names = ['jill', 'jane', 'jack', 'john'];

for(let iterator = 0;  iterator < names.length; iterator++) {
  // names[iterator] will pick out the item represented by each run of the loop
  console.log('looped', iterator, 'times, and the name is:', names[iterator]);
}

```

## Homework

1. Create a `makeEmail()` function using the following list:
```JavaScript
let names = ['jill', 'jane', 'jack', 'john'];

makeRedhatEmails(names);  // should console.log() jill@redhat.com, etc
```

2. Update the above function to take a argument, else default to redhat.com
```JavaScript
let names = ['jill', 'jane', 'jack', 'john'];

makeEmails(names, 'gmail.com');  // should console.log() jill@gmail.com, etc
```

3. Update the function again to take first name & last name arrays:
```JavaScript
let names = [
  ['jill', 'doe'],
  ['jane', 'doe'],
  ['jack', 'sparrow'],
  ['john', 'appleseed']
];

makeEmails(names, 'gmail.com');  // should console.log() jill@gmail.com, etc
```

3. Update the function again to take first name & last name arrays:
```JavaScript
let names = [
  {firstName: 'jill', lastName: 'doe'},
  {firstName: 'jane', lastName: 'doe'},
  {firstName: 'jack', lastName: 'sparrow'},
  {firstName: 'john', lastName: 'appleseed'},
];

makeEmails(names, 'gmail.com');  // should console.log() jill@gmail.com, etc
```

4. Do any of the above, but take the loop out of the `makeEmail` function:
```JavaScript
let names = [ /* names */];
for(/* */) {
  makeEmail();  // console.log() each new email
}
```

5. Come up with a reason to use a loop within a loop.




<!-- end -->
