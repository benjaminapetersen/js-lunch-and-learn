import React, { Component } from 'react';
import './App.css';
import TodoList from '../todo-list/TodoList';
import Tasks from '../tasks/Tasks';

const mockTodoItems = [
  {
    text: 'Eat bananas',
    starred: true,
    complete: false,
  },
  {
    text: 'Make todo list',
    starred: false,
    complete: false,
  },
  {
    text: 'Climb Mt. Everest',
    starred: false,
    complete: true,
  },
];

const tasks = [
  'Add item',
  'Remove item',
  'Toggle item completed (green && strikethrough)',
  'Toggle item not completed',
  'Toggle star and list those items first (blue star)',
  'Track # of items not completed',
  'Track # of items completed',
  'View only not completed items',
  'View only completed items',
  'Clear completed items',
  'Clear all items',
];

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-8">
            <TodoList items={mockTodoItems} />
          </div>
          <div className="col-sm-4">
            <Tasks items={tasks} title="App functionality to build"/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
