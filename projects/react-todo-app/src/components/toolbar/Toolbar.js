import React, { Component } from 'react';

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.filterNotComplete = this.filterNotComplete.bind(this);
  }
  filterNotComplete(e) {
    e.preventDefault();
    this.props.filterNotComplete();
  }
  render() {
    const {items} = this.props;
    const completed = items.filter(item => item.complete);
    const notCompleted = items.filter(item => !item.complete);
    const completeCount = completed.length;
    const notCompleteCount = notCompleted.length;
    return (
      <React.Fragment>
        <p className="pull-left todo__amounts">
          <a 
            className="btn todo__amount--not-completed" 
            href="#"
            onClick={this.filterNotComplete}>
            Not completed <span className="badge">{notCompleteCount}</span>
          </a>
          <a className="btn todo__amount--completed" href="">Completed <span className="badge bg-primary">{completeCount}</span></a>
        </p>
          
        <div className="todo__clear form-group btn-group pull-right">
          <button className="todo__clear--completed btn btn-warning"><i className="fa fa-check"></i> Clear Completed
          </button>
          <button className="todo__clear--all btn btn-danger"><i className="fa fa-trash"></i> Clear All
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Toolbar;