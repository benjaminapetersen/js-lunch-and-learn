import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <h1 className="h3">React Todo App</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-8">       
            <div className="well">
              <h2 className="h4">List 1</h2>
              <form>
                <ol>
                  <li> 
                    <input type="checkbox" /> First thing to do 
                    &nbsp;
                    <span className="label label-default">
                      Tag 1
                    </span>
                    &nbsp;
                    <span className="label label-primary">
                      Tag 2
                    </span>
                    &nbsp;
                    <span className="label label-danger">
                      Tag 3
                    </span>
                    <span className="pull-right text-danger">
                      09/12/13
                    </span>
                  </li>
                  <li>
                    <input type="checkbox" /> Second thing to do
                  </li>
                  <li>
                    <input type="checkbox" /> Third thing to do
                    </li>
                </ol>
              </form>
            </div>
          </div>
          <div className="col-sm-4">
            Filter column...
          </div>
        </div>
      </div>
      
    );
  }
}

export default App;
