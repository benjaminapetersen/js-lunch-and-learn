```javascript
// js basics
// simple fns like you would get using jQuery
(function(root, undefined) {

  // TODO: configuration object, like jQuery?
  create = function(nodeName, contents, idName, className) {
    var el = document.createElement(nodeName);
    el.innerHTML = contents;
    el.id = idName;
    el.className = className;
    return el;
  };

  var find = function(str) {  
    return document.querySelectorAll(str);
  };

  var append = function(child, parent) {
    parent = parent || document.getElementsByTagName('body')[0];
    parent.appendChild(child);   
  };

// TODO: need an export!
window.foo = {}; // hash of functions....

// test the above functions
var span = create('span', 'this is a span!', 'shizzle_pop', 'snagglepuss');
var h1 = find('h1');
append(span, h1[0]);



})(window);





(function(root, undefined) {

  var find = function(selector) {
    return document.querySelectorAll(selector);
  };

  var each = function(list, fn) {
    for(var i=0; i<list.length; i++) {
      fn(list[i], i, list);
    }
  };

  var FooQuery = function(selector) {
    this.el = find(selector);
    return this;
  };

  FooQuery.prototype.addClass = function(className) {
    // each this.el
    // addClass is actually a bit convoluted, see el.js
    return this;
  }
  FooQuery.prototype.removeClass = function(className) {
    // each this.el
    // el.classList.remove(className)
    // or see el.js for other use case....
    return this;
  }

  var init = function(selector) {
    return new FooQuery(selector);
  };

  window.fooQuery = init;

})(window);

// test the above
var foo = fooQuery('h1');
fooQuery('h1')
  .addClass('shizzle')
  .addClass('pop')
  .removeClass('shizzle')
  .addClass('shi-zz-le');

```
