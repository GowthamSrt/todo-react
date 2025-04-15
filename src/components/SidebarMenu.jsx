import React from 'react';
import './SidebarMenu.css';

const SidebarMenu = () => {
    return (
        <div className="app-body">
            <div className="sidebar">
                <h2>Menu</h2>
                <div className="search">
                    <span role="img" aria-label="search">🔍</span>
                    <input type="text" placeholder="Search" />
                </div>

                <div className="section-title">TASKS</div>

                <div className="menu-item">
                    <div className="menu-label">» <span>Upcoming</span></div>
                    <div className="badge">1</div>
                </div>

                <div className="menu-item active">
                    <div className="menu-label">» <span>Today</span></div>
                    <div className="badge">1</div>
                </div>

                <div className="menu-item">
                    <div className="menu-label">📅 <span>Calendar</span></div>
                </div>
            </div>
        </div>
    );
};

export default SidebarMenu;