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
    console.log("down");
    const dim = moveRef.current.getBoundingClientRect();
    setDx(e.clientX - dim.x);
    setDy(e.clientY - dim.y);
  }

  function handleMouseUp() {
    console.log("up");
    setAllowMove(false);
  }

  function handleMouseMove(e) {
    if (allowMove) {
      console.log("move");
      const x = e.clientX - dx;
      const y = e.clientY - dy;
      moveRef.current.style.left = x + "px";
      moveRef.current.style.top = y + "px";
    }
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
        className="pin-delete-buttons"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
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
