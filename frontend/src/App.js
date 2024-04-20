import React from 'react';
import './App.css';
import Body from './components/Body';
import { Toaster } from 'react-hot-toast';
import { FiSun } from "react-icons/fi";
import { FaMoon } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.darkMode);

  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  return (
    <div className={`m-0 p-0 box-border ${darkMode ? 'dark' : ''}`}>
      {/* Dark mode toggle button */}
      <button
        className={`fixed bottom-4 left-4 text-white px-3 py-1 rounded-md flex items-center ${darkMode ? 'dark' : ''}`}
        onClick={toggleDarkMode}
      >
        {darkMode ? <FiSun /> : <FaMoon color='black' />}
      </button>

      <Body />
      <Toaster />
    </div>
  );
}

export default App;
