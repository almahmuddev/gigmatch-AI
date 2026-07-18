import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
})

// attach the jwt to every request if we have one, so we don't repeat this everywhere
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('gigmatch_token') : null
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
