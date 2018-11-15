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
    this.loadTodos = this.loadTodos.bind(this);
    this.filterNotComplete = this.filterNotComplete.bind(this);
   }
  loadTodos() {
    axios
    .get('config.json')
    .then(configResp => configResp.data)
    .then(config => {
      console.log('config:', config);
      this.setState({ config });
      axios
        .get(`${config.jsonServer.url}/todos`)
        .then(resp => {
          const {todos} = resp.data;            
          console.log('items:', resp.data);
          this.setState({
            todos: resp.data.reverse()
          });
        });
    });
  }
  filterNotComplete() {
    console.log("These are not complete! APP.js");
  }
  componentDidMount() {
    this.loadTodos();  
  }
  componentWillUnmount() {
    this.requestToken.cancel('App destroyed, cancelling requests.');
  }
  render() {
    const { todos, config } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-8">
            <TodoList 
              items={todos} 
              config={config}
              loadTodos={this.loadTodos} 
              filterNotComplete={this.filterNotComplete}
              title="Todo List" />
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