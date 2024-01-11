import Board from "./components/Board";
import React, { useState, useRef } from "react";
import Notes from "./assets/constants";

function App() {
  const [notes, setNotes] = useState(Notes);

  function handleAddNote() {
    setNotes([
      ...notes,
      {
        id: Date.now(),
      },
    ]);
  }

  function handleDeleteNote(id) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  function handlePinNote(id) {
    const pinnedNote = notes.find((note) => note.id === id);
    if (pinnedNote) {
      pinnedNote.pin = true;
    }
    setNotes([...notes]);
    console.log(notes);
  }

  return (
    <>
      <Board
        notes={notes}
        addNote={handleAddNote}
        deleteNote={handleDeleteNote}
        pinNote={handlePinNote}
      />
    </>
  );
}

export default App;
