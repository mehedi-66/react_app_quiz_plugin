// NoteState.js
import React, { useState } from "react";
import NoteContext from "./noteContext"; 

const NoteState = (props) => {
  const [startQuiz, setStartQuiz] = useState(0);
  const [quizId, setQuizId] = useState(0);

  return (
    <NoteContext.Provider value={{ startQuiz, setStartQuiz, quizId, setQuizId }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
