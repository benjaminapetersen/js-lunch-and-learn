## short lesson on commenting your work first.

break down a task into small steps!

```JavaScript
// write a function that will take any string and uppercase all of the words in the string
var upperCase = function() {
  // 1. first, can we break the string into an array of individual words?
  // 2. then can we loop each word?
  // 3. can we then get the first letter of each word as a var?
  // 4. can we get the rest of the letters in the word?
  // 5. can we upppercase just the first letter?
  // 6. can we now put the word back together, using the uppercased first letter?
  // 7. can we somehow add the word to a new array of words we will eventually return?
  // 8. can we make this new array back into a string & return it?
}

upperCase('hi')                     // Hi
upperCase('hi, my name is bob.')    // Hi, My Name Is Bob.
upperCase(123);                     // do we care if the arg is wrong? 
```
