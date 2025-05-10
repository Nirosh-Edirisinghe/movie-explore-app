import { Grid,Typography, CircularProgress, Container } from '@mui/material'
import MovieCard from './MovieCard'

const MovieGrid = ({ movies, loading, title, emptyMessage }) => {
  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Container>
    )
  }

  if (!movies || movies.length === 0) {
    return (
      <Container sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h6" color="text.secondary">
          {emptyMessage || 'No movies found'}
        </Typography>
      </Container>
    )
  }

  return (
    <Container  sx={{ mb: 4 }}>
        {title && (
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
            {title}
          </Typography>
        )}
        
        {/* Grid container for displaying movie cards */}
        <Grid container spacing={2} justifyContent="center"alignItems="stretch">
          {movies.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3} xl={2}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>

    </Container>

  )
}

export default MovieGrid