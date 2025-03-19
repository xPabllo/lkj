import { useState } from 'react'
import './NoteItem.css'

function NoteItem({ note, onDelete, onUpdate, categories }) {
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState(note.content)
  const [category, setCategory] = useState(note.category)

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdate(note.id, content, category)
    setIsEditing(false)
  }

  return (
    <div className={`note-item ${note.category}`}>
      <div className="category-badge">{note.category}</div>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            autoFocus
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          <div className="note-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <p>{note.content}</p>
          <div className="note-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(note.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  )
}

export default NoteItem
