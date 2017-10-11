import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import showcase from '@/store/modules/showcase'
import axios from 'axios'
import { Toast } from 'buefy'
import User from '@/store/api/user'

Vue.use(Vuex)

const API_URL = 'http://localhost:8000/'
// const CLIENT_ID = '3WoLnGo8YKjrNwZmJpQjDKYJJTRAamMLbpQnBl5U'
// const CLIENT_SECRET = 'x98x6lzSoI6zQRoDnbDKKGup6whNpCIGNb87z5FvLAUDXjAaYzz4PRkW6c4agP58HuajVnmSK49I3ADcBCaoPsm3cWs25LJZtEDWicePIsLPOGxae2F5tC2IfGTh9BWl'
const token = localStorage.getItem('id_token')
// const plugins = []

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: 'Bearer ' + token
  }
})

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
  check (store) {
    if (token !== null) {
      console.log(token)
      store.commit('SET_TOKEN', token)
      api.get('user/')
        .then(response => {
          store.commit('SET_USER_AUTHENTICATED', true)
          console.log(response.data)
          store.commit('SET_USER_INFO', response.data)
          console.log(store.state.user.user.authenticated)
          api.get('user/location/')
            .then(response => {
              store.commit('SET_USER_ADDRESS', response.data)
            }, response => {
              console.log('no address')
              store.commit('SET_USER_ADDRESS', [])
            })

          api.get('user/profile/')
            .then(response => {
              store.commit('SET_USER_PROFILE', response.data)
            }, response => {
              store.commit('SET_USER_PROFILE', [])
            })

          api.get('user/showcase/')
            .then(response => {
              store.commit('SET_USER_SHOWCASE', response.data)
              api.get('showcases/' + store.state.user.showcase.id + '/images/')
                .then(response => {
                  store.commit('SET_SHOWCASE_IMAGES', response.data)
                }, response => {
                  store.commit('SET_SHOWCASE_IMAGES', [])
                })
            }, response => {
              store.commit('SET_USER_SHOWCASE', [])
            })
        },
        response => {
          localStorage.removeItem('id_token')
          localStorage.removeItem('authenticated')
          store.commit('SET_USER_AUTHENTICATED', false)
          store.commit('SET_USER_INFO', [])
          store.commit('SET_USER_ADDRESS', [])
          store.commit('SET_USER_SHOWCASE', [])
        }
      )
    }
  },

  register (store) {
    api.post('users/',
      {
        username: store.state.registerEmail,
        first_name: store.state.registerFirstName,
        last_name: store.state.registerLastName,
        email: store.state.registerEmail,
        password: store.state.registerPassword
      }
    ).then(response => {
      let userId = response.data.id
      console.log(userId)
      api.post('userProfiles/',
        {
          user: userId,
          avatar: null,
          phone_number: null
        })
      api.post('userLocations/',
        {
          user: userId
        })
      api.post('userShowcases/',
        {
          user: userId
        })
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
      Toast.open({
        message: 'Votre compte a été créé. Vous pouvez maintenant vous authentifier',
        type: 'is-success'
      })
      store.commit('SET_ERROR', false)
    }, response => {
      Toast.open({
        message: 'Oups ! Il y a eu un problème lors de la création de votre compte. Merci de vérifier les champs éronnés',
        type: 'is-danger'
      })
      store.commit('SET_ERROR', true)
    })
  },

  async login (store) {
    const connect = await User.connectUser(store.state.loginEmail, store.state.loginPassword)
    if (connect.data.access_token != null) {
      try {
        await store.commit('SET_TOKEN', connect.data.access_token)
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

  logout (store) {
    localStorage.removeItem('id_token')
    localStorage.removeItem('authenticated')
    store.commit('SET_USER_AUTHENTICATED', false)
    store.commit('SET_TOKEN', null)
    store.commit('SET_USER_INFO', [])
    store.commit('SET_USER_ADDRESS', [])
    store.commit('SET_USER_PROFILE', [])
    store.commit('SET_USER_SHOWCASE', [])
    console.log(store.token)
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
