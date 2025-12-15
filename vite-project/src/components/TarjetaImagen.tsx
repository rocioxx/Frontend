import type { ImagenAdaptada } from '../adapters/imagenesAdapter'

interface TarjetaImagenProps {
  imagen: ImagenAdaptada
}

export default function TarjetaImagen({ imagen }: TarjetaImagenProps) {
  return (
    <div className="tarjeta-imagen">
      <div className="tarjeta-imagen-container">
        <img 
          src={imagen.urlMedium} 
          alt={imagen.alt}
          loading="lazy"
          className="tarjeta-imagen-img"
        />
        <div className="tarjeta-imagen-overlay">
          <div className="tarjeta-imagen-info">
            <p className="tarjeta-imagen-descripcion">{imagen.descripcion}</p>
            <p className="tarjeta-imagen-fotografo"> {imagen.fotografo}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
