```javascript
// The revealing module pattern
// ------------------------------------
// - hide some helper functions, "Private", so that they cannot be called
// - reveal only what you want, such as by attaching to window (at the end)
// - "Public" functions are exported
//   - by window.fnName or attaching to Person.prototype, since we exported Person by window.Person at the end

// We will get to this guy next.
// The IIFE, which creates a clojure, to hide functions and data from the outside.
// Simply speaking, this is our secret bubble.
(function() {

  // helper functions first
  // NOTE: because these are not attached to Person.prototype, 'this'
  // does not exist.  anything you want to use must be passed into
  // the function, and it should return data back out.
  // -------------------------------------
  var validateEmail = function(email) {
    // regex for anyString@anyString.anyString... super simplistic
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // will create an email address like:
  // jdoe@redhat.com
  // company will defualt to redhat
  // suffix will default to .com if not provided
  var makeEmail = function(firstName, lastName, company, suffix) {
    return firstName.charAt(0) + lastName.substring(0,8) + '@' + (company || 'redhat') + (suffix || '.com');
  };

  // Constructor
  // -------------------------------------
  // expects: data = ['John', 'Doe', '01/23/1982', 'optional company', 'optional@email.com']
  var Person = function(data) {
    // lets put all the data in an object called attributes...
    // FWIW, this is a backbone.js trick:
    // http://backbonejs.org/#Model
    this.attributes = {
      name: {
        first: data[0],
        last: data[1]
      },
      birthday: data[2],
      company: data[3],
      email: validEmail(data[4]) ? data[4] || undefined
    };
  };

  // will create email addresses redhat style, or use an email if it was provided
  Person.prototype.email = function() {
    return this.attributes.email || makeEmail(this.firstName, this.lastName, this.company);
  }

  Person.prototype.greet = function(otherPerson) {
    return otherPerson ?
            'Hello, ' + otherPerson.attributes.firstName + ', my name is ' + this.attributes.firstName :
            'Hi, my name is ' + this.attributes.firstName;
  };

  // Lets say our constructor takes birthday:
  // new Person('Bob', '01/22/1984');
  // Age is a function for returning how many
  // years old the person is 'today'. This is
  // useful as our age changes every day but
  // we don't want to manually update that.
  Person.prototype.age = function() {
    // calcuate age using today & this.attributes.birthday
    // if we dont have birthday, the function should not blow up!
    if(!this.birthday) {
      return;
    }
    var today = new Date();
    var birthDate = new Date(this.birthday);
    var age = today.getFullYear() - birthDate.getFullYear();
    // If we haven't got to your birth date this year yet, you are 1 year younger
    // than the line above indicates
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  };


  // Now, our helper functions are invisible in here
  // and so is Person, until we attach it to window:
  window.Person = Person;

})();

```
