# Step 5

Lifting up state.

When several components need to respond to changes in data, in Vanilla React
it is recommended that shared state should be lifted up to the closest
common ancestor.  In our app, this will be `App.js`.  

As applications become more sophisticated, this is precisely the problem that
`Flux`, `Redux` and other patterns attempt to solve.

## Lifting State

We are ok with our form holding onto the temporary value of the new todo, however.
There really is no reason to raise this up.  We just need to pass the todo up to
the parent *when the user has decided to submit it*.  This is a good clue.  So
how do we accomplish that?

We probably need to be able to call a function provided by our parent component.‚

Lets create a function in `App.js`.

```JavaScript
// App.js
constructor() {
  // gotta bind it, since we gonna pass it around
  this.onNewTodo = this.onNewTodo.bind(this);
}

onCreateTodo(e) {
  console.log('Got a new todo!', e.target.value);
  // what to do now?
};

render() {
  return (
    // stuff...
    <TodoList
      title="Things to do"
      todos={ todos } />
      onSubmit={onNewTodo}
    <TodoForm />    
  );
}
```

Then we will need to call the function in our `TodoForm`:

```JavaScript
handleSubmit(event) {
  console.log('hello world!');
  event.preventDefault();
  // for now, lets just pass along the full event.
  // we might in the future want to unwrap this &
  // massage the data in some way, but it isn't needed
  // at this point.
  this.props.onSubmit(event);
}
```

If we are going to update the `todos []` array now, what are our options?


```html 
<TodoList
  title="Things to do"
  todos={ todos } />
<TodoForm
onNewTodo={this.onCreateTodo} />
```

We can pass the `App.js` `onCreateTodo()` function to the Todo Form. Then, 
we can update it to handle adding the todo to the list.  Remember, in 
React, we always return new data, so copy the array!

```JavaScript 
  onCreateTodo(todo) {
    console.log(`new todo: ${todo.text}`);
    this.setState({
      // spread is a great way to copy & manipulate an 
      // array in one step.
      todos: [...this.state.todos, todo]
    });
  }
```

At this point, you should see new todos in your list every time you submit the form.

