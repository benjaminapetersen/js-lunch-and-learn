$(function() {
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

  var displayPeople = function() {
    var $peopleList = $('#peopleList');
    $peopleList.empty();

    $.each(people, function(index, value) {
      var facts;
      $.each(value, function(key, value) {
        facts += key + ": " + value + '<br />';
      });
      console.log($peopleList);
      $peopleList.append('<li>'+facts+'</li>');
    });
  };


  // pick a key to save things to in localStorage
  var storageKey = 'people';

  // this will be our list of people
  var fromStorage = localStorage.getItem(storageKey);
  var people = JSON.parse(fromStorage) || [];

  if(people) {
    console.log('render?', '');
    displayPeople();
  }

  // get the form with jQuery so we can do stuff with it
  var $form = $('form[name="person"]');
  // optimize
  var $firstInput = $('#firstName', $form);

  // do stuff when the form submits
  $form.submit(function(evt) {

    // stop the page reload, or anything, for that matter...
    evt.preventDefault();

    // now get the form data, BUT, will only get
    // inputs with a name="" attribute
    var data = $form.serializeArray();

    // transform.
    var person = makePerson(data);

    // add this person to our list of people.
    people.push(person);

    // prep all people to save, otherwise it will put
    // [object Object] into localStorage, and that means
    // all of our data is lost :(
    var toSave = JSON.stringify(people);

    // now save them!
    localStorage.setItem(storageKey, toSave);
    this.reset();

    // $(this)
        // .find('input')
        // .first()
        // .focus();
    $firstInput.focus();
    displayPeople();
  });

});
