import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {Box, Typography, Grid, Chip, Rating, Button, Paper, Divider, List, ListItem, ListItemText, Avatar,
  IconButton, CircularProgress, useTheme, useMediaQuery} from '@mui/material'

import {ArrowBack, Favorite, FavoriteBorder, PlayArrow } from '@mui/icons-material'
import { getMovieDetails, getImageUrl, getVideoUrl, getMovieRecommendations } from '../services/api'
import { useMovie } from '../contexts/MovieContext'
import MovieGrid from '../components/MovieGrid'

const MovieDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovie()

  const [movie, setMovie] = useState(null)
  const [trailer, setTrailer] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showFullCast, setShowFullCast] = useState(false)
  const [recommendations, setRecommendations] = useState([])
  const [showTrailer, setShowTrailer] = useState(false)
  
  const favorite = isFavorite(parseInt(id))
  
  const handleFavoriteClick = () => {
    if (favorite) {
      removeFromFavorites(parseInt(id))
    } else if (movie) {
      addToFavorites(movie)
    }
  }
  
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Fetch movie details
        const data = await getMovieDetails(id)
        setMovie(data)
        
        // Find trailer
        const trailerVideo = data.videos?.results?.find(
          video => video.type === 'Trailer' && video.site === 'YouTube'
        )
        setTrailer(trailerVideo)
        
        // Fetch recommendations
        const recData = await getMovieRecommendations(id)
        setRecommendations(recData.results || [])
        
      } catch (err) {
        console.error('Error fetching movie details:', err)
        setError('Failed to load movie details. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }   
    fetchMovieData()
  }, [id])
  
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    )
  }
  
  if (error) {
    return (
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h6" color="error" gutterBottom>
          {error}
        </Typography>

        <Button variant="contained" onClick={() => navigate(-1)} startIcon={<ArrowBack />} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    )
  }
  
  if (!movie) return null
  
  const castToShow = showFullCast 
    ? movie.credits?.cast 
    : movie.credits?.cast?.slice(0, 6)
  
  const releaseYear = movie.release_date 
    ? new Date(movie.release_date).getFullYear() 
    : 'N/A'
  
  const runtimeFormatted = movie.runtime 
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` 
    : 'N/A'
  
  return (
    <Box sx={{ pb: 6 }}>
      {/* Back button */}
      <Button onClick={() => navigate(-1)} startIcon={<ArrowBack />} sx={{ mb: 3 }}>
        Back
      </Button>
      
      {/* Movie backdrop */}
      <Paper 
        sx={{
          position: 'relative',
          height: { xs: 200, sm: 300, md: 400 },
          borderRadius: 2,
          mb: 4,
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.4) 100%), url(${getImageUrl(movie.backdrop_path, 'original')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: { xs: 2, sm: 3, md: 4 },
          overflow: 'hidden'
        }}
        className="fade-in"
      >

        <Box sx={{ zIndex: 1 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            color="white" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }
            }}>
            {movie.title} <span style={{ opacity: 0.7 }}>({releaseYear})</span>
          </Typography>
          
          {trailer && (
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<PlayArrow />}
              onClick={() => setShowTrailer(true)}
              sx={{ mt: 2 }}>
              Watch Trailer
            </Button>
          )}
        </Box>
      </Paper>
      
      {/* Movie details */}
      <Grid container spacing={4}>
        {/* Poster and basic info */}
        <Grid item xs={12} sm={4} md={3}>

          <Paper 
            sx={{borderRadius: 2, overflow: 'hidden', height: '100%', position: 'relative'}}
            elevation={3}>

            <Box 
              component="img" 
              src={getImageUrl(movie.poster_path)} 
              alt={movie.title}
              sx={{ width: '100%', display: 'block', borderRadius: 1}} />

            <Box sx={{ position: 'absolute', top: 8, right: 8,  bgcolor: 'background.paper',
                borderRadius: '50%', boxShadow: 2}}>
              <IconButton color="primary" onClick={handleFavoriteClick} sx={{ p: 1 }}>
                {favorite ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Box>
          </Paper>

        </Grid>

        
        {/* Movie info */}
        <Grid item xs={12} sm={8} md={9}>
          {/* Rating and genres */}
          <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Rating value={movie.vote_average / 2} precision={0.1} readOnly />
              <Typography variant="h6" sx={{ ml: 1 }}>
                {(movie.vote_average / 2).toFixed(1)}
              </Typography>
            </Box>

            <Divider orientation="vertical" flexItem sx={{ height: 20 }} />

            <Typography variant="body1">
              {runtimeFormatted}
            </Typography>
            
            <Divider orientation="vertical" flexItem sx={{ height: 20 }} />

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {movie.genres?.map(genre => (
                <Chip key={genre.id} label={genre.name} size="small" sx={{ bgcolor: 'primary.main', color: 'white' }} />))}
            </Box>
          </Box>
          

          {/* Overview */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Overview
            </Typography>

            <Typography variant="body1">
              {movie.overview || 'No overview available.'}
            </Typography>
          </Box>
          
          {/* Movie details grid */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {movie.release_date && (
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle1" fontWeight="bold">Release Date</Typography>

                <Typography variant="body1">
                  {new Date(movie.release_date).toLocaleDateString()}
                </Typography>
              </Grid>
            )}
            
            {movie.original_language && (
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle1" fontWeight="bold"> Original Language</Typography>
                <Typography variant="body1" textTransform="uppercase">
                  {movie.original_language}
                </Typography>
              </Grid>
            )}
            
            {movie.production_companies?.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Production Companies
                </Typography>
                <Typography variant="body1">
                  {movie.production_companies.map(company => company.name).join(', ')}
                </Typography>
              </Grid>
            )}
          </Grid>
          
          {/* Cast section */}
          {castToShow?.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom> Cast </Typography>
              <List>

                <Grid container spacing={2}>
                  {castToShow.map(person => (
                    <Grid item xs={12} sm={6} md={4} key={person.id}>
                      <Paper elevation={1} sx={{ p: 1, borderRadius: 2 }}>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar 
                            src={person.profile_path ? getImageUrl(person.profile_path, 'w200') : null}
                            alt={person.name}>
                            {person.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2">{person.name}</Typography>
                            <Typography variant="body2" color="text.secondary">{person.character}
                            </Typography>
                          </Box>
                        </Box>

                      </Paper>
                    </Grid>
                  ))}
                </Grid>
                
                {movie.credits?.cast?.length > 6 && (
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Button variant="outlined" onClick={() => setShowFullCast(!showFullCast)}>
                      {showFullCast ? 'Show Less' : `Show All (${movie.credits.cast.length}) Cast Members`}
                    </Button>
                  </Box>
                )}
              </List>
            </Box>
          )}
        </Grid>
      </Grid>
      
      {/* Trailer modal */}
      {showTrailer && trailer && (
        <Box 
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1300,
            p: 2
          }}
          onClick={() => setShowTrailer(false)}
        >
          <Box sx={{ position: 'relative', width: '100%', maxWidth: 900,aspectRatio: '16/9' }}
            onClick={e => e.stopPropagation()}>

            <iframe
              width="100%"
              height="100%"
              src={`${getVideoUrl(trailer.key)}?autoplay=1`}
              title={`${movie.title} Trailer`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            <Button variant="contained" color="primary" sx={{position: 'absolute',top: -40, right: 0 }}
             onClick={() => setShowTrailer(false)} >
              Close
            </Button>

          </Box>
        </Box>
      )}
      
      {/* Recommendations */}
      {recommendations.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Recommended Movies
          </Typography>

          <MovieGrid movies={recommendations.slice(0, 8)} />
          {recommendations.length > 8 && (
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button variant="outlined"> View All Recommendations</Button>
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}

export default MovieDetails