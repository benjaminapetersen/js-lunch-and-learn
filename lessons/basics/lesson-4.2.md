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
