import { createContext, useContext, useState, useEffect } from 'react'
import { getMovies, searchMovies, getTrendingMovies } from '../services/api'

const MovieContext = createContext()

export function MovieProvider({ children }) {
  // Search state
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  // Trending movies state
  const [trendingMovies, setTrendingMovies] = useState([])
  const [trendingLoading, setTrendingLoading] = useState(false)

  // Favorites state
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites')
    return savedFavorites ? JSON.parse(savedFavorites) : []
  })

  // Last search 
  const [lastSearch, setLastSearch] = useState(() => {
    return localStorage.getItem('lastSearch') || ''
  })

  
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  // Save last search to localStorage
  useEffect(() => {
    if (searchQuery) {
      localStorage.setItem('lastSearch', searchQuery)
      setLastSearch(searchQuery)
    }
  }, [searchQuery])

  // Load trending movies on initial load
  useEffect(() => {
    const loadTrending = async () => {
      try {
        setTrendingLoading(true)
        const data = await getTrendingMovies()
        setTrendingMovies(data.results)
      } catch (error) {
        console.error('Error loading trending movies:', error)
      } finally {
        setTrendingLoading(false)
      }
    }
    loadTrending()
  }, [])

  const handleSearch = async (query, resetPage = true) => {
    try {
      setIsLoading(true)
      setSearchQuery(query)
      
      if (resetPage) {
        setPage(1)
        setSearchResults([])
      }
      
      const pageToFetch = resetPage ? 1 : page
      const data = await searchMovies(query, pageToFetch)
      
      const newMovies = data.results || []
      
      if (resetPage) {
        setSearchResults(newMovies)
      } else {
        setSearchResults(prev => [...prev, ...newMovies])
      }
      
      setHasMore(data.page < data.total_pages)
      
      if (!resetPage) {
        setPage(prev => prev + 1)
      }
    } catch (error) {
      console.error('Error searching movies:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadMoreResults = () => {
    if (!isLoading && hasMore) {
      handleSearch(searchQuery, false)
    }
  }

  const addToFavorites = (movie) => {
    setFavorites(prev => {
      // Check if movie is already in favorites
      if (prev.some(m => m.id === movie.id)) {
        return prev
      }
      return [...prev, movie]
    })
  }

  const removeFromFavorites = (movieId) => {
    setFavorites(prev => prev.filter(movie => movie.id !== movieId))
  }

  const isFavorite = (movieId) => {
    return favorites.some(movie => movie.id === movieId)
  }

  const value = {
    searchQuery,
    searchResults,
    trendingMovies,
    favorites,
    isLoading,
    trendingLoading,
    hasMore,
    lastSearch,
    handleSearch,
    loadMoreResults,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  }

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  )
}

export function useMovie() {
  const context = useContext(MovieContext)
  if (!context) {
    throw new Error('useMovie must be used within a MovieProvider')
  }
  return context
}