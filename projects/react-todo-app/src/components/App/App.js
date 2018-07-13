import React, { Component } from 'react';
import './App.css';
import TodoList from '../todo-list/TodoList';
import Tasks from '../tasks/Tasks';
import Axios from '../../../node_modules/axios'

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
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    }
  }

  componentDidMount() {
    Axios
      .get('config.json')
      .then(configResp => configResp.data)
      .then(config => {
        console.log('firebase?', config.firebase);
        Axios
          .get(`${config.firebase.url}/todoItems.json`)
          .then(firebaseResp => {
            console.log('firebase?', firebaseResp.data);
            this.setState({
              todos: firebaseResp.data
            })
          });
      });
  }

  render() {
    const {todos} = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-8">
            <TodoList items={todos} title="Todo List" />
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
