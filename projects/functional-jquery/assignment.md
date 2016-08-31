**Homework**

We are going to create a collection of functions that mimic basic everyday jQuery.  Here is the list:

```javascript
ready()
find()
addClass()
removeClass()
hasClass()
on()
off()
once()

// This is how they should work:
ready(function() {
  // this should run after the document ready even fires
});

find('.some-class')  // this should return an array of elements with the matching class

// elem should be a DOM node.
// hint: use find above to get it
// hint 2: if find returns an array, will you add class to each item in the array? what if you only want to add to one item?
addClass(elem, 'my-new-class');   

removeClass(elem, 'class-to-remove');

hasClass(elem, 'class-it-might-have') // returns true or false

// hint: the 'on' function will take 3 things: var on = function(element, eventString, callback) { }
on(elem, 'click', function() {
  // function should run if the element is clicked.
});

// off
// hint: is easier if you do this:
// var callback = function() {}
// on(elem, 'click', callback)
// off(elem, 'click', callback)
// because 'callback' has to be the same function....
off(elem, 'click', callbackFn)

// once
once(elem, 'click', function() {
   // no matter how many times the elem is clicked, this function should only run the first time
});

```
