import { api } from './client'

export const login = async (payload) => {
  const { data } = await api.post('/auth/login', payload)
  return data
}

export const register = async (payload) => {
  const { data } = await api.post('/auth/register', payload)
  return data
}

export const fetchMe = async (token) => {
  const { data } = await api.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}