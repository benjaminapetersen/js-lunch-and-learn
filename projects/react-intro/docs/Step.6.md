# Step 6

We need to do a few things now

- Add real checkboxes so we can mark exising todos as `done`.
- Submit the todos with the `enter` key (convenience).

## Submit on `enter`

We already have a `handleChange()` function in our `TodoForm`.
This is where we will want to add our logic.  We will need 
to check which key is pressed every time there is an update 
event, then if the key matches the `code` for the `enter` key, 
we can call our `submit` handler:

```JavaScript 
handleChange(event) {
    console.log(`changed: ${event.target.value}`);
    this.setState({
        todo: {
        text: event.target.value
        }
    });
    if(event.key === 'Enter') {
        this.handleSubmit();
    }
}
```

Piece of cake.

## Checkboxes

Now, lets update our `todo` item to use a real checkbox.
Eliminate the `isDone` and `[ ]` logic.

```JavaScript 

// we can also inline the export:
export default class Todo extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log('target',target);
    console.log('value', value);
    console.log('name', name);
    console.log('complete', this.props.complete);
  }
  render() {
    // lets use destructuring to get our individual properties!
    const { id, text, complete } = this.props;
    
    return (
      <li
        className={ 'todo ' + (complete ? 'complete' : '') }
        id={`todo-${id}`}>
        {text} 
        <input 
            id={`todo-check-${id}`} 
            type="checkbox" 
            checked={complete}
            onChange={this.handleChange}
            />
      </li>
    );
  }
}
```

So, that works, but now we need to decide... who owns the idea of `complete`? 

- where should we toggle `complete` from true to false?
- should the `todo` item itself handle this?
- if data flows one way... then should the `App` at the top level actually 
  handle the change in data state?
- how do we separate concerns, if the `App` is supposed to handle the data 
  change?
- should this `input` be wrapped in a `form`?

If we want to handle `complete()` as an action, just like we handled `newTodo()` 
as an action in our `TodoForm`, we probably need a `complete()` function in our 
`App.js` that we can pass to our `TodoList`.  The `TodoList` should pass the 
function to each `Todo`.  Then, when the `onChange()` event is fired in our `Todo` item,
we need to call the function from `App.js`.  Somehow it needs to know which `Todo` 
item to update/change (copy and return new?) so that it can then cascade the new 
data down to the `TodoList`.  That probably means that we have to give our `TodoList` 
a completely new set of todos each time we mark `complete()`.


## Homework 

In class we made it through to the point of `toggleTodo(id)` in `App/index.js`.
The code looks like this:

```javascript 
  toggleTodo(id) {
    console.log(`Toggle Complete: ${id}`);
    // TODO:
    // - need to toggle the todo...
    // - can we find the correct todo by 
    //   the id that we passed? yes.
    //   - this.state.todos.find()
    // - update? or copy?
    // - render out the list again....
  }
```

For homework, lets make this work!  The basic steps are outlined in the comments.


<!--
// reading the source?
// cheating?  😝 
// if so, take a look at this:
// - https://scotch.io/tutorials/create-a-simple-to-do-app-with-react
// it will give you some good hints for what to do next
//
//
// 
// TODO:
// Next up! what to do with the todo?
// submit should:
// - submit form with button
// - submit form with enter key
// - pass the todo to the list (somehow)
//   - whats the best way?
//   - who is the best mediator?
//     - should we call a function on the parent?
//     - should we import a function that can be shared?
//     - who owns todos, should that component be fully responsible
//       for all creates & updates & just expose an interface (ie,
//       share a function or an event) with other components for
//       consolidating the update logic?
//     - NOTE: this is the fundamental problem that flux, redux and other
//       concepts attempt to solve.
// - reset the form for creating new todos

FUTURE:
use express.js so we can CRUD
  be sure to include a reset() if we
  mess up our todos

ADDITIONAL IDEAS:
- look at TODO list apps like rememberthemilk.com for some additional features
- createdAt timestamp
- dueAt timestamp
- filter out "complete" into separate list
- multiple lists / list creation
- additional sidebar filtering:
  - lists list in the sidebar for toggling lists / all
  - incomplete, complete, overdue filters in sidebar
  - sort functions in sidebar: name, priority, created, due, etc
  - tags in sidebar, for even more sorting/filtering/organization 
    - technically, implement lists as a tag, but prefix with +list+:<name>, 
      just don't show the +list+: prefix, for best flexibility(?) just 
      needs to be a string that is not common/allowed for standard users to 
      actually create.
  
TODO LIST APP 
===========================================
[] list 1                     | lists (filter)
   [] item 1 <due>            |  - list 1 (12 items)
   [] item 2 <due>            |  - list 2 (15 items)
   [] item 3 <due>            |
     optional description     |  
   - complete -               | Status (filter)
   [x] item 4 (done)          |  - incomplete (12 items)
                              |  - complete (6 items)
[] list 1                     |  - overdue (8 items)
   [] item 1 <due>            | 
   [] item 2 <due>            | Tags (filter)
   [] item 3 <due>            |  - home
                              |  - work
                              |  - foo
                              |  - bar                                                            
-->

// lists
[{
  name: "List 1",
  todos: [{
    id: '',
    complete: '',
    title: '',
    description: '',
    createAt: '',
    dueAt: '',
    tags: ['foo', 'bar', 'baz']
  }] 
}, {

}]