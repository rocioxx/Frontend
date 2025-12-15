import { PexelsPhoto } from '../api/imagenesPexel'

/**
 * Tipo adaptado que la App utiliza internamente
 */
export interface ImagenAdaptada {
  id: number
  urlMedium: string
  urlLarge: string
  fotografo: string
  descripcion: string
  alt: string
}

/**
 * Adapta una foto de Pexels al formato que usa la App
 */
export function adaptarFotoPexels(foto: PexelsPhoto): ImagenAdaptada {
  return {
    id: foto.id,
    urlMedium: foto.src.medium,
    urlLarge: foto.src.large,
    fotografo: foto.photographer,
    descripcion: foto.alt || 'Imagen sin descripción',
    alt: foto.alt || `Foto por ${foto.photographer}`,
  }
}

/**
 * Adapta un array de fotos de Pexels
 */
export function adaptarFotosPexels(fotos: PexelsPhoto[]): ImagenAdaptada[] {
  return fotos.map(adaptarFotoPexels)
}
