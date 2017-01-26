// booleans
true
false


if(true) {
  // this will run.
}


// falsy things.... they will "loosely evaluate" to false
false
0  // falsy
''
null
undefined
NaN

// truthy things will 'losely evalute' to true
1
'hello'
123
{}
[]
'0'  // truthy
'false' // truthy
function() {}


if(function() {}) {
  console.log('hello world.');
}


// flipping and casting
! // = is not

!true

if(!true) {}
if(!false) {}


let foo = 'hello'

if(!foo) {
  // this will go
}



!!'hello'    //

let foo2 = 'hello';
let foo3 = !!foo2;     // true;

if(!!foo2) {
  // do something.
}


// Equality, strict or loose
1 == true;    // true
1 === true    // false



let foo = 'hello';
let bar = false;

// first one wins....
if(foo && bar) {
  // do stuff
} else if(! bar) {
  // do other stuff
} else {
  // do the last thing.
  if() {
    if() {

    } else if() {
      if() {

      }
    }
  }
}




let something = 'foo';

switch something {
  case 'foo' :
    // do this
    break;
  case 'bar' :
    // do this
  case 'baz' :
    // do this
  case 'shizzle' :
    // do this
  default:
    // do the last thing.
}
