import React, { Component } from 'react';

import './index.css';

// we can also inline the export:
export default class Todo extends Component {
  render() {
    // lets use destructuring to get our individual properties!
    const { id, text, complete } = this.props;
    // a hacky checkbox
    const isDone = complete ? '[x]' : '[ ]';
    return (
      <li
        className={ 'todo ' + (complete ? 'complete' : '') }
        id={`todo-${id}`}>
        {text} {isDone}
      </li>
    );
  }
}
