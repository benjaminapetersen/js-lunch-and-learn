import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// we need to add this:
import TodoList from './components/TodoList';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        isLoaded: false,
        error: null,
        todos: []
      };
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
           <div>
             <TodoList
               title="Things to do"
               todos={ todos } />
           </div>
        ) : (
          <div>Booo</div>
        )}
        { error
          &&
            <div>Bad: {error.message}</div>
          ||
            <div>Good: no errors</div>
        }
      </div>
    );
  }
}

export default App;
