
# JS Lesson 1

## JS is a programming language (surprise?)

### It is full of objects
    - You work with built-in objects
    - You make your own objects
    - Either way, objects are basically:
      - a bag of
        - properties
        - methods (functions)
      - this means:
        - properties are things that describe the objects
        - methods are things the object can do
      - everything follows the same pattern, even though they increase in complexity

### Example objects
  - String
    - Created by:
      ```javascript
      var animal = "Tiger";               // string literal
      var animal = new String("Tiger");   // a constructor function (more on this later)
      ```
    - has properties:
      ```javascript
      "tiger".length          // # of letters in the string, in this case, 5
      ```
    - has methods:
      ```javascript
      "tiger".charAt(0)       // t
      "tiger".charAt(2)       // g
      "tiger".concat("lion")  // "tigerlion"
      "tiger".split("g")      // ["ti", "er"]
      ```
  - Number
    - Created by:
      ```javascript
      var num = 123;                  // number literal
      var num = new Number("123");    // constructor function (more on this later)
      ```
    - properties?
    - has methods:
      ```javascript
      123.toString()          // "123"
      ```
- Accessing properties
  - dot + property name will return the value of the property
  - this is pretty straight forward

- Accessing methods / running methods
  - dot + method name will return the method
  - dot + method name + parens will run or "execute" the method
    - example:
      ```javascript
      123.toString();
      ```
  - you can give methods arguments, which change what they return or how they work
    - example:
      ```javascript
      "tiger".charAt(0)
      "tiger".charAt(3)
      ```
### Real world objects

- jQuery
  - jQuery.version        // property
  - jQuery.each()         // method
- Lodash
  - _.each()              // method
  - _.map()               // method
- Angular
  - angular.module()      // method
  - angular.controller()  // method



## Fundamentals for getting going

### Variables

Variables are containers to store values in.

```javascript
  // declare with var or let:
  var foo;
  // block scope var
  let foo;
  // const is a special kind of var that can never change:
  const foo;
```
