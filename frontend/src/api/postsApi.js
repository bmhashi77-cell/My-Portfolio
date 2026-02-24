import { api } from './client'

export const fetchPosts = async (params = {}) => {
  const { data } = await api.get('/posts', { params })
  return data
}

export const fetchPost = async (slug) => {
  const { data } = await api.get(`/posts/${slug}`)
  return data
}

export const createPost = async (payload, token) => {
  const { data } = await api.post('/posts', payload, { headers: { Authorization: `Bearer ${token}` } })
  return data
}

export const updatePost = async (slug, payload, token) => {
  const { data } = await api.put(`/posts/${slug}`, payload, { headers: { Authorization: `Bearer ${token}` } })
  return data
}

export const deletePost = async (slug, token) => {
  await api.delete(`/posts/${slug}`, { headers: { Authorization: `Bearer ${token}` } })
}