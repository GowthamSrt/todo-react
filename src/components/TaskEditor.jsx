import React, { useState } from 'react';
import './TaskEditor.css';

const TaskEditor = ({ onClose, onSave }) => {
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [dueDateError, setDueDateError] = useState('');

    const handleSave = () => {
        let valid = true;
        setDescriptionError('');
        setDueDateError('');

        const trimmedDescription = description.trim();
        const selectedDate = new Date(dueDate);
        const today = new Date();
        const maxDate = new Date();
        maxDate.setDate(today.getDate() + 15);

        if (trimmedDescription.length < 5 || trimmedDescription.length > 120) {
            setDescriptionError('Must be between 5 and 120 characters.');
            valid = false;
        }

        if (!dueDate) {
            setDueDateError('Please select a due date.');
            valid = false;
        } else if (
            selectedDate < new Date(today.setHours(0, 0, 0, 0)) ||
            selectedDate > new Date(maxDate.setHours(23, 59, 59, 999))
        ) {
            setDueDateError('Due date must be within today and the next 15 days.');
            valid = false;
        }

        if (!valid) return;

        const task = { description: trimmedDescription, dueDate };
        onSave(task);


        alert('Task saved: ' + description);
        setDescription('');
        setDueDate('');
        onClose();
    };

    const formatDate = (date) => date.toISOString().split('T')[0];
    const todayDate = formatDate(new Date());
    const maxAllowedDate = formatDate(new Date(Date.now() + 15 * 24 * 60 * 60 * 1000));

    return (
        <div className="task-editor">
            <div className="form-group">
                <div className="task-title">
                    <label>Task:</label>
                    <label className="cursor-pointer" onClick={onClose}>x</label>
                </div>
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                        if (descriptionError) setDescriptionError('');
                    }}
                />
                {descriptionError && <div className="error-message">{descriptionError}</div>}
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
                <input
                    type="date"
                    value={dueDate}
                    min={todayDate}
                    max={maxAllowedDate}
                    onChange={(e) => {
                        setDueDate(e.target.value);
                        if (dueDateError) setDueDateError('');
                    }}
                />
                {dueDateError && <div className="error-message">{dueDateError}</div>}
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
                <button className="delete" onClick={onClose}>Delete</button>
                <button className="save" onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default TaskEditor;
