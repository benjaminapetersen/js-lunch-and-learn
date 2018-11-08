import React from 'react';

const Toolbar = (props) => {
  const {items} = props;
  const completed = props.items.filter(item => item.complete);
  const notCompleted = props.items.filter(item => !item.complete);
  const completeCount = completed.length;
  const notCompleteCount = notCompleted.length;

  return (
    <React.Fragment>
      <p className="pull-left todo__amounts">
        <a className="btn todo__amount--not-completed" href="">Not completed <span className="badge">{notCompleteCount}</span></a>
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

export default Toolbar;