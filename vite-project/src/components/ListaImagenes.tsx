import { useState } from 'react'
import { useImages } from '../hooks/useImages'
import TarjetaImagen from './TarjetaImagen'
import '../styles/imagenes.css'

export default function ListaImagenes() {
  const [searchQuery, setSearchQuery] = useState('Tigers')
  const { data: imagenes, isLoading, isError, error } = useImages({ query: searchQuery, perPage: 10 })

  const handleSearch = (e: any) => {
    e.preventDefault()
    const input = (e.target as any).elements[0] as HTMLInputElement
    const query = input.value.trim()
    if (query) {
      setSearchQuery(query)
    }
  }

  return (
    <div className="lista-imagenes">
      <h2>Galería de Imágenes</h2>
      <p className="lista-imagenes-subtitle">Explora imágenes desde Pexels API</p>

      <form onSubmit={handleSearch} className="busqueda-form">
        <input
          type="text"
          placeholder="Buscar imágenes (ej: cats, nature, landscape)..."
          defaultValue={searchQuery}
          className="busqueda-input"
        />
        <button type="submit" className="busqueda-btn">Buscar</button>
      </form>

      {isLoading && (
        <div className="estado-carga">
          <p>⏳ Cargando imágenes...</p>
        </div>
      )}

      {isError && (
        <div className="estado-error">
          <p>❌ Error: {error?.message || 'No se pudieron cargar las imágenes'}</p>
          <p className="error-hint">
            Asegúrate de configurar tu API key de Pexels en `/src/api/imagenesPexel.ts`
          </p>
        </div>
      )}

      {imagenes && imagenes.length > 0 && (
        <div className="galeria-grid">
          {imagenes.map((imagen) => (
            <TarjetaImagen key={imagen.id} imagen={imagen} />
          ))}
        </div>
      )}

      {imagenes && imagenes.length === 0 && !isLoading && (
        <div className="estado-vacio">
          <p>📸 No se encontraron imágenes para "{searchQuery}"</p>
        </div>
      )}
    </div>
  )
}
