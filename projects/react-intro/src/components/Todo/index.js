import React, { Component } from 'react';

import './index.css';

// we can also inline the export:
export default class Todo extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    event.preventDefault();
    const {onToggleTodo} = this.props;
    onToggleTodo(this.props.id);
  }
  render() {
    // lets use destructuring to get our individual properties!
    const { 
      id, 
      text, 
      complete,
      onToggleTodo 
    } = this.props;
    
    return (
      <li
        className={ 'todo ' + (complete ? 'complete' : '') }
        id={`todo-${id}`}>
        {text} 
        <input 
          id={`todo-check-${id}`} 
          name="checked"
          type="checkbox" 
          checked={complete}
          onChange={this.handleChange}
          />
      </li>
    );
  }
}