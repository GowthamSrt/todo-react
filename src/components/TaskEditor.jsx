import React from 'react';
import './TaskEditor.css';

const TaskEditor = ({onClose}) => {
    return (
        <div className="task-editor">
          <div className="form-group">
            <div className="task-title">
              <label>Task:</label>
              <label className='cursor-pointer' onClick={onClose}>x</label>
            </div>
            <textarea placeholder="Description" minLength={3} maxLength={120}></textarea>
          </div>
    
          <div className="form-inline">
            <label>List</label>
            <select>
              <option>Personal</option>
              <option>Work</option>
            </select>
          </div>
    
          <div className="form-inline">
            <label>Due date</label>
            <input type="date" />
          </div>
    
          <div className="form-inline">
            <label>Priority</label>
            <select>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
    
          <div className="footer-buttons">
            <button className="delete">Delete</button>
            <button className="save">Save</button>
          </div>
        </div>
      );
    };

    export default TaskEditor;