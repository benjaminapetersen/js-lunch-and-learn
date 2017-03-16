# More Loops!

MDN on [loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)

Lesson 4.1 covered the basics of a loop & the `for` loop.  If you can get the `for` loop down, you have what you need to work with the other loops.  Fundamentally they do the same thing, however with a different syntax or an extra feature.

## Alternative for


## Do...While

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

## While

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

## For...in

`For...in` is better used to iterate over objects than arrays.  It lets you use a temporary variable
for all of the objects property NAMES (NAMES here is key, it is not the objects values):

```JavaScript
var bob = {
  name: 'Bob',
  age: 24
}

for(prop in bob) {
  console.log(bob[prop]);
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

## For...of

`For...of` iterates over iterable objects like Array, Map, Set and the arguments object. It iterates not over the NAMES, but the VALUES.  See the difference here:

```JavaScript
// an array with a prop to set us up to show the difference
let arr = [3, 5, 7];
arr.foo = 'hello';

// the previous for...in
// iterates over property NAMES
for (let i in arr) {
   console.log(i); // logs "0", "1", "2", "foo"
}
// the for...of
// iterates over property VALUES
for (let i of arr) {
   console.log(i); // logs 3, 5, 7
}

```

## A Few Gotchas

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

## Homework

1.

2.

3.

4.

5.  
