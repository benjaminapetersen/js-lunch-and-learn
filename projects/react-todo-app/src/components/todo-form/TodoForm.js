import React, {Component} from 'react';
import axios from 'axios';

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = { // only directly set state in constructor
      todo: {
        text: '',
        complete: false,
        starred: false,
        deleted: false,
        description: '',
        // lists?
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ // let react update state for us
      todo: {
        ...this.state.todo, // spread operator
        text: event.target.value // get/set input value
      }
    })
    console.log("I changed", event.target.value, this.state.todo);
  }
  handleSubmit(event) {
    const {config} = this.props;
    const {todo} = this.state;
    event.preventDefault();
    axios
      // POST means send new data to the server
      .post(`${config.jsonServer.url}/todos`, todo)
      // THEN... what?
      .then((resp) => {
        // TODO: what to do next?
        // 1. clear out the input since we saved it.
        // 2. somehow relist the todos in the todo list
        console.log('Well, did it work?', resp);
      }, (err) => {
        console.log('Yikes! nope', err);
      });
    return null;
  }
  render() {
    const {text, complete} = this.state.todo; // destructuring 
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="todo__new form-group input-group input-group-lg">
          <input value={text} 
            type="text" 
            onChange={this.handleChange} 
            placeholder="New todo" 
            className="todo__item--new form-control"></input>
          <span className="input-group-btn">
            <button
              type="button"
              value="submit"
              className="btn btn-primary"
              onClick={this.handleSubmit}>
              <i className="fa fa-plus"></i>
            </button>
          </span>
        </div>
      </form>
    );
  }
}

export default TodoForm;