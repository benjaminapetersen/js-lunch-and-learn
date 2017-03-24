# JS lesson 3

## Control flow
Resource for [control flow](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling) in general


Resource for [if statements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)


## Intro
We hit variables (var, let, const), blocks, scopes, data types and functions last week.  It was a lot to cover, but intended to be a quick overview to bring some basic familiarity to each of these fundamental concepts.  Don't worry if you don't get all the details, as long as you grasp the basic concepts we can continue.  We will be revisiting each of these concepts every week with every program we write.

## Back to the block

So a quick review, a block is a set of curly braces and whatever comes between.  Blocks can stand alone, but in practice they are not used this way (except perhaps in very rare circumstances):

```JavaScript
// This is a standalone block.  However, it isn't very useful.  You can omit the
// { } because they are not actually doing anything here.  Blocks are much more
// useful with other statements.
{
  let x = 1;
  let y = x + 1;
  console.log(y + x);
}
```

We will use blocks along with conditionals.

## Conditionals, Truthy & Falsy

### Truthy & Falsy

A conditional statement tests a condition, and will execute a block if the condition evaluates to `true`, or "truthy".  The concept of "truthy" is important.  Remember the booleans `true` and `false`.  Every other object in JavaScript has properties that generally make it "truthy" or "falsy".  These are usually easy to guess:

```JavaScript
// falsy things
false           // false itself is falsy, obviously
0               // the number zero is falsy
""              // the empty string is falsy
null            // the null object is falsy
undefined       // undefind is falsy
NaN             // NaN is a weird

// truthy things
true            // true itself
"hello"         // any other string
123             // any other number
{ }             // any object, wether or not it has properties
[ ]             // any array, wether or not it has items
"0"             // the string zero is truthy, this is a potential "gotcha"
"false"         // the string "false" is still truthy
function() { }  // any function, even if empty, is truthy
```

### Flipping & Casting

You can easily "flip" the truthy or falsy value of anything with the `not` operator, which is the `!`

```JavaScript
// flipping

!false            // evaluates to true
!true             // evaluates to false
!'hello'          // evaluates to false, is "falsy"
!123              // evaluates to false, is "falsy"

!undefined        // evaluates to true, is "truthy"
!null             // evaluates to true, is "truthy"
!0                // evaluates to true, is "truthy"
```

You can also cast any object to the boolean that represents it's own truthy or falsy nature by `!!`

```JavaScript
'hello'           // this is "truthy"
!!'hello'         // this evaluates to true

0                 // this is "falsy"
!!0               // this evaluates to false
```

Flipping and casting are little tricks you will see often in JavaScript programs because true and false are extremely useful ideas, but usually we are working with some kind of object that is a bit more complicated.  Being able to ask it its fundamental "truthiness" or "falsiness" is very useful.

## loose equality and strict equality

But what if I forget? Fortunately, you don't have to remember.  You can just experiment in the browser, as long as you remember the `!` and `!!` operators.  You can also use lose equality `==` and strict equality `===`.

```JavaScript
// the double equals represents loose equality, it tests for "truthiness" vs "falsiness"
'hello' == true     // true
1 == true           // true
{} == true          // true

0 == false          // true  (it is true that 0 loosely equals false)
null == false       // true
undefined == false  // true

'' == true          // false. the empty string is "falsy", so it loosely evaluats to false
"0" == false        // false. the string zero is still a truthy value (it is a string, JS doesn't care what the string is)

'foo' == 'bar'      // still false.  both loosely evaluate to true, but suddenly the contents matter
```

Strict equality is what you should typically use.  It wants exact matches:

```JavaScript
1 === true          // false
'hello' === true    // false
0 === false         // false
null === false      // false
```


## Conditionals

With the above concepts, we can move onto conditionals, which will make our ability to write functions much more powerful.

### The if...else statement

The `if` statement is used to test if a condition is true before executing its block

```JavaScript
if(true) {
  // do stuff
}
if('foo' == 'bar') {
  // do other stuff
}
if(a === b) {
  // do some other stuff
}
```

If can be paired with else

```JavaScript
if(a == b) {
  // do stuff
} else {
  // nope, do this instead
}

```

And can build up multiple conditionals with `else if`

```JavaScript
if(a === b) {
  // do stuff
} else if (a === c) {
  // or maybe do this
} else {
  // and if you cant do either of those, then do this instead
}

```

The key thing to remember here is that only one of the blocks will be executed, and it will be the first one that evaluates to truthy.  So in the last example, if `a === b` is truthy and `a === c` is as well, only the first block will evaluate because the first 'truthy' wins.

What about evaluating more than one thing?

There is the `&&` operator for that.  Double ampersand means "and" in many languages.

```JavaScript
if(a === b && c === d) {
  // yup, do something
}

```
An aside, don't do assignment in here, its confusing!

```JavaScript
let a = 0

if(a = 'hello') {
  // this will happen, cuz you are assigning a to 'hello'
  // right in the conditional expression which is truthy!
}

```

## Nesting if statements

You can nest if statements.  If possible, try to avoid this.  There is always more than one ways to write code, and nested if statements can become difficult to understand quickly.  However, lets make sure we cover it.


```JavaScript
// NOTE: typeof only handles primitives
// things that are objects, {}, [], Date, jQuery will always === 'object'
// this is confusing.  
// instanceof can be handy, and the .toString() method as well.
if(typeof a === 'number') {
  // do something special with numbers
} else if (typeof a === 'string') {
  // do something special with strings
} else {
  // otherwise, not a number or string, so do other stuff...
  if(!!a) {
    // handle all other truthy things
  } else {
    // else handle falsy things
  }
}

```


## For more conditionals, onward to 3.2!


## Homework

1.
```JavaScript
let timeOfDay = 13;  // use 24 hour clock so don't have to deal with am & pm
// write a conditional that logs "good morning", "good afternoon", "good evening"
// based on changing the number stored in time of day from 0 to 24.  If the number
// is above 24, handle that as well.
```

2.
```JavaScript
let name = 'John Doe';
// write a conditional that checks if name is your actual name. if so, log one message
// "<name> is the best name!" otherwise, log another "<name> eh, thats a fine name i guess".
```

3.
```JavaScript
// wite a function that uses a conditional to greet based on the time of day (like #1)
greet(9);          // good morning!
greet(13);         // good afternoon!
greet(20);         // good evening

```

4.
```JavaScript
// write a function that compares two numbers & logs which is greater
greater(22, 33);     // '33 is greater than 22'
// should log the same regardless of the order of arguments provided:
greater(33, 22);     // '33 is greater than 22'
```

5.  
```JavaScript
// revise #1 to use a function that optionally takes 'am' and 'pm'
// handle as many edge cases as possible
timeOfDay(10);
timeOfDay(10, 'am');
timeOfDay(10, 'pm');
timeOfDay(92);
timeOfDay('Jill');
timeOfDay(undefined);
```
