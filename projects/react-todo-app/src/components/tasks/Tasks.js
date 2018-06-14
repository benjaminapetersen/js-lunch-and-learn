import React from 'react';

const tasks = props => {
  const taskItems = props.items.map((item, i) => <li key={i}>{item}</li>);
  return <aside>
    <h2>{props.title || 'Tasks'}</h2>
    <ol>
      {taskItems}
    </ol>
  </aside>;
  };

export default tasks;