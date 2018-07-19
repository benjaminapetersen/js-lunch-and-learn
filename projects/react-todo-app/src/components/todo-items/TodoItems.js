import React from 'react';
import TodoItem from '../todo-item/TodoItem';

const TodoItems = props => {
  
  const items = props.items.map((item, i) => <TodoItem item={item} key={item.id || i} />);
  
  return <ol className="list-group todo__list no-bullet">
    {items}
  </ol>;
};

export default TodoItems;