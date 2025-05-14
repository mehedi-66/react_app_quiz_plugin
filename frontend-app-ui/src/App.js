import logo from './logo.svg';
import './App.css';
import NoteContext from './context/noteContext'; 
import React, { useContext } from 'react';
import QuizCard from './component/QuizCard'
import Dashboard from './component/Dashboard'

function App() {

    const { note, setNote } = useContext(NoteContext);

  return (
    <div>
      <Dashboard />
    </div>
  );
}

export default App;
