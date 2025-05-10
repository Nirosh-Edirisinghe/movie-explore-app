import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
  IconButton,
  Tooltip,
  Skeleton,
  Chip,
} from '@mui/material'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { getImageUrl } from '../services/api'
import { useMovie } from '../contexts/MovieContext'

const MovieCard = ({ movie, showRating = true }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const navigate = useNavigate()
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovie()

  const favorite = isFavorite(movie.id)

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    favorite ? removeFromFavorites(movie.id) : addToFavorites(movie)
  }

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`)
  }

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'Unknown'

  return (
    <Card
      sx={{
        height: '100%',
    width: '100%',
    maxWidth: 260, // Optional: control max width of card
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea onClick={handleCardClick} sx={{ flexGrow: 1 }}>
        {!imageLoaded && (
          <Skeleton
            variant="rectangular"
            width="100%"
            sx={{
              paddingTop: '150%',
              bgcolor: 'grey.800',
            }}
          />
        )}
        <Box sx={{ position: 'relative', width: '100%', pt: '150%' /* 2:3 ratio */ }}>
  <CardMedia
    component="img"
    image={getImageUrl(movie.poster_path)}
    alt={movie.title}
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: imageLoaded ? 'block' : 'none',
    }}
    onLoad={() => setImageLoaded(true)}
    onError={() => setImageLoaded(true)}
  />
</Box>

        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            padding: '6px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Chip
            label={releaseYear}
            size="small"
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.65rem',
            }}
          />

          {showRating && movie.vote_average > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Rating
                value={movie.vote_average / 2}
                precision={0.5}
                size="small"
                readOnly
              />
              <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                {(movie.vote_average / 2).toFixed(1)}
              </Typography>
            </Box>
          )}
        </Box>

        <CardContent sx={{ flexGrow: 1, pb: 1 }}>
          <Typography gutterBottom variant="subtitle1" component="div" noWrap>
            {movie.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
            }}
          >
            {movie.overview || 'No overview available'}
          </Typography>
        </CardContent>
      </CardActionArea>

      <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <Tooltip
          title={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <IconButton
            onClick={handleFavoriteClick}
            color="primary"
            aria-label="favorite"
          >
            {favorite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  )
}

export default MovieCard
