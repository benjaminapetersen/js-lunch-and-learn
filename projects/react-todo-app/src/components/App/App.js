import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import TodoList from '../todo-list/TodoList';
import Tasks from '../tasks/Tasks';

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
    this.requestToken = axios.CancelToken.source().token;
    axios
      .get('config.json', {
        cancelToken: this.requestToken
      })
      .then(configResp => configResp.data)
      .then(config => {
        console.log('config:', config);
        axios
          .get(`${config.firebase.url}/todoItems.json`, {
            cancelToken: this.requestToken
          })
          .then(firebaseResp => {
            console.log('items:', firebaseResp.data);
            this.setState({
              todos: firebaseResp.data
            });
          });
        axios
          .get(`${config.firebase.url}/todoLists.json`, {
            cancelToken: this.requestToken
          })
          .then(firebaseResp => {
            console.log('lists:', firebaseResp.data);
            // I want to sort my items into lists
          });
      });
  }
  componentWillUnmount() {
    this.requestToken.cancel('App destroyed, cancelling requests.');
  }
  render() {
    const { todos } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-8">
            <TodoList items={todos} title="Todo List" />
          </div>
          <div className="col-sm-4">
            <Tasks items={tasks} title="App functionality to build" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;