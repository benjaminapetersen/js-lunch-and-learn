(function() {
  'use strict';

  // data is an array of objects that look like this:
  // [
  //   {name: '', value: ''},
  //   {name: '', value: ''}
  // ]
  // each object, is one of our form inputs.
  // this function, will smash that array of objects
  // down into ONE object that looks like a single person,
  // and return it.
  var makePerson = function(data) {
    var person = {};
    data.forEach(function(item, i) {
      // why bracket notation? like an array?
      // because person.item.name would confuse JS
      // into thinking you want to ask for a value.
      person[item.name] = item.value;
    });
    return person;
  };


  // this will be our list of people
  var people = [];

  // pick a key to save things to in localStorage
  var storageKey = 'people';


  // get the form with jQuery so we can do stuff with it
  var $form = $('form[name="person"]');

  // do stuff when the form submits
  $form.submit(function(evt) {
    // stop the page reload, or anything, for that matter...
    evt.preventDefault();

    // now get the form data, BUT, will only get
    // inputs with a name="" attribute
    var data = $form.serializeArray();
    console.log('form data', data);
    // transform.
    var person = makePerson(data);
    console.log('make person', person);

    // add this person to our list of people.
    people.push(person);

    // prep all people to save, otherwise it will put
    // [object Object] into localStorage, and that means
    // all of our data is lost :(
    var toSave = JSON.stringify(people);
    console.log('stringify to save', toSave);

    // now save them!
    localStorage.setItem(storageKey, toSave);
  });

})();
