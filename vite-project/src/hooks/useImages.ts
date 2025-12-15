import { useQuery } from '@tanstack/react-query'
import type { UseQueryResult } from '@tanstack/react-query'
import { fetchImagenesFromPexels } from '../api/imagenesPexel'
import { adaptarFotosPexels } from '../adapters/imagenesAdapter'
import type { ImagenAdaptada } from '../adapters/imagenesAdapter'

interface UseImagesOptions {
  query?: string
  perPage?: number
}

/**
 * Hook que ejecuta useQuery para obtener imágenes de Pexels
 * Automáticamente adapta los datos al formato interno de la App
 */
export function useImages(
  options: UseImagesOptions = {}
): UseQueryResult<ImagenAdaptada[], Error> {
  const { query = 'Tigers', perPage = 10 } = options

  return useQuery({
    queryKey: ['images', query, perPage],
    queryFn: async () => {
      const response = await fetchImagenesFromPexels(query, perPage)
      return adaptarFotosPexels(response.photos)
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
  })
}
