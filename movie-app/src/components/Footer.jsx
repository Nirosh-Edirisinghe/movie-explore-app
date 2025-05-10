import { Box, Container, Typography, Link, IconButton, Stack } from '@mui/material'
import { GitHub,LinkedIn, Facebook } from '@mui/icons-material'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{py: 3, px: 2, mt: 'auto',backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],}}>

      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' },justifyContent: 'space-between', alignItems: 'center', }} >


          <Typography variant="body2" color="text.secondary" align="center">
            {'© '}
            <Link color="inherit" href="/">CineVerse </Link>
              {' '} {new Date().getFullYear()}{'. All rights reserved. '} 
          </Typography>


          <Stack direction="row" spacing={1} sx={{ mt: { xs: 2, md: 0 } }}>

            <IconButton href="https://www.linkedin.com/in/nirosh-edirisinghe" color="inherit" aria-label="LinkedIn" size="small">
              <LinkedIn fontSize="small" />
            </IconButton>

            <IconButton href="https://github.com/Nirosh-Edirisinghe" color="inherit" aria-label="GitHub" size="small">
              <GitHub fontSize="small" />
            </IconButton>

            <IconButton href="https://www.facebook.com/share/1594o6iPH1/" color="inherit" aria-label="Facebook" size="small">
              <Facebook fontSize="small" />
            </IconButton>

          </Stack>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer