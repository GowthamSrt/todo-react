import React from 'react';
import './TaskView.css';

const TaskView = ({ viewType, onAddTask }) => {
    const tasks = [
        'Research content ideas lorem ipsum dolor sit amet',
        'Create a database of guest authors',
        'Write a blog post'
    ];

    const getHeading = () => {
        if (viewType === 'calendar') {
            return new Date().toDateString();
        }
        return viewType.charAt(0).toUpperCase() + viewType.slice(1);
    };

    return (
        <div className="task-view">
          <div className="task-view-header">
            <h2>{getHeading()}</h2>
            {viewType !== 'calendar' && <div className="task-count">5</div>}
          </div>
          <div className="add-task" onClick={onAddTask}>＋ Add New Task</div>
          <ul className="task-list">
            {tasks.map((task, idx) => (
              <li key={idx} className="task-item">
                <input type="checkbox" />
                <span>{task}</span>
                <span className="arrow">›</span>
              </li>
            ))}
          </ul>
        </div>
      );
    };


export default TaskView;
