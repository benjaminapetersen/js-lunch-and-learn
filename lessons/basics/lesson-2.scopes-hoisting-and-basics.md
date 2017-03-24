
# JS Lesson 2

## basics

We are going to run over these pretty quick because the basics can be rather bland.  However, its good to be familiar with things like blocks and variable scopes as they often hide bugs.  The following link is a good resource for future reference:

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Basics

## Variables

There are three kinds of variable declarations in JavaScript (and one wrong way to create variables). Variables are symbolic names for values.

```javascript
// declares a global. this is bad.
// in strict mode, it will generate a warning
foo;
// declare a variable, either local or global.
// avoid globals. more on this later.  
// initialize is recommended, but optional
var foo;
// declare a *block scope* variable.
// again, initialization is generally recommended but optional
// block scope gives you a lot more control.
let bar;
// declare a read-only "variable",
// however, since it is read-only, it does not vary.
const baz;

```

There are a few boring rules around creating variables, like they must start with a letter, underscore or dollar sign, but subsequent characters can include numbers (no dashes).

### What is block scope?

What is a block?  In short, a block is a statement that uses curly braces `{}`.

```javascript
// a global variable is attached to window (global scope)
a = 1;   // this creates window.x

// this is also global, since its not inside a function
var b = 2;

function() {
  // this is a local variable. it exists only within the function (local scope)
  var c = 3;
  // this is also local
  let d = 4;
}

// block scope comparison
if (true) {
  var x = 5; // this doesnt work, it is not block scope
  let y = 6; // but this does, "let" is block scope
}
console.log(x); // will log 5
console.log(y); // will log 'undefined'. why? becuase "let" is block scoped

```
Some examples of blocks:

```javascript
// more on blocks, if interested:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block

// a standalone block is valid... but dont do this. its weird.
{
  let a = 1;  
}

// if is a block statement
if(true) {
  let b = 2;
}

// while is a block
while(true) {
  let c = 3;
}

```

### Hoisting

You can use a variable before it is declared, but its not recommended.  This is called "hoisting". JavaScript essentially reorders your code so that it doesn't create an error, but the value will be undefined. This is very unlikely to be what you intend, therefore it is probably best to avoid this feature.

```javascript
console.log(x); // undefined... better than an error, i guess, but not great.
var x = 3;
```
It is worth noting that functions are hoisted as well, but differently.  A named function will hoist the entire function, but a function expression will not hoist the function itself.  More on this later, or see the MDN basics link.



## Data Types

There are 6 data types in JavaScript, 5 that are primitives. Primitives are not objects, so they do not have properties and methods.  The other data type is Object.  Objects and functions are going to be the fundamental elements you work with most in your programs, but these other types should be noted:

```JavaScript
  undefined, null, boolean, string, number
```

But, three of these actually do have Object counterparts:

```javascript
  boolean, string, number
  Boolean, String, Number
```

Which means they really do have properties and methods.  Woohoo!  Most of the time in your programs you will be creating booleans, strings, and numbers, and JavaScript will automatically convert them to object forms whenever needed.

For example:

```javascript
// coercion of string primitive to a string object.
let str = 'hello';   // primitive string
str.length;          // but it has a property?
str.split('e');      // returns ['h', 'llo']? becuase it has methods.
```

For more on this, visit:

https://javascriptweblog.wordpress.com/2010/09/27/the-secret-life-of-javascript-primitives/


### Literals and Constructors

You can and should use literals to represent values.  Aside from literals, there are also constructors.  These are rarely used, and often discouraged unless absolutely needed.

```javascript
// literals
let a = [1,2,3,4];  // array
let b = true;       // boolean
let c = 1;          // integers
let d = {};         // objects
let e = 'hello'     // string
let f = /ab+c/      // regex

// constructors
// we won't use these much because they tend to have 'gotchas'
let a = new Array(1,2,3,4);       // give it a list of things. or just a number, but that can be weird
let b = new Boolean(false);       // but false is already a boolean?
let c = new Number('1');          // can convert non numbers to numbers, most useful
let d = new Object();         
let e = new String('hello');      // still using the literal though
let f = new RegExp(/ab+c/, 'i');  // we will just ingore regex until later

```

## functions

Because functions are essential to JavaScript I want to cover them briefly.  We will dive into them much more in upcoming weeks, but I at least want to get an intro going so I can assign a little homework with functions to get you practicing the syntax (commit the writing of a function to muscle memory asap, it will pay off).  

Functions are a fundamental building block of writing programs in JS. A function is simpy a set of statements you can use over and over.

More on functions here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions

### Function declaration

```JavaScript
// a defintion is also called a declaration or a statement
// properties of a function:
// - the name
// - a list of arguments, enclosed by parenthesis
// - the body, which is wrapped in curly braces { }, just like a block (such as if or while)
// - the return statement specifies what the function will return to the caller
function addOne(num) {
  return num + 1;
};

```

### Function expression

There is also something called a function expression:

```javascript
// this is a function expression
// the function has no name, it is anonymous
// the function is being assigned to the variable named "addOne"
// this is an "expression" because it evaluates to a single value, in this case, the value of addOne is the function
let addOne = function(num) {
  return num + 1;
};

```
You can use both together:

```javascript

// the function is named addOne
// we also have a variable named addOne
// we can assign the variable named addOne's value to be the addOne function
let addOne = function addOne(num) {
  return num + 1;
};

```

### Calling functions

The above examples are function definitions, but they do not call the function.  Execute a function with parens.  Calling a function will cause the function to do the work defined in the function body. Give it parameters (arguments) to change its behavior or output:

```javascript
addOne(6);  // 7
addOne(7);  // 8
addOne(8);  // 9
```



## Homework

That's it for today!  Except homework.  Let's write some functions:

1.  Create an add function that will add 2 numbers together & return the value.  Call it 2-3 times with different values to ensure it works.
2.  Create additional functions that perform some other basic math.  Be sure to call each one more than once, with different arguments.
3.  Create a Red Hat email function that, when given a first name & last name, will return a Red Hat formatted email address:
```javascript
  redHatEmail('Ben', 'Petersen');  // bpeterse@redhat.com
```
This function uses strings.  Remember, strings are objects, so they will have properties and methods.  You will need to find a method that asks the `firstName` string to return just the first letter.  You will also need to find a method that asks the `lastName` string to return at most 7 letters.  Then, you will need to figure out how to connect multiple strings together.
4.  Improve the previous function by allowing an optional domain name:
```javascript
  makeEmail('Ben', 'Petersen');  // bpeterse@redhat.com
  makeEmail('Ben', 'Petersen', 'gmail'); // bpeterse@gmail.com
```
This will require looking up an `if/else` statement.  We have not covered this yet, but will next week.
5.  Make a toCelsius function
```javascript
 toCelsius(75); // 23.8889
```


I recommend typing out both the function declaration and the function expression a couple times every day until it is natural to do so via muscle memory.
