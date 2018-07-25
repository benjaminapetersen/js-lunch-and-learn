import React, { Component } from 'react';
import TodoItems from '../todo-items/TodoItems';
import Toolbar from '../toolbar/Toolbar';
import TodoForm from '../todo-form/TodoForm';

class TodoList extends Component {
  render() {
    const {config,items,title} = this.props;
    return (
      <section className="todos">
        <h1>{title || "Default Title"}</h1>
        <TodoForm config={config} />
        <Toolbar />
        <TodoItems items={items} />
      </section>
    );
  };
};

export default TodoList;