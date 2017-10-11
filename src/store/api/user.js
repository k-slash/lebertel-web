import axios from 'axios'

const API_URL = 'http://localhost:8000/'
const CLIENT_ID = '3WoLnGo8YKjrNwZmJpQjDKYJJTRAamMLbpQnBl5U'
const CLIENT_SECRET = 'x98x6lzSoI6zQRoDnbDKKGup6whNpCIGNb87z5FvLAUDXjAaYzz4PRkW6c4agP58HuajVnmSK49I3ADcBCaoPsm3cWs25LJZtEDWicePIsLPOGxae2F5tC2IfGTh9BWl'
const token = localStorage.getItem('id_token')

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: 'Bearer ' + token
  }
})

export default {
  connectUser (email, password) {
    return api.post('o/token/?grant_type=password&username=' + email + '&password=' + password + '&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET)
  },
  getUserInfo () {
    return api.get('user/')
  },
  getUserProfile () {
    return api.get('user/profile/')
  },
  getUserLocation () {
    return api.get('user/location/')
  },
  getUserShowcase () {
    return api.get('user/showcase/')
  }
}
