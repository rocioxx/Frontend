import React, { useState } from 'react'
import { useStore } from '@tanstack/react-store'
import { appStore, addTask, removeTaskAt } from '../store/appStore'

export default function Tasks() {
  const listaTareas = useStore(appStore, (s) => s.listaTareas)
  const [text, setText] = useState('')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    addTask(text)
    setText('')
  }

  return (
    <div className="page tasks">
      <h2>Tasks</h2>
      <form onSubmit={handleAdd} className="task-form">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Nueva tarea" />
        <button type="submit">Añadir</button>
      </form>

      <ul className="task-list">
        {listaTareas.length === 0 && <li>No hay tareas</li>}
        {listaTareas.map((t, i) => (
          <li key={i}>
            {t}
            <button onClick={() => removeTaskAt(i)} aria-label={`Eliminar tarea ${i}`}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
