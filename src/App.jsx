import { useState, useEffect } from 'react'
import NoteList from './components/NoteList'
import NoteForm from './components/NoteForm'
import CategoryFilter from './components/CategoryFilter'
import './App.css'

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes')
    return savedNotes ? JSON.parse(savedNotes) : []
  })
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    'personal',
    'work',
    'shopping',
    'ideas',
    'tasks'
  ]

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  const addNote = (note) => {
    setNotes([...notes, note])
  }

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  const updateNote = (id, updatedContent, updatedCategory) => {
    setNotes(notes.map(note => 
      note.id === id 
        ? { ...note, content: updatedContent, category: updatedCategory } 
        : note
    ))
  }

  const filteredNotes = selectedCategory === 'all' 
    ? notes 
    : notes.filter(note => note.category === selectedCategory)

  return (
    <div className="app">
      <h1>Notes App</h1>
      <NoteForm onSubmit={addNote} categories={categories} />
      <CategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <NoteList 
        notes={filteredNotes} 
        onDelete={deleteNote}
        onUpdate={updateNote}
        categories={categories}
      />
    </div>
  )
}

export default App
