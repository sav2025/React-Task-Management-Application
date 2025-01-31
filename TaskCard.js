TaskCard.js 
javascript
CopyEdit
import React from 'react';
import { Link } from 'react-router-dom';

const TaskCard = ({ task }) => {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <Link to={`/task/${task._id}`}>View Details</Link>
    </div>
  );
}

export default TaskCard;
