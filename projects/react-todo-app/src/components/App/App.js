import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.css';
import TodoList from '../todo-list/TodoList';
import Tasks from '../tasks/Tasks';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-8">
            <TodoList />
          </div>
          <div className="col-sm-4">
            <Tasks />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
