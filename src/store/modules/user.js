import { Toast } from 'buefy'
import User from '@/store/api/user'

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
      user: null,
      phone_number: null,
      avatar: null
    },
    address: {
      user: null,
      address: null,
      poscode: null,
      city: null,
      location: null
    },
    showcase: null,
    products: null,
    product: null
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
  SET_USER_AUTHENTICATED: function (state, data) {
    localStorage.setItem('authenticated', data)
    state.user.authenticated = data
  },
  SET_USERNAME: function (state, data) {
    state.user.info.username = data
  },
  SET_AVATAR: function (state, data) {
    state.file = data
    state.avatar_changed = true
  },
  SET_LOCATION: function (state, data) {
    state.user.address.location = data
  },
  SET_USER_SHOWCASE: function (state, data) {
    state.user.showcase = data
  },
  SET_USER_SHOWCASE_LOCATION: function (state, data) {
    state.user.showcase.location = data
  },
  SET_USER_SHOWCASE_IMAGES: function (state, data) {
    state.user.showcase.images = data
  }
}

// actions to update user profile
const actions = {
  async updateProfile ({ commit, state }, form) {
    await User.updateUserInfo(state.user.info)
    await User.updateUserProfile(form)
    try {
      const userProfile = await User.getUserProfile()
      commit('SET_USER_PROFILE', userProfile.data)
      Toast.open({
        message: 'Ok ! C\'est sauvegardé',
        type: 'is-success'
      })
    } catch (e) {
      console.log(e)
      commit('SET_USER_PROFILE', [])
      Toast.open({
        message: 'Oups ! Il y a eu un problème lors de la sauvegarde',
        type: 'is-danger'
      })
    }
  },

  async updateProfileAddress ({ commit, state }, form) {
    try {
      await User.updateUserLocation(form)
      const userLocation = await User.getUserLocation()
      commit('SET_USER_ADDRESS', userLocation.data)
      Toast.open({
        message: 'Ok ! C\'est sauvegardé',
        type: 'is-success'
      })
    } catch (e) {
      console.log(e)
      Toast.open({
        message: 'Oups ! Il y a eu un problème lors de la sauvegarde',
        type: 'is-danger'
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
