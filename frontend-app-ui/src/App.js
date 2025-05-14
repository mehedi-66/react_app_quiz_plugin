import logo from './logo.svg';
import './App.css';
import NoteContext from './context/noteContext'; 
import React, { useContext } from 'react';
import QuizCard from './component/QuizCard'
import Dashboard from './component/Dashboard'

function App() {

    const ContextUse = useContext(NoteContext);

  return (
    <div>
        {ContextUse.startQuiz === 0 && <Dashboard />}
        {ContextUse.startQuiz === 1 && <QuizCard />}
    </div>
  );
}

export default App;
