import React, { Component } from 'react';
import axios from 'axios';

// TODO: defaultValue means the text will not update later when 
// we implement the ability to edit todo items.  We will need 
// to revisit this.
class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleTextUpdate = this.handleTextUpdate.bind(this);
  }
  handleComplete(e) {
    console.log(`clicked: ${this.props.item.text} is complete? ${this.props.item.complete}`);
    let {config} = this.props;
    var todo = {...this.props.item};

    console.log('CONFIG? ', this.props);

    todo.complete = !todo.complete;
    axios
      .put(`${config.jsonServer.url}/todos/${todo.id}`, todo)
      .then(() => {
      this.props.loadTodos();
    })
  }
  handleFavorite(e) {
    // e.target.value 
    console.log(`clicked: ${this.props.item.text} is starred?  ${this.props.item.starred}`);
    var todo = this.props.item;
    todo.favorite = true;
  }
  handleDelete(e) {
    // e.target.value 
    console.log(`clicked: ${this.props.item.text} is deleted? need a prop?`);
    var todo = this.props.item;
    todo.deleted = true;
  }
  handleTextUpdate(e) {
    // e.target.value 
    console.log(`typed: ${this.props.item.text}, can update?`);
  }
  render() {
    const {item} = this.props;
    return (
      <li className="todo__item">
        <div className="input-group input-group-lg">
          <span className="input-group-btn">
            <button 
              onClick={this.handleComplete}
              className={`todo__item__complete btn btn-default ${item.complete && 'todo__item__complete--active'}`}>
              <i className={`fa ${item.complete ? 'fa-check-square' : 'fa-check'}`}></i>
            </button>
          </span>
          <input 
            type="text" 
            onChange={this.handleTextUpdate}
            className={`todo__item__toggle form-control ${item.complete && 'todo__item__toggle--completed'}`} 
            defaultValue={item.text} />
          <span className="input-group-btn">
            <button 
              onClick={this.handleFavorite}
              className={`todo__item__star btn btn-default ${item.starred && 'todo__item__star--active'}`}>
              <i className="fa fa-star"></i>
            </button>
            <button 
              onClick={this.handleDelete}
              className="todo__item__remove btn btn-default">
              <i className="fa fa-times"></i>
            </button>
          </span>
        </div>
      </li>
    );
  }
}


export default TodoItem;


