import api from '@/store/api'

const CLIENT_ID = '3WoLnGo8YKjrNwZmJpQjDKYJJTRAamMLbpQnBl5U'
const CLIENT_SECRET = 'x98x6lzSoI6zQRoDnbDKKGup6whNpCIGNb87z5FvLAUDXjAaYzz4PRkW6c4agP58HuajVnmSK49I3ADcBCaoPsm3cWs25LJZtEDWicePIsLPOGxae2F5tC2IfGTh9BWl'

export default {
  setToken (token) {
    api.request({
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  },

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
  },
  getUserProducts () {
    return api.get('user/products/')
  },
  initUserInfo (firstName, lastName, email, password) {
    return api.post('users/',
      {
        username: email,
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password
      })
  },
  initUserProfile (userId) {
    return api.post('profiles/',
      {
        user: userId,
        avatar: null,
        phone_number: null
      })
  },
  initUserLocation (userId) {
    return api.post('locations/',
      {
        user: userId
      })
  },
  initUserShowcase (userId) {
    return api.post('showcases/',
      {
        user: userId
      })
  },
  updateUserInfo (userInfo) {
    return api.patch('user/', userInfo)
  },
  updateUserProfile (userProfile) {
    return api.patch('user/profile/', userProfile)
  },
  updateUserLocation (userLocation) {
    return api.patch('user/location/', userLocation)
  }
}
