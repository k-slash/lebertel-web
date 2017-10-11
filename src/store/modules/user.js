import { Toast } from 'buefy'
import axios from 'axios'

const API_URL = 'http://localhost:8000/'
const token = localStorage.getItem('id_token')

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: 'Bearer ' + token
  }
})

// state
const state = {
  user: {
    authenticated: false,
    info: {
      id: null,
      username: null,
      first_name: null,
      last_name: null,
      email: null
    },
    profile: {
      phone_number: null,
      avatar: null
    },
    address: {
      address: null,
      poscode: null,
      city: null,
      location: null
    }
  },
  avatar_changed: false,
  file: null
}

// getters
const getters = {
  user: state => state.user,
  authenticated: state => state.user.authenticated,
  info: state => state.user.info,
  profile: state => state.user.profile,
  id: state => state.user.info.id,
  username: state => state.user.info.username,
  firstName: state => state.user.info.first_name,
  lastName: state => state.user.info.last_name,
  email: state => state.user.info.email,
  phone: state => state.user.profile.phone_number,
  avatar: state => state.user.profile.avatar,
  file: state => state.file,
  address: state => state.user.address.address,
  postcode: state => state.user.address.postcode,
  city: state => state.user.address.city,
  location: state => state.user.address.location
}

// mutations
const mutations = {
  SET_USER_INFO: function (state, data) {
    state.user.info = data
  },
  SET_USER_PROFILE: function (state, data) {
    state.user.profile = data
  },
  SET_USER_ADDRESS: function (state, data) {
    state.user.address = data
  },
  SET_USER_SHOWCASE: function (state, data) {
    state.user.showcase = data
  },
  SET_USER_AUTHENTICATED: function (state, data) {
    localStorage.setItem('authenticated', data)
    state.user.authenticated = data
  },
  SET_USERNAME: function (state, data) {
    state.user.info.username = data
  },
  SET_FIRSTNAME: function (state, data) {
    state.user.info.first_name = data
  },
  SET_LASTNAME: function (state, data) {
    state.user.info.last_name = data
  },
  SET_PHONE: function (state, data) {
    state.user.profile.phone = data
  },
  SET_AVATAR: function (state, data) {
    state.file = data
    state.avatar_changed = true
  },
  SET_ADDRESS: function (state, data) {
    state.user.address.address = data
  },
  SET_POSTCODE: function (state, data) {
    state.user.address.postcode = data
  },
  SET_CITY: function (state, data) {
    state.user.address.city = data
  },
  SET_LOCATION: function (state, data) {
    state.user.address.location = data
  }
}

// actions to update user profile
const actions = {
  updateProfile (store) {
    var formDataProfile = new FormData()
    formDataProfile.append('user', store.state.user.info.id)
    if (store.state.avatar_changed) {
      formDataProfile.append('avatar', store.state.file)
    }
    formDataProfile.append('phone_number', store.state.user.profile.phone_number)
    api.patch('user/', store.state.user.info)
      .then(response => {
        if (store.state.user.profile.length === 0) {
          console.log(api.defaults.headers)
          console.log(store.state.user.info.id)
          console.log(store.state.user.profile.phone_number)
          console.log(store.state.file)
          console.log(formDataProfile)
          api.post('userProfiles/', formDataProfile)
            .then(response => {
              Toast.open({
                message: 'Ok ! C\'est sauvegardé',
                type: 'is-success'
              })
            }, response => {
              console.log(response)
              Toast.open({
                message: 'Oups ! Il y a eu un problème lors de la sauvegarde',
                type: 'is-danger'
              })
            })
        } else {
          api.patch('user/profile/', formDataProfile)
            .then(response => {
              api.get('user/profile')
                .then(response => {
                  store.commit('SET_USER_PROFILE', response.data)
                }, response => {
                  store.commit('SET_USER_PROFILE', [])
                })
              Toast.open({
                message: 'Ok ! C\'est sauvegardé',
                type: 'is-success'
              })
            }, response => {
              console.log(response)
              Toast.open({
                message: 'Oups ! Il y a eu un problème lors de la sauvegarde',
                type: 'is-danger'
              })
            })
        }
      }, response => {
        Toast.open({
          message: 'Oups ! Il y a eu un problème lors de la sauvegarde',
          type: 'is-danger'
        })
      }
    )
  },

  updateProfileAddress (store) {
    if (store.state.user.address.length === 0) {
      api.post('userLocations/', store.state.user.address)
        .then(response => {
          // this.check()
          Toast.open({
            message: 'Ok ! C\'est sauvegardé',
            type: 'is-success'
          })
        }, response => {
          Toast.open({
            message: 'Oups ! Il y a eu un problème lors de la sauvegarde',
            type: 'is-danger'
          })
        })
    } else {
      console.log(store.state.user.address.address)
      api.patch('user/location/', store.state.user.address)
        .then(response => {
          // this.check()
          Toast.open({
            message: 'Ok ! C\'est sauvegardé',
            type: 'is-success'
          })
        }, response => {
          Toast.open({
            message: 'Oups ! Il y a eu un problème lors de la sauvegarde',
            type: 'is-danger'
          })
        })
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
