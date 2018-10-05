import React, {Component} from 'react';
import axios from 'axios';

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      todo: {
        text: ''
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
    });
    console.log("I changed", event.target.value, this.state.todo);
  }
  handleSubmit(event) {
    const {config} = this.props;
    const {todo} = this.state;
    todo.created = Date.now();
    event.preventDefault();
    axios
      .post(`${config.jsonServer.url}/todos`, todo)
      .then((resp) => {
            this.props.loadTodos();
            this.setState({ 
              todo: { text: '' }
            });
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