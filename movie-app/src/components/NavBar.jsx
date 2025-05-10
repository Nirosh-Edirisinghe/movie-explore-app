import { useState } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, IconButton, Box, TextField, InputAdornment, Avatar, Menu,MenuItem, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider} from '@mui/material'

import { Search as SearchIcon, Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon, Menu as MenuIcon,
Movie as MovieIcon, Home as HomeIcon, Favorite as FavoriteIcon, Logout as LogoutIcon
} from '@mui/icons-material'

import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'
import { useMovie } from '../contexts/MovieContext'

const Navbar = () => {
  const navigate = useNavigate()
  const { toggleTheme, mode } = useTheme()
  const { user, logout } = useAuth()
  const { handleSearch } = useMovie()
  
  const [searchValue, setSearchValue] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  
  // Handlers for opening/closing profile menu
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  
  const handleProfileMenuClose = () => {
    setAnchorEl(null)
  }
  
  // Toggle mobile drawer visibility
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  
  // Submit search and navigate to search results
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchValue.trim()) {
      handleSearch(searchValue)
      navigate('/search')
      setSearchValue('')
      setMobileOpen(false)
    }
  }
  
  const handleLogout = () => {
    handleProfileMenuClose()
    logout()
    navigate('/login')
  }
  
  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleProfileMenuClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}>

      <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  )
  
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        CineVerse
      </Typography>
      <Divider />
      <List>

        {/* Home link */}
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        {/* Favorites link */}
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/favorites">
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary="Favorites" />
          </ListItemButton>
        </ListItem>

        {/* Theme toggle */}
        <ListItem disablePadding>
          <ListItemButton onClick={toggleTheme}>
            <ListItemIcon>
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </ListItemIcon>
            <ListItemText primary={mode === 'dark' ? 'Light Mode' : 'Dark Mode'} />
          </ListItemButton>
        </ListItem>

        {/* Logout */}
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>

      </List>

      {/* Search bar in mobile drawer */}
      <Box component="form" onSubmit={handleSearchSubmit} sx={{ p: 2 }}>
        <TextField
          fullWidth
          placeholder="Search for movies..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  )

  return (
    <>
      <AppBar position="sticky" elevation={2}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
          <MenuIcon />
          </IconButton>

          <MovieIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{mr: 2,display: { xs: 'none', sm: 'flex' },fontWeight: 700,color: 'inherit',textDecoration: 'none', }}>
              CineVerse
          </Typography>
          
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            <Button component={RouterLink} to="/" sx={{ my: 2, color: 'white', display: 'block' }}>
              Home
            </Button>

            <Button component={RouterLink} to="/favorites" sx={{ my: 2, color: 'white', display: 'block' }}>
              Favorites
            </Button>

          </Box>

          <Box component="form" onSubmit={handleSearchSubmit} sx={{flexGrow: 1,display: { xs: 'none', md: 'flex' },mx: 2}}>

            <TextField
              fullWidth
              placeholder="Search for movies..."
              size="small"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: {bgcolor: 'background.paper', borderRadius: 1}
              }}
            />
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>

            <IconButton onClick={toggleTheme} color="inherit" sx={{ ml: 1 }}>
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            
            <IconButton edge="end" aria-label="account of current user" aria-controls={menuId}     aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit"  sx={{ ml: 1 }}>
              
              <Avatar alt={user?.username || 'User'} src="/broken-image.jpg" sx={{ width: 32, height: 32 }}>
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </Avatar>
            </IconButton>
          </Box>

        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{display: { xs: 'block', sm: 'none' },'& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },}}>
        {drawer}
      </Drawer>
      
      {renderMenu}
    </>
  )
}

export default Navbar