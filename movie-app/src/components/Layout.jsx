import { Outlet } from 'react-router-dom'
import { Box, Container } from '@mui/material'
import Navbar from './NavBar'
import Footer from './Footer'

const Layout = () => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
     <Navbar />
     <Container component="main" sx={{flexGrow: 1,py: 3,px: { xs: 2, sm: 3 },transition: 'all 0.3s ease'}}>
       <Outlet />
     </Container>
      <Footer />
    </Box>
  )
}

export default Layout