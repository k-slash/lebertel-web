import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import showcase from '@/store/modules/showcase'
import { Toast } from 'buefy'
import User from '@/store/api/user'
import api from '@/store/api'

Vue.use(Vuex)

const state = {
  error: null,
  token: null,
  loginEmail: null,
  loginPassword: null,
  registerFirstName: null,
  registerLastName: null,
  registerEmail: null,
  registerPassword: null
}

const mutations = {
  SET_ERROR: function (state, data) {
    user.state.error = data
  },
  SET_TOKEN: function (state, data) {
    state.token = data
    localStorage.setItem('id_token', data)
    api.defaults.headers.common['Authorization'] = 'Bearer ' + data
  },
  SET_LOGIN_EMAIL: function (state, data) {
    state.loginEmail = data
  },
  SET_LOGIN_PASSWORD: function (state, data) {
    state.loginPassword = data
  },
  SET_REGISTER_FIRSTNAME: function (state, data) {
    state.registerFirstName = data
  },
  SET_REGISTER_LASTNAME: function (state, data) {
    state.registerLastName = data
  },
  SET_REGISTER_EMAIL: function (state, data) {
    state.registerEmail = data
  },
  SET_REGISTER_PASSWORD: function (state, data) {
    state.registerPassword = data
  }
}

const getters = {
  token: state => state.token,
  loginEmail: state => state.loginEmail,
  loginPassword: state => state.loginPassword,
  registerFirstName: state => state.registerFirstName,
  registerLastName: state => state.registerLastName,
  registerEmail: state => state.registerEmail,
  registerPassword: state => state.registerPassword
}

const actions = {
  async check (store) {
    const token = localStorage.getItem('id_token')
    if (token != null) {
      try {
        await store.commit('SET_TOKEN', token)
        const userInfo = await User.getUserInfo()
        await store.commit('SET_USER_AUTHENTICATED', true)
        await store.commit('SET_USER_INFO', userInfo.data)
        const userProfile = await User.getUserProfile()
        await store.commit('SET_USER_PROFILE', userProfile.data)
        const userLocation = await User.getUserLocation()
        await store.commit('SET_USER_ADDRESS', userLocation.data)
        const userShowcase = await User.getUserShowcase()
        await store.commit('SET_USER_SHOWCASE', userShowcase.data)
        await store.commit('SET_ERROR', false)
      } catch (e) {
        console.log(e)
        localStorage.removeItem('id_token')
        localStorage.removeItem('authenticated')
        store.commit('SET_USER_AUTHENTICATED', false)
        store.commit('SET_USER_INFO', [])
        store.commit('SET_USER_ADDRESS', [])
        store.commit('SET_USER_SHOWCASE', [])
      }
    } else {
      localStorage.removeItem('id_token')
      localStorage.removeItem('authenticated')
      store.commit('SET_USER_AUTHENTICATED', false)
      store.commit('SET_USER_INFO', [])
      store.commit('SET_USER_ADDRESS', [])
      store.commit('SET_USER_SHOWCASE', [])
      store.commit('SET_ERROR', true)
    }
  },

  async register (store) {
    try {
      console.log(store.state.registerFirstName)
      console.log(store.state.registerEmail)
      const userInfo = await User.initUserInfo(store.state.registerFirstName, store.state.registerLastName, store.state.registerEmail, store.state.registerPassword)
      console.log(userInfo)
      let userId = userInfo.data.id
      // connect user to get the token
      const connect = await User.connectUser(store.state.registerEmail, store.state.registerPassword)
      if (connect.data.access_token != null) {
        try {
          await store.commit('SET_TOKEN', connect.data.access_token)
        } catch (e) {
          Toast.open({
            message: 'Oups ! Il y a eu un problème lors de la sauvegarde',
            type: 'is-danger'
          })
          store.commit('SET_ERROR', true)
        }
      }
      await User.initUserProfile(userId)
      await User.initUserLocation(userId)
      await User.initUserShowcase(userId)
      Toast.open({
        message: 'Votre compte a été créé. Vous pouvez maintenant vous authentifier',
        type: 'is-success'
      })
      store.commit('SET_ERROR', false)
    } catch (e) {
      console.log(e)
      Toast.open({
        message: 'Oups ! Il y a eu un problème lors de la création de votre compte. Merci de vérifier les champs éronnés',
        type: 'is-danger'
      })
      store.commit('SET_ERROR', true)
    }
  },

  async login (store) {
    const connect = await User.connectUser(store.state.loginEmail, store.state.loginPassword)
    if (connect.data.access_token != null) {
      try {
        await store.commit('SET_TOKEN', connect.data.access_token)
        api.defaults.headers.common['Authorization'] = 'Bearer ' + connect.data.access_token
        const userInfo = await User.getUserInfo()
        await store.commit('SET_USER_AUTHENTICATED', true)
        await store.commit('SET_USER_INFO', userInfo.data)
        const userProfile = await User.getUserProfile()
        await store.commit('SET_USER_PROFILE', userProfile.data)
        const userLocation = await User.getUserLocation()
        await store.commit('SET_USER_ADDRESS', userLocation.data)
        const userShowcase = await User.getUserShowcase()
        await store.commit('SET_USER_SHOWCASE', userShowcase.data)
        await store.commit('SET_ERROR', false)
      } catch (e) {
        console.log(e)
        Toast.open({
          message: 'Il y a eu un problème lors du chargement de vos données',
          type: 'is-danger'
        })
      }
    } else {
      Toast.open({
        message: 'Il y a eu un problème, vous ne pouvez vous connecter avec ces identifiants',
        type: 'is-danger'
      })
      store.commit('SET_ERROR', true)
    }
  },

  async logout (store) {
    localStorage.removeItem('id_token')
    localStorage.removeItem('authenticated')
    await store.commit('SET_USER_AUTHENTICATED', false)
    await store.commit('SET_TOKEN', null)
    await store.commit('SET_USER_INFO', [])
    await store.commit('SET_USER_ADDRESS', [])
    await store.commit('SET_USER_PROFILE', [])
    await store.commit('SET_USER_SHOWCASE', [])
    console.log(localStorage.getItem('id_token'))
  }
}

const store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions,
  modules: {
    user,
    showcase
  }
})

export default store
