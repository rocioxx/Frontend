// API key for Pexels (note: in production, use environment variables)
const PEXELS_API_KEY = 'YOUR_PEXELS_API_KEY_HERE'

export interface PexelsPhoto {
  id: number
  width: number
  height: number
  url: string
  photographer: string
  photographer_url: string
  photographer_id: number
  avg_color: string
  src: {
    original: string
    large2x: string
    large: string
    medium: string
    small: string
    portrait: string
    landscape: string
    tiny: string
  }
  liked: boolean
  alt: string
}

export interface PexelsResponse {
  page: number
  per_page: number
  photos: PexelsPhoto[]
  total_results: number
  next_page?: string
}

/**
 * Fetch images from Pexels API
 * @param query - Search query (e.g., "Tigers")
 * @param perPage - Number of images to fetch (default: 10)
 * @returns Promise with photos array
 */
export async function fetchImagenesFromPexels(
  query: string = 'Tigers',
  perPage: number = 10
): Promise<PexelsResponse> {
  if (!PEXELS_API_KEY || PEXELS_API_KEY === 'YOUR_PEXELS_API_KEY_HERE') {
    throw new Error('PEXELS_API_KEY is not configured. Please add your API key.')
  }

  const url = new URL('https://api.pexels.com/v1/search')
  url.searchParams.append('query', query)
  url.searchParams.append('per_page', String(perPage))

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: PEXELS_API_KEY,
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch images: ${response.statusText}`)
  }

  return response.json()
}
