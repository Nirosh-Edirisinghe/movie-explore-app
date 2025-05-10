import {Box, Typography, Grid, Button} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useMovie } from '../contexts/MovieContext'
import MovieGrid from '../components/MovieGrid'

const Favorites = () => {
  const { favorites, removeFromFavorites } = useMovie()
  const navigate = useNavigate()
  
  return (
    <Box component="section">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        My Favorites
      </Typography>
      
      {favorites.length === 0 ? (
        <Box sx={{textAlign: 'center', py: 8, display: 'flex', flexDirection: 'column', 
          alignItems: 'center',gap: 2}}>

          <Typography variant="h6" color="text.secondary" gutterBottom>
            You haven't added any favorites yet
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 600 }}>
            Browse movies and click the heart icon to add them to your favorites.
          </Typography>

          <Button variant="contained" color="primary"onClick={() => navigate('/')}>
            Discover Movies
          </Button>
        </Box>

      ) : (
        <MovieGrid  movies={favorites} title="" emptyMessage="No favorites found"/>
      )}
    </Box>
  )
}

export default Favorites