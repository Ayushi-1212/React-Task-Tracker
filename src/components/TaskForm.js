// components/TaskForm.js
import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      const newTask = {
        id: new Date().getTime(),
        name: taskName,
        dateAdded: new Date().toLocaleString(),
        completed: false,
      };
      onAddTask(newTask);
      setTaskName('');
    }
  };

  return (
    <form onSubmit={handleAddTask}>
      <input
        type="text"
        placeholder="Add Task"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;
