import React, { useState, useRef } from "react";
import Notes from "./Notes";

function Board({ notes, addNote, deleteNote, pinNote }) {
  return (
    <div className="notice-board">
      <div className="board">
        {notes.map((note) => (
          <Notes
            key={note.id}
            note={note}
            deleteNote={deleteNote}
            pinNote={pinNote}
          />
        ))}
      </div>
      <div className="add-button">
        <button className="addNote" onClick={addNote}>
          +
        </button>
      </div>
    </div>
  );
}

export default Board;
