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
        this.setState({ config });
        axios
          .get(`${config.firebase.url}/todoItems.json`, {
            cancelToken: this.requestToken
          })
          .then(firebaseResp => {
            const {todos} = firebaseResp.data;            
            console.log('items:', firebaseResp.data);
            // TODO: we need to convert these items 
            // to an array so that we can list them 
            // again...
            this.setState({
              todos: firebaseResp.data
            });
          });
        // axios
        //   .get(`${config.firebase.url}/todoLists.json`, {
        //     cancelToken: this.requestToken
        //   })
        //   .then(firebaseResp => {
        //     console.log('lists:', firebaseResp.data);
        //     // I want to sort my items into lists
        //   });
        
        // dummy stuff to play around with axios and firebase
        // --------------------------------------------------
        // GET: by id 
        // nope, this doesn't work, need to tweak
        // the get-by-id bit.  firebase stores items as an object, 
        // not an array.  DATA UPDATE?
        // axios 
        //   .get(`${config.firebase.url}/todoItems/1`, {
        //     cancelToken: this.requestToken
        //   })
        //   .then(resp => {
        //     console.log('resp? /todoItems/1', resp.data);
        //   });
        // 
        // POST: create a new 
        // this works fine, NOTE that the id is a random hash 
        // axios
        //   .post(`${config.firebase.url}/todoItems.json`, {
        //     text: 'Posted this sucker with AXIOS',
        //     complete: true,
        //     deleted: false, 
        //     description: 'This is how we save things',
        //     starred: false,
        //     lists: [0]
        //   }, {
        //     cancelToken: this.requestToken
        //   })
        //   .then(firebaseResp => {
        //     console.log('items:', firebaseResp.data);
        //   });
        // 
        // PUT: post the whole updated object
        // PATCH: just post changes
        // DELETE: should just be the id 

      });

      
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