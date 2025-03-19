import NoteItem from './NoteItem'
import './NoteList.css'

function NoteList({ notes, onDelete, onUpdate }) {
  if (notes.length === 0) {
    return <p className="no-notes">No notes yet. Add one above!</p>
  }

  return (
    <div className="note-list">
      {notes.map(note => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  )
}

export default NoteList
