import { api } from './client'

export const fetchProjects = async (params = {}) => {
  const { data } = await api.get('/projects', { params })
  return data
}

export const fetchProject = async (id) => {
  const { data } = await api.get(`/projects/${id}`)
  return data
}

export const createProject = async (payload, token) => {
  const { data } = await api.post('/projects', payload, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

export const updateProject = async (id, payload, token) => {
  const { data } = await api.put(`/projects/${id}`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

export const deleteProject = async (id, token) => {
  await api.delete(`/projects/${id}`, { headers: { Authorization: `Bearer ${token}` } })
}