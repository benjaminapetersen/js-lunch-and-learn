# Conditionals continued

Resource for [control flow](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling) in general

### Expressions

A quick aside on expressions, before we get going as I'll occasionally use the term.  In english, an expression is a series of words that sum up an idea.  Think of a JavaScript expression in a similar way.  A JavaScript expression is a series of variables, operators, etc that evaluate to a single value.

There are two types of expressions, those that assign a value to a variable, and those that do not.  Consider:

```JavaScript
var foo = 1;                                // assigned
123 + 456                                   // not assigned
let bar = 2 * getSomeBigNum() + Number('8') // still evalues to 1 value
```

## Switch

A full MDN page dedicated to [switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch).

A switch statement initially looks exactly like an if statement:

```JavaScript
switch() {

}
```
The `switch()` takes an expression rather than a boolean, and will attempt to
match it to one of its nested `case` labels:

```JavaScript
switch(expression) {

}

let foo = 'Bob';
switch(foo) {

}

switch(getPerson()) {

}
```

The nested case statements have labels, and the switch will look for a case that has a matching label value to the expression it was given.  If no match is found, it will run the `default` clause.  

```JavaScript
let firstName = 'Jane';
let lastName = 'Doe';
switch(`${firstName} ${lastName}`) {
  case 'Jane Doe':
    // do stuff for Jane
  case 'Fred':
    // do stuff for Fred
  default:
    // do something else
}
```

Lastly, you want to ensure to use the `break` statement at the end of each `case` clause otherwise the program may match multiple case statements and do unexpected things.  Some use this as a feature, many consider the `switch` statement dangerous or brittle:

```JavaScript
let firstName = 'Jane';
let lastName = 'Doe';
switch(`${firstName} ${lastName}`) {
  case 'Jane Doe':
    // do stuff for Jane
    break;
  case 'Fred':
    // do stuff for Fred.
    // if no break is used, the switch will execute the case for 'Jack' as well,
    // it does not have to match again.  This is why a switch can be dangerous
  case 'Jack':
    // do stuff for Jack.
  default:
    // do something else
}

```

## Errors: Throw, Try, Catch

A full MDN page dedicated to [try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch).

### Throw

We'll cover errors (exceptions) briefly, as this section is a bit more about deliberately creating them.  Yup, you can explicitly say "I want to make an error".  Why?  One example would be letting a user of your code know that they did something wrong.  Rather than letting the code continue to execute & hope they eventually figure out something isn't right, you can create an exception.  In JavaScript, the words "exception" and "error" are synonymous (though they both separately exist).

```JavaScript

let changeNumberToString = function(num) {
  if(typeof num !=== 'number') {
    throw new Error('Booooo, ' + num + ' is not a number!');
  }
  return Number(num);
}

```

### Try, Catch, Finally

More commonly, you may come across a `try... catch` statement.  This is often used to make an attempt at
something that you know might not work, but ensure your program doesn't crash.  

```JavaScript
let doHardWork = function() { /* does hard things that migth not work... */ }

// make an attempt
try {
  doHardWork();
  doHardWork();  // do the hard work twice, just cuz
}
// run this if things go bad
catch(err) {
  console.log('Bah, cant do the hard work.  Try easier work?');
  console.log(e.name, e.message); // the name & message of an error might help us figure out what went wrong
}
// bad or good, run this anyway
// most of the time this seems to get skipped
finally {
  console.log('Well, onward to the next thing.');
}

```

## Promises

The MDN doc goes over promises here.  We are going to skip them for a future lesson fully dedicated to promises as it can take a bit to wrap your mind around whats going with them. They are very useful, and a touch complicated.


## Homework

1. Implement a function using a switch statement that will make this work:
```JavaScript
// pass a grade, A, B, C, D, F to the fn. Be sure it can run multiple times accurately!
report('A');   // Great job!
report('B');   // Not bad.
report('D');   // Well....
report('F');   // Bummer
```

2.  Improve the above function so that it handles non-grade arguments. What if you pass it a number or an array?
An empty string?

3.  Write a function that uses a switch statement to let the user know if a color is primary, secondary, tertiary.  This means many case statements can execute the same code (no break needed).  To avoid too many cases, you may assume an unknown string is a tertiary color.  
```JavaScript
colorIs('blue');          // primary
colorIs('red');           // primary
colorIs('green');         // secondary
colorIs('violet');        // tertiary
colorIs('pamplemoose');   // thats not a color, its a lacroix flavor
colorIs(5);               // wut?
```
