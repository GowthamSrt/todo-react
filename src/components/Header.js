import React from 'react';
import './Header.css';
import logo from '../assets/todo-app.svg';

const Header = () => {
    return (
        <header className="app-header">
            <div className="logo-container">
                <img src={logo} alt="To-Do App Logo" className="logo-image" /> <br></br>
            </div>
        </header>
    );
};

export default Header;