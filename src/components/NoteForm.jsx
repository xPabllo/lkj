import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './NoteForm.css'

function NoteForm({ onSubmit, categories }) {
  const [content, setContent] = useState('')
  const [category, setCategory] = useState(categories[0])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!content.trim()) return

    onSubmit({
      id: uuidv4(),
      content: content,
      category: category,
      createdAt: new Date().toISOString()
    })
    setContent('')
    setCategory(categories[0])
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note here..."
        required
      />
      <div className="form-footer">
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
        <button type="submit">Add Note</button>
      </div>
    </form>
  )
}

export default NoteForm
