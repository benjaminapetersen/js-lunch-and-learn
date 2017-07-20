# foo-query

An super simplistic jQuery clone for the purpose of:

- real world problem solving
- demystifying a variety of concepts
- creating our own tools

Originally from [lesson-5.2.2](../../lessons/basics/lesson-5.2.2.constructors-and-classes.md)

## Task

Create a simple jQuery clone that supports the following methods:

- find (this is typically aliased as the `jQuery()` or `$` function)
- addClass
- removeClass
- hasClass
- show
- hide
- append
- text
- html
- on
- off
- find
- remove


### Functional initially

Initially it may be easier to build this in a functional way:

```JavaScript
var $item = $('.item');
addClass($item, 'foo');
removeClass($item, 'bar');
// functions are like pipes, so chaining would look like this:
removeClass(addClass($('.item'),'foo'),'bar');
// or written another way:
removeClass(
  addClass(
    $('.item'),
    'foo'),
  'bar');
```

So long as your functions return sets of DOM nodes, the above style will work just fine.

- these functions are 'stateless' or 'immutable'
- they take inputs (DOM nodes, strings, etc)
- they return outputs (DOM nodes, strings, booleans, etc)

### Supporting OOP (jQuery Style)

After you have a set of functions, you can use these to emulate jQuery:

```JavaScript
var $item = $('.item');
$item.addClass('foo');
$item.removeClass('bar');
// chaining looks like this:
$('.item')
  .addClass('foo')
  .removeClass('bar');
```

jQuery follows the Object Oriented paradigm.  This means that every time you create a new jQuery
object, it it stateful.  When you call functions (methods) on the object, it changes its state
(the DOM nodes it holds) and keeps track of these changes over time. This is a fundamentally different
way to program than the above functional method.

#### How?

The primary change will be to your `find` (`$`) function.  It will need to return a stateful Object:

```JavaScript
// all of your addClass() removeClass() hasClass() functions should be
// in this document already. now:

// a class is typically how you build stateful objects:
// this class should use your above functions.
// for example, ElementList should have .addClass(), which will
// simply call your above addClass() function for its DOM nodes.
class ElementList {}

var find = function(selector) {
  var nodes; //
  return new ElementList(nodes); // return a new instance of your class
}
var $ = find; // jQuery alias

```

#### Why chaining?

Chaining is often thought of as a jQuery specific thing, but it is not.  Many of JavaScript's
built-in objects support chaining, such as `String`, `Array`, etc.  

Chaining just means that a method, when called, returns either `this` (a reference to the same
exact object you are working with) or a new object of the same type (`Array.filter` returns a new
`Array`, for example).  So long as the method returns something that acts exactly the same way (has
the same functions/methods) you can "chain".

(Actually, you can chain different types of objects as well, so long as you know what type of object
is returned.  If I have a method called Array.foo() that returns a string, I can still chain it like
this: `Array.map().foo().trim()` and call the `.trim()` method because I know what the new `returned`
object is.)
