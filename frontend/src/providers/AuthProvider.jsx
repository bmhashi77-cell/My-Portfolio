import { createContext, useContext, useEffect, useState } from 'react'
import { fetchMe } from '../api/authApi'

const AuthContext = createContext()
const TOKEN_KEY = 'portfolio-token'

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY))
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(!!token)

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (token) {
          const { user: me } = await fetchMe(token)
          setUser(me)
        }
      } catch (err) {
        console.error('Auth load failed', err)
        setToken(null)
        localStorage.removeItem(TOKEN_KEY)
      } finally {
        setLoading(false)
      }
    }
    loadUser()
  }, [token])

  const login = (nextToken, userPayload) => {
    setToken(nextToken)
    setUser(userPayload)
    localStorage.setItem(TOKEN_KEY, nextToken)
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem(TOKEN_KEY)
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)