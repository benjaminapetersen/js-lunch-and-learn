import React, { Component } from 'react';
import axios from 'axios';

// Things todo:
// - clean up App functionality to build list
//   - we have built some of this.  
// - deduplication of axios!
//   - we should refactor our code to eliminate all the duplication 
//     of axios methods.  Remember, axios.put,axios.delete are all 
//     alias functions for using axios({method: ''}).  We can use
//     either the generic axios() function, or we can use array 
//     syntax axios['method']() to accoplish our refactor.  A method 
//     like request() {}  would be good to add to our todo items
// - deduplication of url building!
//   - we make our url over and over:
//     `${config.jsonServer.url}/todos/${todo.id}`
//     even in other components.
//     how can we ensure the details of url building are done in 
//     one place in our app?  Perhaps we want src/utils/ in our source
//     code, and we want to define a urls.js file that can hold 
//     the specifics of url building?
// - filter button counts.
//   - at this point, we do have completed/not completed. 
//     we should update the counts next to these buttons.
// - filter buttons
//   - only completed
//   - only incomplete
//   - all (no button currently, but gotta be able to reset!)
// - clear completed button
//   - this button can 'delete' all the completed todos 
// - clear all
//   - this button can 'delete' all of our todos
// - undo!
//   - oops, deleted all... should it REALLY delete all? dang.
// - error handling
//   - what if something happens and our UI shows a todo that no 
//     longer exists.  clicking ANY button will 404 error, but we 
//     are not showing the user errors.  We should.
// - sorting?
//   - should we be able to reorder todos based on importance?
// - create additional lists
//   - now that our lists function well, what if we want to organize
//     items into multiple lists? 
class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.url = `${this.props.config.jsonServer.url}/todos/${this.props.item.id}`
    this.handleComplete = this.handleComplete.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleTextUpdate = this.handleTextUpdate.bind(this);
  }
  request(method, data) {
    axios({
      method: method,
      url: this.url,
      data: data
    })
    .then(() => {
      this.props.loadTodos();
    }, () => {
      // error?
    });
  }
  handleComplete(e) {
    let {config} = this.props;
    var todo = {...this.props.item};
    todo.complete = !todo.complete;
    this.request('put', todo);
  }
  handleFavorite(e) {
    let {config} = this.props;
    const todo = {...this.props.item};
    todo.starred = !todo.starred;
    this.request('put', todo);
  }
  handleDelete(e) {
    this.request('delete');
  }
  // TODO: handle debouced key up instead of blur but this is a good quick win.
  handleTextUpdate(e) {
    const todo = {...this.props.item}
    todo.text = e.target.value;
    this.request('put', todo);
  }
  render() {
    const {item} = this.props;
    return (
      <li className="todo__item">
        <div className="input-group input-group-lg">
          <span className="input-group-btn">
            <button 
              onClick={this.handleComplete}
              className={`todo__item__complete btn btn-default ${item.complete && 'todo__item__complete--active'}`}>
              <i className={`fa ${item.complete ? 'fa-check-square' : 'fa-check'}`}></i>
            </button>
          </span>
          <input 
            type="text" 
            onBlur={this.handleTextUpdate}
            className={`todo__item__toggle form-control ${item.complete && 'todo__item__toggle--completed'}`} 
            defaultValue={item.text} />
          <span className="input-group-btn">
            <button 
              onClick={this.handleFavorite}
              className={`todo__item__star btn btn-default ${item.starred && 'todo__item__star--active'}`}>
              <i className="fa fa-star"></i>
            </button>
            <button 
              onClick={this.handleDelete}
              className="todo__item__remove btn btn-default">
              <i className="fa fa-times"></i>
            </button>
          </span>
        </div>
      </li>
    );
  }
}


export default TodoItem;


