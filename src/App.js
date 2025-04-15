import React, { useState } from 'react';
import SidebarMenu from './components/SidebarMenu';
import TaskEditor from './components/TaskEditor';
import TaskView from './components/TaskView';
import './App.css';

function App() {
  const [view, setView] = useState('today');
  const [showEditor, setShowEditor] = useState(false);

  const handleAddTask = () => {
    setShowEditor(true);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
  };

  return (
    <div className="app-container">
      <SidebarMenu onSelect={setView} />
      <div className="content-area">
        <TaskView viewType={view} onAddTask={handleAddTask} />
        {showEditor && <TaskEditor onClose={handleCloseEditor} />}
      </div>
    </div>
  );
}

export default App;
