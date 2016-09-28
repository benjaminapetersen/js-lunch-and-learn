// could look like this?
// [
//   {
//     metadata: {
//       date: Date.now(),
//       due: Date.now() + 10000
//     },
//     title: 'The thing to do',
//     description: 'Something I really need to do'
//   }
// ]
var random = 1000;
// random objects to send back!
// conceptually, this is stuff from a database...
// just hard-coded for now.
module.exports = [{
  title: 'This is something to do',
  description: 'Go do....',
  metadata: {
    created_date: Date.now() + (random++),
    due_date: Date.now() + (random++) + 10000
  }
}, {
  title: 'This is something else to do',
  description: 'Go do....',
  metadata: {
    created_date: Date.now() + (random++),
    due_date: Date.now() + (random++) + 10000
  }
}];
