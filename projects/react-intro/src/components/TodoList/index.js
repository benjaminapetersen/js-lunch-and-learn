import React, { Component } from 'react';
import Todo from '../Todo/index.js';
import './index.css';

class TodoList extends Component {
  render() {
    const { todos, title } = this.props;

    const elems = todos.map((todo, i) => {
      return <Todo key={i} {...todo}  />
    });

    return (
      <div className="todo-panel">
        <h3>{title || 'Todos'}</h3>
        <ul className="todo-list">
          { elems }
        </ul>
      </div>
    );
  }
}

// if you don't export it, you can't use it
export default TodoList;
