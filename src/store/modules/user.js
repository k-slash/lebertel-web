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
  async updateProfile (store) {
    var formDataProfile = new FormData()
    formDataProfile.append('user', store.state.user.info.id)
    if (store.state.avatar_changed) {
      formDataProfile.append('avatar', store.state.file)
    }
    formDataProfile.append('phone_number', store.state.user.profile.phone_number)
    await User.updateUserInfo(store.state.user.info)
    await User.updateUserProfile(formDataProfile)
    try {
      const userProfile = await User.getUserProfile()
      store.commit('SET_USER_PROFILE', userProfile.data)
      Toast.open({
        message: 'Ok ! C\'est sauvegardé',
        type: 'is-success'
      })
    } catch (e) {
      console.log(e)
      store.commit('SET_USER_PROFILE', [])
      Toast.open({
        message: 'Oups ! Il y a eu un problème lors de la sauvegarde',
        type: 'is-danger'
      })
    }
  },

  async updateProfileAddress (store) {
    try {
      await User.updateUserLocation(store.state.user.address)
      const userLocation = await User.getUserLocation()
      store.commit('SET_USER_ADDRESS', userLocation.data)
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