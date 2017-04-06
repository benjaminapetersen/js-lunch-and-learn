# TODO:
// some characters in utf8
http://www.computerhope.com/issues/ch000657.htm
// some of the crazy
https://mathiasbynens.be/notes/javascript-unicode


var accentA = 'à';
accentA.charAt(0)           // huh
accentA.charAt(1)           // huh
accentA.split('')           // huh
accentA.split('').reverse() // huh

var accentApple = 'àpple';
// how to reverse it?
// elppà
accentApple.split('').reverse().join('') // huh?




ASCII encoded into UTF8 works, it is backwards compatible.


// 💩 dang its a poo! wut  U+1F4A9
var poo = '💩'
poo.split('').reverse()
poo.charAt(0) // huh
poo.charAt(1) // huh
