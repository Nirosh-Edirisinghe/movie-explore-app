import { useEffect, useRef } from 'react'
import { useState } from 'react'
import {Box, Typography,TextField, InputAdornment, IconButton, CircularProgress} from '@mui/material'
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material'
import InfiniteScroll from 'react-infinite-scroll-component'
import MovieGrid from '../components/MovieGrid'
import { useMovie } from '../contexts/MovieContext'

const Search = () => {
  const { searchQuery, searchResults, isLoading, hasMore, handleSearch, loadMoreResults} = useMovie()
  const searchInputRef = useRef(null)
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)
  
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (localSearchQuery.trim()) {
      handleSearch(localSearchQuery)
    }
  }
  
  const clearSearch = () => {
    setLocalSearchQuery('')
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }
  
  return (
    <Box component="section">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>Search Movies</Typography>

      <Box 
        component="form" 
        onSubmit={handleSearchSubmit}
        sx={{display: 'flex',flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 4,width: '100%'}}>

        <TextField
          inputRef={searchInputRef}
          fullWidth
          id="search-movie"
          placeholder="Search for movies..."
          variant="outlined"
          value={localSearchQuery}
          onChange={(e) => setLocalSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: localSearchQuery && (
              <InputAdornment position="end">
                <IconButton aria-label="clear search" onClick={clearSearch} edge="end">
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Box>

      {/* Display the current search query */}
      {searchQuery && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">
            Search results for: <em>"{searchQuery}"</em>
          </Typography>
        </Box>
      )}
      
      {/* Display results if found */}
      {searchResults.length > 0 ? (
        <InfiniteScroll
          dataLength={searchResults.length}
          next={loadMoreResults}
          hasMore={hasMore}
          loader={
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          }
          endMessage={
            <Typography variant="body2" sx={{ textAlign: 'center', my: 4, color: 'text.secondary' }}>
              You've seen all results for "{searchQuery}"
            </Typography>
          }
        >
          <MovieGrid movies={searchResults} loading={false}/>

        </InfiniteScroll>

      ) : (
        <Box>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            searchQuery && (
              <Typography variant="body1" sx={{ textAlign: 'center', my: 4 }}>
                No results found for "{searchQuery}". Try a different search term.
              </Typography>
            )
          )}
          
          {!searchQuery && !isLoading && (
            <Typography variant="body1" sx={{ textAlign: 'center', my: 4 }}>
              Enter a search term to find movies
            </Typography>
          )}
        </Box>
      )}
    </Box>
  )
}



export default Search