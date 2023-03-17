import React from 'react'
import { nanoid } from 'nanoid';

export default function Todo() {

  const [notes,setNotes] = React.useState(() => JSON.parse(localStorage.getItem("notes")) || []);
  const [note, setNewNote] = React.useState("");

  
  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  },[notes])
  

  function createNewNote(){

    if(!note){
      alert("Please write a note");
      return;
    }

    const newNote = {
      id: nanoid(),
      body: note,
    }

    setNotes((prevNotes) => [newNote, ...prevNotes]);
  }

  function deleteNote(id){
    const newNotes = notes.filter(elem => elem.id !==id);
    setNotes(newNotes);
  }
  
  function updateNote(id){
    let promptNote = prompt("Write a new note")
    const updatedNote = {
      id: id,
      body: promptNote
    }
    
    const index = notes.findIndex(obj => {
      return obj.id === id;
    });

    const newNotes = [...notes]
    newNotes[index] = updatedNote;
    setNotes(newNotes);
  }

  return (
    <>
    <div className='todo-app'>
      <div className='input-area'>
        <input
          type="text"
          placeholder='Write Todo'
          value={note}
          onChange={ e => setNewNote(e.target.value)}
        />
        <button onClick={() => createNewNote()}>Add</button>
      </div>
      <div className='todo-list'>
        <ul>
          {notes.map(note => {
            return(
              <li key={note.id}>
                {note.body} 
                <button onClick={() => updateNote(note.id)}>Update</button>  
                <button onClick={() => deleteNote(note.id)}>Delete</button>  
              </li>
            )
          })}
        </ul>
      </div>
    </div>
    </>
  )
}