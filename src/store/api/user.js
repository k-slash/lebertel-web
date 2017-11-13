import api from '@/store/api'
import conf from '@/conf'

export default {
  setToken (token) {
    api.request({
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  },
  get (id) {
    return api.get('users/' + id + '/')
  },
  connectUser (email, password) {
    return api.post('o/token/?grant_type=password&username=' + email + '&password=' + password + '&client_id=' + conf.CLIENT_ID + '&client_secret=' + conf.CLIENT_SECRET)
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
  initUserProfile (userId, pro) {
    return api.post('profiles/',
      {
        user: userId,
        pro: pro
      })
  },
  initUserLocation (userId) {
    // console.log(api.defaults.headers.common['Authorization'])
    return api.post('locations/',
      {
        user: userId
      })
  },
  initUserShowcase (userId, name) {
    return api.post('showcases/',
      {
        user: userId,
        name: name
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
  },
  updateUserShowcase (userShowcase) {
    return api.patch('user/showcase/', userShowcase)
  }
}
