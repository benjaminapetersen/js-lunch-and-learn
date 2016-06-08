```javascript

(function() {

  var validateEmail = function(email) {
   var re = /\S+@\S+\.\S+/;   // does it look like string@string.string;
   return re.test(email);     // true || false;
  };

  var makeEmail = function(first, last) {
    return first.charAt(0) + last.substr(0,7) + '@redhat.com';
  };

  var Person = function(arr) {
    this.firstName = arr[0];
    this.lastName = arr[1];

    if(validateEmail(arr[2])) {
      this.email = arr[2];
    } else {
      this.email = makeEmail(this.firstName, this.lastName);
    }
  };

  Person.prototype.fullName = function() {
    return this.firstName + ' ' + this.lastName;
  };


  // what gets exported & what stays hidden?
  window.Person = Person;

  // optionally export these utilies as well... if i dont want them to stay hidden.
  // i do know that i dont want them on the Person.prototype
  // window.validateEmail = validateEmail;
  // window.makeEmail = makeEmail;

})();

```
