// App.js
import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  console.log('Tasks loaded from local storage:', storedTasks);
  setTasks((prevTasks) => {
    
    if (prevTasks.length === 0) {
      return storedTasks;
    }
    return prevTasks;
  });
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log('Tasks saved to local storage:', tasks);
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const markAsCompleted = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const moveTask = (startIndex, endIndex) => {
    const updatedTasks = Array.from(tasks);
    const [removedTask] = updatedTasks.splice(startIndex, 1);
    updatedTasks.splice(endIndex, 0, removedTask);
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>React Task Tracker</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        onDeleteTask={deleteTask}
        onMarkAsCompleted={markAsCompleted}
        onMoveTask={moveTask}
      />
    </div>
  );
};

export default App;
