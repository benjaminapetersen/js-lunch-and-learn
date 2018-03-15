import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//   import TodoList from './TodoList';
import Foo from './Foo';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Hello World.
        </p>
        
        <Foo />
    
      </div>
    );
  }
}

export default App;

