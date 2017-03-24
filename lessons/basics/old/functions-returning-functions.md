```javascript

// Functions that take functions as arguments or return functions are called higher order functions
// http://eloquentjavascript.net/05_higher_order.html

// quick review of calling a function.
// this is a function that will say hello to any string of text you give it:
var hello = function(someone) {
  console.log('Hello', someone);
};

// so this works:
hello('Bob');   // 'Hello Bob'

// and this:
var john = ['John', 'Doe'];
hello(john[0]); // 'Hello John'

// and this:
var jane = {name: 'Jane', age: 34};
hello(jane.name); // 'Hello Jane'

// why does this work?
// - the function is called/run using the () exactly the same way each time
// - regardless of the data, we are giving it a string each time.





// our early implementation of the makeEmail() function
// could only make @redhat.com email addresses:
var makeEmail = function(firstName, lastName) {
  return firstName.charAt(0) + lastName.substr(0,7) + '@redhat.com';
};


// but what if we wanted to make it more flexible?
// we could create a function that makes email address making functions!
// this is almost the same as the above:
var emailMaker = function(extension) {
  return function(firstName, lastName) {
    return firstName.charAt(0) + lastName.substr(0,7) + '@' + extension;
  }
};

// but now we can do this:
var redhat = emailMaker('redhat.com');
var gmail = emailMaker('gmail.com');


// which lets us do this:
redhat('john', 'doe');  // jdoe@redhat.com
gmail('john', 'doe');   // jdoe@gmail.com



// so, dealing with the same data we have always been using:
var johnData = ['john', 'doe', 34];
var janeData = ['jane', 'doe', 25, 'jdoe@yahoo.com'];
var data = [johnData, janeData];


// a single use:
redhat(johnData[0], johnData[1]);  // jdoe@redhat.com


// or a for loop:
// but.... ew, this is gross!
for(var i = 0; i < data.length; i++) {
  redhat(data[i][0], data[i][1]);
  gmail(data[i][0], data[i][1]);
}

// our friend .each() is much prettier:
data.forEach(function(item) {
  redhat(item[0], item[1]);
  gmail(item[0], item[1]);
});


// but it sure would have been nice to make it look like this first:
data.forEach(function(item) {
  redhat(item.firstName, item.lastName);
  gmail(item.firstName, item.lastName);
});



// It may look confusing initially, but if you only need to use your
// email function once, you don't have to store it in a variable.
// You can call it immediately with a second set of parens:
// (the function returns a function, and that funciton can be called right away)
emailMaker('yahoo.com')('John', 'Doe');  // jdoe@yahoo.com




// Another trivial example, a countBy() function:

var countBy = function(num) {
   var start = 0;
   return function() {
       return start += num;
   };
};

var countByOne = countBy(1);
console.log(countByOne()); // 1
console.log(countByOne()); // 2
console.log(countByOne()); // 3

var countByTen = countBy(10);
console.log(countByTen());
console.log(countByTen());


```
