import React, { useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(0);

  const handleChange = (event) => {
    setTask(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
      setTask('');
    }
  };

  const toggleTask = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    updateCompletedTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    updateCompletedTasks(updatedTasks);
  };

  const updateCompletedTasks = (updatedTasks) => {
    const completedCount = updatedTasks.filter(task => task.completed).length;
    setCompletedTasks(completedCount);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter task..."
          value={task}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="tasks-list">
        {tasks.map(task => (
          <div key={task.id} className="task-item">
            <span
              className={task.completed ? 'task-text completed' : 'task-text'}
              onClick={() => toggleTask(task.id)}
            >
              {task.text}
            </span>
            <button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
            <button className="done-button" onClick={() => toggleTask(task.id)}>Done</button>
          </div>
        ))}
      </div>
      <p>Completed tasks: {completedTasks}</p>
    </div>
  );
}

export default App;
