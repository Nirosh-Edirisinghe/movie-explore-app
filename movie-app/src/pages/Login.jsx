import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {Container, Box, Avatar, Typography, TextField, Button, Paper, Link, InputAdornment, IconButton,Alert, Collapse} from '@mui/material'

import { LockOutlined as LockOutlinedIcon, Visibility,VisibilityOff } from '@mui/icons-material'
import { useAuth } from '../contexts/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  
  // If already authenticated, redirect to home
   useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    if (!username.trim() || !password.trim()) {
      setError('Username and password are required')
      return
    }
    
    const success = login(username, password)
    
    if (success) {
      navigate('/')
    } else {
      setError('Invalid username or password')
    }
  }
  
  return (
    <Container component="main" maxWidth="sm" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Paper 
        elevation={6}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          borderRadius: 2,
          background: theme => theme.palette.mode === 'dark' ? 'linear-gradient(145deg, #1e1e1e 0%, #0A1929 100%)' : 'white'}}
        className="fade-in">

        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
          CineVerse
        </Typography>

        <Typography component="h2" variant="h5">
          Sign in
        </Typography>
        
        <Collapse in={!!error} sx={{ width: '100%', mt: 2 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        </Collapse>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (

                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}/>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }}>
            Sign In
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              enter your username and password
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

export default Login