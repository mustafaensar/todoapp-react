import React from 'react'
export default function Todo(props) {

  return (
    <>
    <div className='todo-app'>
      <div className='input-area'>
        <input
          type="text"
          placeholder='Write Todo'
          value={props.note}
          onChange={ e => props.setNewNote(e.target.value)}
        />
        <button className='button' onClick={() => {props.createNewNote()}}>Add</button>
      </div>
      <div className='todo-list'>
        <ul>
          {props.notes.map(note => {
            return(
              <li key={note.id}>
                <div>
                <input
                  className='checkbox-round'
                  type="checkbox"
                  checked={note.seen}
                  onChange={() => {props.handleCheckBox(note.id)}}
                />
                </div>
                {note.body}
                <div className='list--button'>
                <button className='button' onClick={() => {props.updateNote(note.id)}}>Update</button>  
                <button className='button' onClick={() => {props.deleteNote(note.id)}}>Delete</button>    
                </div> 
              </li>
            )
          })}
        </ul>
      </div>
      <hr/>
      <div className='footer'>
        <p><span>{props.countSelectedNotes()}</span> item selected</p>
        <p className='clear-all' onClick={() => {props.deleteCheckedNotes()}}>Clear All</p>
      </div>
    </div>
    </>
  )
}