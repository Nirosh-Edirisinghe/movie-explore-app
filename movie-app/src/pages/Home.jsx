import { useState, useEffect } from 'react'
import {Box, Container, Typography, Grid, Button,useMediaQuery, useTheme,Paper} from '@mui/material'
import MovieGrid from '../components/MovieGrid'
import { useMovie } from '../contexts/MovieContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { trendingMovies, trendingLoading, lastSearch, handleSearch } = useMovie()
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  
  const [featuredMovie, setFeaturedMovie] = useState(null)
  
  useEffect(() => {
    // Select a random movie from trending for the hero section
    if (trendingMovies.length > 0) {
      const randomIndex = Math.floor(Math.random() * Math.min(5, trendingMovies.length))
      setFeaturedMovie(trendingMovies[randomIndex])
    }
  }, [trendingMovies])

  const handleContinueSearch = () => {
    if (lastSearch) {
      handleSearch(lastSearch)
      navigate('/search')
    }
  }
  
  return (
    <Box component="section">
      {/* Hero Section */}
      {featuredMovie && (
        <Paper 
          sx={{
            position: 'relative',
            height: { xs: 400, md: 500 },
            borderRadius: 2,
            mb: 6,
            backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.4) 100%), url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 4,
            overflow: 'hidden'
          }}
          className="fade-in"
        >

          <Box sx={{ maxWidth: 'md', zIndex: 1 }}>

            <Typography 
              variant="h3" 
              component="h1" 
              color="white" 
              gutterBottom
              sx={{ fontWeight: 'bold',fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }}}>
              {featuredMovie.title}
            </Typography>

            <Typography 
              variant="body1" 
              color="white" 
              paragraph
              sx={{mb: 3,display: '-webkit-box',overflow: 'hidden', WebkitBoxOrient: 'vertical',
                WebkitLineClamp: isMobile ? 2 : 3,}}>
              {featuredMovie.overview}
            </Typography>
           
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              onClick={() => navigate(`/movie/${featuredMovie.id}`)}
            >View Details
            </Button>
            
          </Box>
        </Paper>
      )}
      
      {/* Main Content */}
      <Box>
        {lastSearch && (
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" gutterBottom>
              Continue your search
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body1">
                You previously searched for: <strong>"{lastSearch}"</strong>
              </Typography>

              <Button variant="outlined" onClick={handleContinueSearch}> View Results</Button>
            </Box>
          </Box>
        )}
        
        <MovieGrid 
          movies={trendingMovies} 
          loading={trendingLoading} 
          title="Trending Movies" 
          emptyMessage="No trending movies available at the moment" 
        />
      </Box>
    </Box>
  )
}

export default Home