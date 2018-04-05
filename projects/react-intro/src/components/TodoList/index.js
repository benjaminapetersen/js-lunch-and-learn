import React, { Component } from 'react';
import Todo from '../Todo/index.js';

// import './index.css';

class TodoList extends Component {
  render() {
    const todos = [
      { id: 1, text: 'Do this', complete: false },
      { id: 2, text: 'Do that', complete: true },
      { id: 3, text: 'Do other things', complete: false }
    ];

    const elems = todos.map((todo, i) => {
      return <Todo key={i} {...todo} />
    });

    return (
      <div className="todo-panel">
        <h3>Todos</h3>
        <ul className="todo-list">
          { elems }
        </ul>
      </div>
    );
  }
}

// if you don't export it, you can't use it
export default TodoList;
