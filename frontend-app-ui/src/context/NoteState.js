// NoteState.js
import React, { useState } from "react";
import NoteContext from "./noteContext"; 

const NoteState = (props) => {
  const [startQuiz, setStartQuiz] = useState("This is the initial note");

  return (
    <NoteContext.Provider value={{ startQuiz, setStartQuiz }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
