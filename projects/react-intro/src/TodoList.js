import React, { Component } from 'react';
import Todo from './Todo';

class TodoList extends Component {
  render() {
    // now we are using objects with a tad more data
    const todos = [
      { id: 1, text: 'Do this', complete: false },
      { id: 2, text: 'Do that', complete: true },
      { id: 3, text: 'Do other things', complete: false }
    ];
    // implicit return...
    // and the spread operator, which is kind of like destructuring!
    // the {...} todo means it will individually pass each property
    // without us having to specify key=value pairs.
    const elems = todos.map((todo, i) => { return <Todo key={i} {...todo} /> });
    // JSX will unpack arrays of nodes automatically.
    
    console.log('todos', todos);
    console.log('elems', elems);
    return (
      <div>
        <h3>Todos</h3>
        <ul>
          { elems }
        </ul>
      </div>
    );
  }
}

// if you don't export it, you can't use it
export default TodoList;
