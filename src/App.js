import React from 'react';
import Header from './components/Header';
import Todo from './components/Todo';
import { nanoid } from 'nanoid';
import "@fontsource/rubik";
import "@fontsource/inter";
import './App.css';



function App() {

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
    setNotes((prevNotes) => prevNotes.filter(elem => elem.id !==id));
  }
  
  function updateNote(id){
    let promptNote = prompt("Write a new note")
    
    const index = notes.findIndex(obj => {
      return obj.id === id;
    });

    const newNotes = [...notes];
    newNotes[index].body = promptNote;
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
      setNotes((prevNotes) => prevNotes.filter(elem => elem.seen !== true));
    }
  }

  return (
    <div className="App">
      <Header/>
      <Todo
        note = {note}
        notes = {notes}
        setNewNote = {setNewNote}
        createNewNote = {createNewNote}
        deleteNote = {deleteNote}
        updateNote = {updateNote}
        handleCheckBox = {handleCheckBox}
        countSelectedNotes ={countSelectedNotes}
        deleteCheckedNotes = {deleteCheckedNotes}
      />
    </div>
  );
}

export default App;
