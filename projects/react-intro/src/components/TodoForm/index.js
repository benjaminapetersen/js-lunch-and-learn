import React, {Component} from 'react';

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: {
        text: ''
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    console.log(`changed: ${event.target.value}`);
    this.setState({
      todo: {
        text: event.target.value
      }
    });
    // NOTE: react onSubmit() handles `enter` key
  }
  handleSubmit(event) {
    // stop page reload
    event.preventDefault();
     // pass the todo  to app
     // TODO: add complete: false...
     // AND make real checkboxes cuz rob don't like mine.
     // AND add the ID?
    this.props.onNewTodo(this.state.todo);
    // clear it to setup for the next todo
    this.setState({
      todo: {
        text: ''
      }
    });
  }
  render() {
    const {text} = this.state.todo;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input
            name="text"
            onChange={this.handleChange}
            type="text"
            value={text}
            placeholder="New todo"/>
        </label>
      </form>
    );
  }
}

export default TodoForm;
