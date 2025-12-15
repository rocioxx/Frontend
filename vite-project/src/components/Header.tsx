import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '@tanstack/react-store'
import { appStore, toggleSidebarFixed } from '../store/appStore'

export default function Header() {
  const sidebarFixed = useStore(appStore, (s) => s.sidebarFixed)
  const theme = useStore(appStore, (s) => s.theme)
  const [open, setOpen] = useState(false)

  const isSidebarVisible = sidebarFixed || open

  return (
    <header className={`app-header ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
      <nav className="topbar">
        <div className="brand">Mi App</div>
        <div className="links">
          <Link to="/">Inicio</Link>
          <Link to="/Hola">Hola</Link>
          <Link to="/Adios">Adios</Link>
          <Link to="/Tasks">Tasks</Link>
          <Link to="/Imagenes">Imagenes</Link>
          <Link to="/Settings">Settings</Link>
        </div>
        <div className="actions">
          <button onClick={() => setOpen((v) => !v)} aria-pressed={isSidebarVisible}>
            {isSidebarVisible ? 'Ocultar menú' : 'Mostrar menú'}
          </button>
          <button onClick={() => toggleSidebarFixed()} title="Alternar fijo/dinámico">
            {sidebarFixed ? 'Menu Fijo' : 'Menu Dinámico'}
          </button>
        </div>
      </nav>

      <aside className={`sidebar ${isSidebarVisible ? 'visible' : 'hidden'} ${sidebarFixed ? 'fixed' : 'floating'}`}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Hola">Hola</Link></li>
          <li><Link to="/Adios">Adios</Link></li>
          <li><Link to="/Tasks">Tasks</Link></li>
          <li><Link to="/Imagenes">Imagenes</Link></li>
          <li><Link to="/Settings">Settings</Link></li>
        </ul>
      </aside>
    </header>
  )
}
