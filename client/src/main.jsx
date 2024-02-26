import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'

const App = () => {
  const [note, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await axios.get('/api/note')
      setNotes(response.data)
      setIsLoading(false)
    }
    fetchNotes()
  }, [])

  if (isLoading) {
    return <section className="loading">Loading</section>
  }

  return (
    <main>
      <h1>Acme Notes ({note.length})</h1>
      <ul>
        {note.map((note) => {
          return (
            <li key={note.id}>
              {note.txt}
              {note.starred ? '⭐' : null}
            </li>
          )
        })}
      </ul>
    </main>
  )
}

const root = createRoot(document.querySelector('#root'))

root.render(<App />)
