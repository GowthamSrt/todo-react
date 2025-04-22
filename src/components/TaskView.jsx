import React, { useState } from 'react';
import './TaskView.css';
import Header from './Header';

const isToday = (dateStr) => {
    const taskDate = new Date(dateStr);
    const today = new Date();
    return taskDate.toDateString() === today.toDateString();
};

const isUpcoming = (dateStr) => {
    const taskDate = new Date(dateStr);
    const today = new Date();
    return taskDate > today;
};

const isOverdue = (dateStr) => {
    const taskDate = new Date(dateStr);
    const today = new Date();
    taskDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return taskDate < today;
};

const groupByDate = (tasks) => {
    const groups = {};
    tasks.forEach(task => {
        const date = new Date(task.dueDate).toDateString();
        if (!groups[date]) groups[date] = [];
        groups[date].push(task);
    });
    return groups;
};

const TaskView = ({ viewType, onAddTask, tasks }) => {
    const [filter, setFilter] = useState('active');

    let filteredTasks = [];

    if (viewType === 'today') {
        filteredTasks = tasks.filter(task => isToday(task.dueDate));
    } else if (viewType === 'upcoming') {
        filteredTasks = tasks.filter(task => isUpcoming(task.dueDate));
    } else if (viewType === 'overdue') {
        filteredTasks = tasks.filter(task => isOverdue(task.dueDate) && !task.completed);
    } else if (viewType === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else {
        filteredTasks = tasks;
    }

    const visibleTasks = filter === 'completed'
        ? filteredTasks.filter(task => task.completed)
        : filteredTasks.filter(task => !task.completed);

    const groupedTasks = viewType === 'upcoming' ? groupByDate(visibleTasks) : null;

    const getHeading = () => {
        if (viewType === 'calendar') return new Date().toDateString();
        return viewType.charAt(0).toUpperCase() + viewType.slice(1);
    };

    const getEmptyMessage = () => {
        if (filter === 'completed') return 'No completed tasks.';
        if (viewType === 'overdue') return 'No tasks overdue.';
        return 'No active tasks.';
    };

    return (
        <div className="task-view">
            <div className="task-view-header">
                <Header />
                <div className="task-date">
                    <h2>{getHeading()}</h2>
                    {viewType === 'today' && <div className="task-count">{filteredTasks.length}</div>}
                </div>
            </div>

            <div className="task-view-buttons">
                <div className="add-task" onClick={onAddTask}>＋ Add New Task</div>
                <div
                    className={`task-button ${filter === 'active' ? 'selected' : ''}`}
                    onClick={() => setFilter('active')}
                >
                    ACTIVE
                </div>
                <div
                    className={`task-button ${filter === 'completed' ? 'selected' : ''}`}
                    onClick={() => setFilter('completed')}
                >
                    COMPLETED
                </div>
            </div>

            {filteredTasks.length === 0 ? (
                <p className="no-task">{getEmptyMessage}</p>
            ) : (
                viewType === 'upcoming' ? (
                    Object.entries(groupedTasks)
                        .sort(([a], [b]) => new Date(a) - new Date(b))
                        .map(([date, tasksOnDate]) => (
                            <div key={date}>
                                <h3 className="date-heading">{date}</h3>
                                <ul className="task-list">
                                    {tasksOnDate.map((task, idx) => (
                                        <li key={idx} className="task-item">
                                            <div className="task-name">
                                                <input type="checkbox" />
                                                <span>{task.description}</span>
                                            </div>
                                            <span className="arrow">›</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                ) : (
                    <ul className="task-list">
                        {filteredTasks.map((task, idx) => (
                            <li key={idx} className="task-item">
                                <div className="task-name">
                                    <input type="checkbox" />
                                    <span>{task.description}</span>
                                </div>
                                <span className="arrow">›</span>
                            </li>
                        ))}
                    </ul>
                )
            )}
        </div>
    );
};

export default TaskView;