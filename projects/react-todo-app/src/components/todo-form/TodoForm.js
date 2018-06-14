import React, {Component} from 'react';

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange() {
    console.log("I changed");
  }
  render() {
    const inputValue = "";
    return (
      <div className="todo__new form-group input-group input-group-lg">
        <input value="{text}" type={inputValue} onChange={this.handleChange} placeholder="New todo" className="todo__item--new form-control"></input>
        <span className="input-group-btn">
          <button className="btn btn-primary"><i className="fa fa-plus"></i>
          </button></span>
      </div>
    );
  }
}

export default TodoForm;