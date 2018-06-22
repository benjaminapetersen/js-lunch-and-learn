import React, {Component} from 'react';

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = { // only directly set state in constructor
      todo: {
        text: "",
        complete: false,
      }
    }
    this.handleChange = this.handleChange.bind(this);
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
  render() {
    const {text, complete} = this.state.todo; // destructuring 

    return (
      <div className="todo__new form-group input-group input-group-lg">
        <input value={text} 
          type="text" 
          onChange={this.handleChange} 
          placeholder="New todo" 
          className="todo__item--new form-control"></input>
        <span className="input-group-btn">
          <button className="btn btn-primary"><i className="fa fa-plus"></i>
          </button></span>
      </div>
    );
  }
}

export default TodoForm;