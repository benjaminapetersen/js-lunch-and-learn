
## Changing context:  call, apply, bind

The MDN links if you want to dive in further:

[MDN call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
[MDN apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
[MDN bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

A function's scope can be changed.  Practically, this works out to be like "borrowing" a function to
use it on another object.  Typically this is most useful when you are borrowing the method of an object.

### Call

This is going to sound a little dense, but let it sink in.  Using the Function method `call`, you can
call a function (you are always calling functions when you add the parens) as if it belonged to another
object (its context).

Lets set up a situation to use call:

```JavaScript

function sayHi(name) {
  console.log('hi', name);
};

sayHi('bob'); // hi bob

// when you add parents to a function, you are calling the function
// this is syntax sugar for using .call():
// JavaScript is essentially doing this for you when you call a function:
sayHi.call(sayHi, 'bob');  // hi bob

// The first arg is the context, which only matters if the function uses
// the "this" keyword internally.  Othewise, this version will do the
// same thing as above:
sayHi.call(null, 'bob'); // hi bob

// so in summary, these all do the same thing:
sayHi('bob');
sayHi.call(sayHi, 'bob');
sayHi.call(null, 'bob');

```

Now lets take it a step further:

```JavaScript

// Person is a constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHi = function() {
  return 'Hi, my name is' + this.name;
}


var jane = new Person('Jane', 30);

jane.sayHi();  // hi!

```

Now, somewhere in our app perhaps we have another object that isn't a person, but we could
borrow the `sayHi` method:

```JavaScript

var talkingCar = {
  name: 'Herbie',
  age: 60
}

// we can borrow sayHi from jane, or from Person
jane.sayHi.apply(talkingCar); // Hi, my name is Herbie

Person.prototype.sayHi.apply(talkingCar); // Hi, my name is Herbie

```

Now, lets say we want our `sayHi` to be able to greet a specific other person (or any object
that has a name property):

```JavaScript
Person.prototype.sayHi = function(obj) {
  if(obj.name) {
    return 'Hi, ' + obj.name + '. My name is ' + this.name;    
  }
  return 'Hi, my name is' + this.name;
}

var bill = new Person('Bill', 35);

bill.sayHi(jane);

// and our talking car can still borrow the method, but has the opportunity to
// also greet specific other named beings:
// who! weird, we borrowed bill's sayHi method to have herbie say Hi to...bill?
bill.sayHi.call(talkingCar, bill);
// and again to talk to Jane
bill.sayHi.call(talkingCar, jane);  
```

### Apply

Apply is a sibling to call.  It lets you do the same thing, but with a subtle difference:

```JavaScript
// if we updated our sayHi function to be able to greet multiple people,
// this is how it would look to call and apply the function:
// call takes arguments individually:
bill.sayHi.apply(talkingCar, jane, jeff, jethro);
// apply takes arguments as an array
bill.sayHi.apply(talkingCar, [jane, jeff, jethro]);
```

### Bind

While call and apply borrow a function and use it temporarily, bind is the third sibling and is a
bit more demanding.  Bind takes the function, makes a copy, and PERMANENTLY sets the `this` object to
the new object:


```JavaScript
bill.sayHi.apply(talkingCar, jane, jeff, jethro);
bill.sayHi.apply(talkingCar, [jane, jeff, jethro]);
var carSayHi = bill.sayHi.bind(talkingCar);
// carSayHi is an entirely new function
// it is permanently attached to talkingCar
carSayHi(jane, jeff, jethro);
// it is so permanently attached that you cannot even call or apply it
// to change the context again.  It will stubbornly stay attached to
// our talkingCar:
carSayHi.call(bill); // nope, its still gonna be a part of talkingCar!
carSayHi.apply(bill); // same

// now, if we wanted to be sensible we could do this:
talkingCar.sayHi = bill.sayHi.bind(talkingCar);

// aha!
bill.sayHi(talkingCar);
talkingCar.sayHi(bill);
```

There are a lot of applications for these functions, but admittedly they can be tricky.  Here
are some examples of use:


## Some examples

Examples help make crazy things appear to be at least somewhat useful.  Here is a few:


### call example

This one is taken from [MDN Call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) examples:

```JavaScript

function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

function Toy(name, price) {
  Product.call(this, name, price);
  this.category = 'toy';
}

var cheese = new Food('feta', 5);
var fun = new Toy('robot', 40);

```


## apply example

This one could be done with call as well, since they are siblings (remember, same just little different):

```JavaScript
// lets say we setup a person
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHi = function(otherPerson) {
  if(otherPerson) {
    return 'Hi ' + otherPerson.name + ', my name is ' + this.name;  
  }
  return 'Hi, my name is ' + this.name;
}


var jane = new Person('Jane', 30);

jane.sayHi();  // hi!

// but at some point, we realize sayHi isn't quite what we need.  
// This is called "monkey patching"

var originalSayHi = Person.prototype.sayHi;

// basically, we drop in a new function, do a little work,
// and then call the original that we replaced with this little trick:
Person.prototype.sayHi = function() {
  // perhaps we want to do a little more work first
  console.log('Hi, my name is ' + this.name);
  return originalSayHi.apply(this, arguments);
}

var bill = new Person('Bill', 40);
var whatBillSays = bill.sayHi(jane);
console.log('finally:',whatBillSays);
```


### bind example

```JavaScript
// Person is a constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// this time we are just console.logging' the greeting, for simplicity
Person.prototype.sayHi = function(objWithName) {
  console.log('Hi, my name is' + this.name);
}

// this will wait a second before sayingHi
Person.prototype.sayHiLater = function() {
  // this is broken!  sayHiLater will be called in the context of setTimeout
  // and lose track of the person who owns it
  setTimeout(this.sayHiLater, 100);  
  // however, this will work!
  // the .bind() will return a new function, permanently bound to the  
  // person who owns it at this moment, and when it is called in 1000ms
  // it will still work correctly.
  setTimeout(this.sayHiLater.bind(this), 1000);
}


var jane = new Person('Jane', 30);
jane.sayHi();  // hi!

```

Big difference to note between call, apply & bind.  Bind returns a new function,
call & apply do not (they "borrow" the function & run it with a different context).

Also, there is another "borrow" that changes context w/o any special functions:

```JavaScript

var foo = {
  name: 'foo',
  bar: function() {
    console.log('name is', this.name);
  }
}

var baz = {
  name: 'baz',
  bar: foo.bar // borrowing... what happens to 'this'?
}

var shizzle = {
  name: 'shizzle'
};
shizzle.bar = baz.bar.bind(shizzle); // double borrowed?

var pop = {
  name: 'pop'
};
pop.bar = shizzle.bar.bind(pop);  // oop, double bind the borrowed?

```

## Homework

Nothing!  But...why?

Call, apply, and bind are super helpful contexts to understand. That said, they are complicated,
and can lead to some pretty convoluted code (at this point).  For now, I recommend avoiding the use
of these functions. They are great for solving very specific problems, and great for making very
confusing code.  

But the more you know, the better you can debug, either your own code or someone else's &#128169;
