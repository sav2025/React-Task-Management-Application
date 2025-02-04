
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/tasks/${id}`)
      .then(response => setTask(response.data))
      .catch(error => console.log(error));

    socket.emit('joinTaskRoom', id);

    socket.on('taskUpdated', updatedTask => {
      if (updatedTask._id === id) {
        setTask(updatedTask);
      }
    });

    return () => {
      socket.emit('leaveTaskRoom', id);
    };
  }, [id]);

  const markComplete = () => {
    axios.put(`http://localhost:5000/api/tasks/${task._id}`, { completed: true })
      .then(response => socket.emit('taskUpdated', response.data))
      .catch(error => console.log(error));
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div className="task-detail">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
      <button onClick={markComplete} disabled={task.completed}>Mark as Complete</button>
    </div>
  );
}

export default TaskDetail;
