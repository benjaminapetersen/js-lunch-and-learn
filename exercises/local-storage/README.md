# LocalStorage

This is a small project that uses jQuery, localStorage, JSON.stringify, JSON.parse, and some basic JavaScript to
create and eliminate people from a list with persistence.

Includes bootstrap for some basic styling of components.

## APIs to Learn

jQuery
.submit()
https://api.jquery.com/submit/
.serializeArray()
http://api.jquery.com/serializeArray/

localStorage
https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

JSON.stringify
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify

setup: npm init; bower init; bower install jQuery --save; bower install json3 --save (optional)

1. JSON.stringify() and JSON.parse
2. localStorage to put things in storage & retrieve
3. using a form, create "people" objects, save to local storage & retrieve on page load
4.  should refresh the list whenever a new people is saved!  .html(''), jQuery.each() and add DOM nodes
5. bootstrap to make it look half way decent (perhaps)
6. can show difference between localStorage & sessionStorage, short & long term

future: could do the same thing in the world of angular:
- storage services (local/session)
- service on top of storage service
- directives for UI


## A trivial example:

```javascript
// use jQuery to ensure doc is ready
$(function() {
  var obj = {name: 'bob', age: 24}
  var toStore = JSON.stringify(obj);
  var key = 'bob';
  localStorage.setItem(key, toStore);

  // then, some time passes.... or the page reloads or something...
  setTimeout(function() {
    var retrieved = localStorage.getItem(key);
    var parsed = JSON.parse(retrieved);
    console.log('bob! hes back from the cryogenic freezer just like captain america!', parsed);

    // using jQuery to append to DOM:
    $('.output')
      .html(parsed);

  }, 500);
});

```

## Assignment

The assignment is to create a list of people, print/show them on the page using jQuery, add the ability to delete individual persons, etc.


## Serving the files

serve with `python -m SimpleHTTPServer 8001`
in `/exercises/local-storage` (root) folder, then navigate to `/src`.  
The server must be started in root as the `bower_components` are not in `src`.
