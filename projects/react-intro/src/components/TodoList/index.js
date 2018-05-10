import React, { Component } from 'react';
import Todo from '../Todo/index.js';
import './index.css';

class TodoList extends Component {
  render() {
    const { 
      todos, 
      title,
      onToggleTodo 
    } = this.props;

    const elems = todos.map((todo, i) => {
      return <Todo 
              key={i} 
              {...todo}  
              onToggleTodo={onToggleTodo}/>
    });

    return (
      <React.Fragment>
        <h3>{title || 'Todos'}</h3>
        <ul className="todo-list">
          { elems }
        </ul>
      </React.Fragment>
    );
  }
}

// if you don't export it, you can't use it
export default TodoList;
