import axios from 'axios'

const API_URL = 'http://localhost:8000/'
const token = localStorage.getItem('id_token')
const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: 'Bearer ' + token
  }
})

export default api
