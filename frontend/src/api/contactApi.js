import { api } from './client'

export const sendMessage = async (payload) => {
  const { data } = await api.post('/contact', payload)
  return data
}

export const fetchMessages = async (token) => {
  const { data } = await api.get('/contact', { headers: { Authorization: `Bearer ${token}` } })
  return data
}

export const deleteMessage = async (id, token) => {
  await api.delete(`/contact/${id}`, { headers: { Authorization: `Bearer ${token}` } })
}