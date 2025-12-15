import { useState } from 'react'
import { useStore } from '@tanstack/react-store'
import { appStore, addTask, removeTaskAt } from '../store/appStore'

export default function Tasks() {
  const listaTareas = useStore(appStore, (s) => s.listaTareas)
  const [text, setText] = useState('')

  const handleAdd = (e: any) => {
    e.preventDefault()
    addTask(text)
    setText('')
  }

  return (
    <div className="page tasks">
      <h2>Tareas</h2>
      <p className="task-subtitle">Crea y gestiona tu lista de tareas</p>
      <form onSubmit={handleAdd} className="task-form">
        <input 
          value={text} 
          onChange={(e: any) => setText(e.target.value)} 
          placeholder="Ingresa una nueva tarea..." 
          autoFocus
        />
        <button type="submit">Añadir Tarea</button>
      </form>

      <ul className="task-list">
        {listaTareas.length === 0 ? (
          <div className="empty-state">
            <p>📝 No hay tareas aún. ¡Crea una para comenzar!</p>
          </div>
        ) : (
          listaTareas.map((t, i) => (
            <li key={i}>
              <span className="task-text">{t}</span>
              <button 
                onClick={() => removeTaskAt(i)} 
                aria-label={`Eliminar tarea ${i}`}
                className="delete-btn"
              >
                Eliminar
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
