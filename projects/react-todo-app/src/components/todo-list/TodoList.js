import React, { Component } from 'react';

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

        <ol className="list-group todo__list no-bullet">
          <li className="todo__item">
            <div className="input-group input-group-lg">
              <input className="todo__item--important todo__item__toggle form-control" value="Eat bananas" />
              <span className="input-group-btn">
                <button className="todo__item__star--active btn btn-default"><i className="fa fa-star"></i></button>
                <button className="todo__item__remove btn btn-default"><i className="fa fa-times"></i></button>
              </span>
            </div>
          </li>
          <li className="todo__item">
            <div className="input-group input-group-lg">
              <input type="text" className="todo__item__toggle form-control" value="Make todo list" />
              <span className="input-group-btn">
                <button className="todo__item__star btn btn-default"><i className="fa fa-star"></i></button>
                <button className="todo__item__remove btn btn-default" type="button"><i className="fa fa-times"></i></button>
              </span>
            </div>
          </li>
          <li className="todo__item">
            <div className="input-group input-group-lg">
              <input className="todo__item__toggle todo__item__toggle--completed form-control" value="Climb Mt. Everest" />
              <span className="input-group-btn">
                <button className="todo__item__star btn btn-default"><i className="fa fa-star"></i></button>
                <button className="todo__item__remove btn btn-default"><i className="fa fa-times"></i></button>
              </span>
            </div>
          </li>
        </ol>
      </section>
    )
  }
}

export default TodoList;