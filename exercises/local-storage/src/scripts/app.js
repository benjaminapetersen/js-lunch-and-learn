$(function() {
  'use strict';

  // create "library" of functions to use
  // -------------------------------------------------------------- */
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

  var prepForForm = function(obj) {
    var keys = Object.keys(obj);
    return keys.map(function(key) {
      return {
        name: key,
        value: obj[key]
      };
    });
  };

  var setForm = function(vals) {
    vals.forEach(function(item) {
      $('#'+item.name, $form).val(item.value);
    });
  };


  var render = function(list, $tpl, $container) {
    $container.empty();
    var toAppend = '';
    list.forEach(function(item, i) {
      // This is a fairly naive way to do this, there are much better
      // templating functions, such as _.template()
      var html = $tpl.text();
      html = html.replace('{firstName}', item.firstName);
      html = html.replace('{lastName}', item.lastName);
      html = html.replace('{age}', item.age);
      html = html.replace('{email}', item.email);
      html = html.replace(/\{index\}/g, i); // need to use a regex w /g for multple...
      toAppend = toAppend + html;
    });
    $container.append(toAppend);
  };

  // note: every time we makeEditable() we generate new jQuery objects
  // and just ignore old. Newer frameworks will provide better ways to
  // optimize this!
  var makeEditable = function(list, $container) {

    $('.edit', $container).click(function(e) {
      e.preventDefault();
      var index = $(this).data('index');
      var person = list.splice(index, 1)[0];
      // take the person out of the flow
      // $personTpl here is shady :/
      render(list, $personTpl, $container);
      var forForm = prepForForm(person);
      setForm(forForm);
    });

    $('.delete', $container).click(function(e) {
      e.preventDefault();
      var index = $(this).data('index');
      list.splice(index, 1);
      // $personTpl here is shady :/
      render(list, $personTpl, $container);
      // make permanent
      localStorage.setItem(storageKey, JSON.stringify(list));
    });

  };


  // setup localStorage
  // -------------------------------------------------------------- */
  // pick a key to save things to in localStorage
  var storageKey = 'people';
  // this will be our list of people
  var people = JSON.parse(localStorage.getItem(storageKey)) || [];


  // get the jQuery objects/DOM nodes we need
  // -------------------------------------------------------------- */
  var $form = $('form[name="person"]');
  var $clear = $('#clear', $form);
  var $firstInput = $('#firstName', $form);
  var $personTpl = $('#personTpl'); // .html() more efficient?
  var $peopleContainer = $('#peopleContainer');


  // render once
  // -------------------------------------------------------------- */
  render(people, $personTpl, $peopleContainer);
  makeEditable(people, $peopleContainer);



  // setup the form
  // -------------------------------------------------------------- */
  $clear.on('click', function() {
    $form[0].reset();
    $firstInput.focus();
  });


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

    render(people, $personTpl, $peopleContainer);
    makeEditable(people, $peopleContainer);

    // prep all people to save, otherwise it will put
    // [object Object] into localStorage, and that means
    // all of our data is lost :(
    var toSave = JSON.stringify(people);

    // now save them!
    localStorage.setItem(storageKey, toSave);

    // does jQuery provide or do we need the underlying form node?
    this.reset();
    $firstInput.focus();
  });

});
