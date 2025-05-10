import { Box, Typography, Button, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Container maxWidth="sm">
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        minHeight: '80vh',textAlign: 'center',}}>

        <Typography variant="h1" color="primary" sx={{ fontSize: 120, fontWeight: 'bold' }}>
          404
        </Typography>

        <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
          Page Not Found
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
          The page you're looking for doesn't exist or has been moved.
        </Typography>

        <Button variant="contained" color="primary" size="large" onClick={() => navigate('/')}>
          Back to Home
        </Button>
        
      </Box>
    </Container>
  )
}

export default NotFound