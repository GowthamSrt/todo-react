import React, { useState } from 'react';
import SidebarMenu from './components/SidebarMenu';
import TaskEditor from './components/TaskEditor';
import TaskView from './components/TaskView';
import './App.css';

function App() {
  const [view, setView] = useState('today');
  const [showEditor, setShowEditor] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [calendarDate, setCalendarDate] = useState(null);


  const handleAddTask = () => {
    setShowEditor(true);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
  };

  const handleSaveTask = (task) => {
    setTasks((prev) => [...prev, task]);
    setShowEditor(false);
  };

  return (
    <div className="app-container">

      <SidebarMenu
        onSelect={(selectedView) => {
          setView(selectedView);
          if (selectedView !== 'calendar') setCalendarDate(null);
        }}
        activeView={view}
        tasks={tasks}
        onCalendarSelect={(date) => {
          setCalendarDate(date);
          setView('calendar');
        }}
      />

      <div className="content-area">
        <TaskView
          viewType={view}
          tasks={tasks}
          onAddTask={handleAddTask}
          calendarDate={calendarDate}
        />
        {showEditor && <TaskEditor onClose={handleCloseEditor} onSave={handleSaveTask} />}
      </div>
    </div>
  );
}

export default App;
