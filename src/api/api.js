import axios from 'axios'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

const token = localStorage.getItem('token')
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/user/login', { email, password })

      // Save the token in localStorage
      const token = response.data.message.token
      localStorage.setItem('token', token)

      // Set Authorization header for subsequent requests
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  logout: async () => {
    try {
      const response = await api.get('/user/logout')
      // Clear token from localStorage and headers
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']

      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  getInfo: async () => {
    try {
      const response = await api.get('/user/getInfo')
      return response.data
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return null
      }
      throw error.response?.data || error
    }
  }
}