import React, { Component } from 'react';

import TodoItems from '../todo-items/TodoItems';

class TodoList extends Component {
  render() {
    return (
      <section className="todos">
        <h1>Todo List</h1>

        <div className="todo__new form-group input-group input-group-lg">
          <input type="text" placeholder="New todo" className="todo__item--new form-control"></input>
          <span className="input-group-btn"><button className="btn btn-primary"><i className="fa fa-plus"></i>
            </button></span>
        </div>

        <p className="pull-left todo__amounts">
          <a className="btn todo__amount--not-completed" href="">Not completed <span className="badge">2</span></a>
          <a className="btn todo__amount--completed" href="">Completed <span className="badge bg-primary">1</span></a>
        </p>

        <div className="todo__clear form-group btn-group pull-right">
          <button className="todo__clear--completed btn btn-warning"><i className="fa fa-check"></i> Clear Completed
          </button>
          <button className="todo__clear--all btn btn-danger"><i className="fa fa-trash"></i> Clear All
          </button>
        </div>

        <TodoItems items={this.props.items}/>
      </section>
    );
  };
};

export default TodoList;