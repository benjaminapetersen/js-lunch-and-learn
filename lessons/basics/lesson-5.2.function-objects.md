<!--
TODO:
- what order should these be in?
- how should it relate to

-->
# Functions as objects

Just like most other things in JavaScript, functions are objects.  All objects have
`properties` and `methods`.  Recall that arrays are objects, with properties such
as `length`, and methods such as `forEach`.  Numbers are both objects and primitives
(you can define a number as a primitive, but JavaScript converts it to an object when
you work with it), as objects they have methods like `toString` and `valueOf`.

- length
- call
- apply
- bind

And a neat thing called the function prototype.


# Methods

```JavaScript
// static methods, attached directly to the Foo function
function Foo() {
  this.talk = function() {};
}
Foo.bark = function() {}

// usage:
Foo.bark();

// "instance methods", attached to the prototype & shared by all
// objects created from foo:
Foo.prototype.meow = function() {};

// usage:
let foo = new Foo();
foo.meow();
foo.bark();  // won't work, foo is an object created by Foo as a constructor,
             // the functions attacked to Foo are not copied over, but the
             // functions attached to Foo.prototype are.
```


# Constructors

The function itself is an object, but special functions called `constructors` are
used to create objects.  Note that any function can be used as a constructor, so they are
not special in that sense.  However, a function should be intentionally created as
a constructor to be effective.  By convention, this typically means the first letter
of the function name will be capitalized.

# Prototype
