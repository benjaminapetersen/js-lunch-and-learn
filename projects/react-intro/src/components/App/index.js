import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.css';

import TodoList from '../TodoList';
import TodoForm from '../TodoForm';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        isLoaded: false,
        error: null,
        todos: []
      };
      this.newTodo = this.newTodo.bind(this);
      this.toggleTodo = this.toggleTodo.bind(this);
  }

  componentDidMount() {
    // fetch is a future browser standard
    // for making http requests
    fetch('_mock_/todos.json')
      // time passes....
      .then((response) => {
        return response.json();
      })
      // time passes...
      .then((result) => {
        this.setState({
          isLoaded: true,
          todos: result
        });
      })
      .catch((err) => {
        this.setState({
          isLoaded: true,
          error: err
        });
      });
  }

  newTodo(todo) {
    console.log(`new todo: ${todo.text}`);
    this.setState({
      todos: [...this.state.todos, todo]
    });
  }

  toggleTodo(id) {
    // copy of old todos
    let newTodos = [...this.state.todos];
    newTodos.find((todo, i) => {
      if(todo.id === id) {
        todo.complete = !todo.complete;
        return true;
      }
    });
    this.setState({
      todos: newTodos
    });
  }  
  
  render() {
    const {isLoaded, todos, error} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Hello World.
        </p>
        { isLoaded ? (
           <div className="todo-panel">
             <TodoList
               title="Things to do"
               todos={ todos }
               onToggleTodo={this.toggleTodo} />
             <TodoForm
              onNewTodo={this.newTodo} />
           </div>
        ) : (
          <div>Loading....</div>
        )}

        { error && <div>{error.message}</div> }
      </div>
    );
  }
}

export default App;
