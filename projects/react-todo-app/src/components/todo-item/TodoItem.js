import React from 'react';

const todoItems = props => {
  const items = props.items.map((item, i) => <li className="todo__item" key={i}>
      <div className="input-group input-group-lg">
        <input type="text" className={`todo__item__toggle form-control ${item.complete && 'todo__item__toggle--completed'}`} value={item.text} />
        <span className="input-group-btn">
          <button className={`todo__item__star btn btn-default ${item.starred && 'todo__item__star--active'}`}><i className="fa fa-star"></i></button>
          <button className="todo__item__remove btn btn-default"><i className="fa fa-times"></i></button>
        </span>
      </div>
    </li>
  );
  return <ol className="list-group todo__list no-bullet">
    {items}
  </ol>;
};

export default todoItems;