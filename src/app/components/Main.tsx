'use client';
import React, { useState } from 'react';
import '../globals.css';

const Main = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <main
      className={`main position-relative p-3 ${darkMode ? 'bg-black text-white' : 'bg-light text-dark'}`}
      style={{ minHeight: '80vh' }}
    >
      {/* Dark/Light mode button */}
      <button
        onClick={toggleTheme}
        className="btn btn-secondary position-absolute"
        style={{ top: '10px', right: '10px' }}
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      {/* Main content */}
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
        main_content
      </div>
    </main>
  );
};

export default Main;
