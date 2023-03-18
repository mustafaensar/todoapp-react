import React from 'react'
import { nanoid } from 'nanoid';

export default function Todo() {

  const [notes,setNotes] = React.useState(() => JSON.parse(localStorage.getItem("notes")) || []);
  const [note, setNewNote] = React.useState("");
  
  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    setNewNote("");
  },[notes])
  

  function createNewNote(){

    if(!note){
      alert("Please write a note");
      return;
    }

    const newNote = {
      id: nanoid(),
      body: note,
      seen: false
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
      body: promptNote,
      seen: false
    }
    
    const index = notes.findIndex(obj => {
      return obj.id === id;
    });

    const newNotes = [...notes];
    newNotes[index] = updatedNote;
    setNotes(newNotes);
  }

  function handleCheckBox(id){
    
    const index = notes.findIndex(obj => {
      return obj.id === id;
    });
    
    const newNotes = [...notes];
    if(!newNotes[index].seen){
      newNotes[index].seen = true;
      setNotes(newNotes);
    }else{
      newNotes[index].seen = false;
      setNotes(newNotes);
    }
  }

  function countSelectedNotes(){
    const newNotes = notes.filter(elem => elem.seen === true);
    return newNotes.length;
  }

  function deleteCheckedNotes(){
    if(countSelectedNotes !== 0){
      const newNotes = notes.filter(elem => elem.seen !== true);
      setNotes(newNotes);
    }
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
        <button className='button' onClick={() => createNewNote()}>Add</button>
      </div>
      <div className='todo-list'>
        <ul>
          {notes.map(note => {
            return(
              <li key={note.id}>
                <div>
                <input
                  className='checkbox-round'
                  type="checkbox"
                  checked={note.seen}
                  onChange={() => handleCheckBox(note.id)}
                />
                </div>
                {note.body}
                <div className='list--button'>
                <button className='button' onClick={() => updateNote(note.id)}>Update</button>  
                <button className='button' onClick={() => deleteNote(note.id)}>Delete</button>    
                </div> 
              </li>
            )
          })}
        </ul>
      </div>
      <hr/>
      <div className='footer'>
        <p><span>{countSelectedNotes()}</span> item selected</p>
        <p className='clear-all' onClick={deleteCheckedNotes}>Clear All</p>
      </div>
    </div>
    </>
  )
}