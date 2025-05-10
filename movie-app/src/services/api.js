import axios from 'axios'

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY

// Create an axios instance with the base URL and common parameters
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: TMDB_API_KEY,
    language: 'en-US'
  },
  headers: {
   'Content-Type': 'application/json;charset=utf-8'
  }
})


// Get movies (general movie list)
export const getMovies = async (page = 1) => {
  try {
    const response = await api.get('/movie/popular', {
      params: { page }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching movies:', error)
    throw error
  }
}

// Get trending movies
export const getTrendingMovies = async () => {
  try {
    const response = await api.get('/trending/movie/day')
    return response.data
  } catch (error) {
    console.error('Error fetching trending movies:', error)
    throw error
  }
}

// Search movies
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get('/search/movie', {
      params: {
        query,
        page,
        include_adult: false
      }
    })
    return response.data
  } catch (error) {
    console.error('Error searching movies:', error)
    throw error
  }
}

// Get movie details
export const getMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'credits,videos'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching movie details:', error)
    throw error
  }
}

// Get movie recommendations
export const getMovieRecommendations = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/recommendations`)
    return response.data
  } catch (error) {
    console.error('Error fetching movie recommendations:', error)
    throw error
  }
}

// Helper function to get the full image URL
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image+Available'
  return `https://image.tmdb.org/t/p/${size}${path}`
}

// Helper function to get the YouTube video URL
export const getVideoUrl = (key) => {
  if (!key) return null
  return `https://www.youtube.com/embed/${key}`
}