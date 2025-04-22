import React from 'react';
import './SidebarMenu.css';

const SidebarMenu = ({ onSelect, activeView, tasks }) => {

    const normalizeDate = (dateStr) => {
        const date = new Date(dateStr);
        date.setHours(0, 0, 0, 0);
        return date;
    };

    const isToday = (dateStr) => {
        const taskDate = normalizeDate(dateStr);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return taskDate.getTime() === today.getTime();
    };

    const isUpcoming = (dateStr) => {
        const taskDate = normalizeDate(dateStr);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return taskDate > today;
    };

    const isOverdue = (dateStr) => {
        const taskDate = normalizeDate(dateStr);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return taskDate < today;
    };

    const todayCount = tasks.filter(task => isToday(task.dueDate)).length;
    const upcomingCount = tasks.filter(task => isUpcoming(task.dueDate)).length;
    const overdueCount = tasks.filter(task => isOverdue(task.dueDate) && !task.completed).length;
    const completedCount = tasks.filter(task => task.completed).length;

    return (
        <div className="app-body">
            <div className="sidebar">
                <h2>Menu</h2>
                <div className="search">
                    <span role="img">🔍</span>
                    <input type="text" placeholder="Search" />
                </div>

                <div className="section-title">TASKS</div>

                <div
                    className={`menu-item ${activeView === 'upcoming' ? 'active' : ''}`}
                    onClick={() => onSelect('upcoming')}
                >
                    <div className="menu-label">» <span>Upcoming</span></div>
                    <div className="badge">{upcomingCount}</div>
                </div>

                <div
                    className={`menu-item ${activeView === 'today' ? 'active' : ''}`}
                    onClick={() => onSelect('today')}
                >
                    <div className="menu-label">» <span>Today</span></div>
                    <div className="badge">{todayCount}</div>
                </div>

                <div
                    className={`menu-item ${activeView === 'overdue' ? 'active' : ''}`}
                    onClick={() => onSelect('overdue')}
                >
                    <div className="menu-label">» <span>Overdue</span></div>
                    <div className="badge">{overdueCount}</div>
                </div>

                <div
                    className={`menu-item ${activeView === 'completed' ? 'active' : ''}`}
                    onClick={() => onSelect('completed')}
                >
                    <div className="menu-label">» <span>Completed</span></div>
                    <div className="badge">{completedCount}</div>
                </div>
            </div>
        </div>
    );
};

export default SidebarMenu;
