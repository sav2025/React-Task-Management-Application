
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskCard from './TaskCard';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;
