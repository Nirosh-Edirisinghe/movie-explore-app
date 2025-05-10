import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check localStorage for existing user session
    const savedUser = localStorage.getItem('user')
    
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)   
    }
    setIsLoading(false)
  }, [])

  //login function 
  const login = (username, password) => {
    // For demo purposes, accept any non-empty username/password
    if (username.trim() && password.trim()) {
      const user = { username }
      setUser(user)
      setIsAuthenticated(true)
      localStorage.setItem('user', JSON.stringify(user))
      return true
    }
    return false
  }

  // Logout function
  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('user')
  }

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}