import React, { useState, useRef } from "react";
import pin from "../assets/images/pin.png";

function Notes({ note, editNote, deleteNote, pinNote }) {
  const [noteText, setNoteText] = useState(note.text);
  const [allowMove, setAllowMove] = useState(false);
  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);

  const textRef = useRef(null);
  const moveRef = useRef();

  function handleMouseDown(e) {
    setAllowMove(true);
    const dim = moveRef.current.getBoundingClientRect();
    setDx(e.clientX - dim.x);
    setDy(e.clientY - dim.y);
  }

  function handleMouseMove(e) {
    if (allowMove) {
      const x = e.clientX - dx;
      const y = e.clientY - dy;
      moveRef.current.style.left = x + "px";
      moveRef.current.style.top = y + "px";
    }
  }

  function handleMouseUp() {
    setAllowMove(false);
  }

  function isEditing() {
    setNoteText("");
    textRef.current.focus();
    textRef.current.setSelectionRange(0, 0);
  }

  function handleEdit(e) {
    setNoteText(e.target.value);
    note.text = e.target.value;
  }
  return (
    <div ref={moveRef} className="note">
      <div
        className="sticky-header"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        Sticky Note
      </div>
      <div className="pin-delete-buttons">
        <button onClick={() => pinNote(note.id)}>
          <img src={pin}></img>
        </button>
        <button onClick={() => deleteNote(note.id)}>X</button>
      </div>

      <textarea
        placeholder="Enter your note here...."
        ref={textRef}
        rows={4}
        column={5}
        className="text-area"
        value={noteText}
        onChange={(e) => handleEdit(e)}
      ></textarea>
      <div className="edit-button">
        <button onClick={isEditing}>Edit</button>
      </div>
    </div>
  );
}

export default Notes;
