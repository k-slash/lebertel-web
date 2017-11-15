import axios from 'axios'
import conf from '@/conf'

// const token = localStorage.getItem('id_token')

const api = axios.create({
  baseURL: conf.API_URL
})

export default api
