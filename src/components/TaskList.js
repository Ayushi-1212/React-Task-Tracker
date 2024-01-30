// components/TaskList.js
import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../ItemTypes';

const Task = ({ task, index, onDeleteTask, onMarkAsCompleted, onMoveTask }) => {
  const [, drag] = useDrag({
    type: ItemTypes.TASK,
    item: { id: task.id, index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        onMoveTask(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <li ref={(node) => drag(drop(node))} key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
      {/* Render task details here */}
 <span className="task-name">{task.name}</span>
            <span className="task-date">{task.dateAdded}</span>
            <span className="task-actions">
              <button
                className={`task-action-btn ${task.completed ? 'undo' : 'complete'}`}
                onClick={() => onMarkAsCompleted(task.id)}
              >
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button
                className="task-action-btn delete"
                onClick={() => onDeleteTask(task.id)}
              >
                Delete
              </button>
            </span>
    </li>
  );
};

const TaskList = ({ tasks, onDeleteTask, onMarkAsCompleted, onMoveTask }) => {
  
const [filter, setFilter] = useState('all');

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'completed') {
      return task.completed;
    } else if (filter === 'incomplete') {
      return !task.completed;
    }
    return false;
  });


  return (
    <div className="task-list-container">
      {/* ... (your existing code) */}
<label className="filter-label">
        Filter:
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </label>
      <ul className="task-list">
        {filteredTasks.map((task, index) => (
          <Task
            key={task.id}
            task={task}
            index={index}
            onDeleteTask={onDeleteTask}
            onMarkAsCompleted={onMarkAsCompleted}
            onMoveTask={onMoveTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;