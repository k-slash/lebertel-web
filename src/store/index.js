import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import * as createPersistedState from 'vuex-persistedstate'
import { Toast } from 'buefy'

Vue.use(Vuex)

const API_URL = 'http://localhost:8000/'
const CLIENT_ID = '3WoLnGo8YKjrNwZmJpQjDKYJJTRAamMLbpQnBl5U'
const CLIENT_SECRET = 'x98x6lzSoI6zQRoDnbDKKGup6whNpCIGNb87z5FvLAUDXjAaYzz4PRkW6c4agP58HuajVnmSK49I3ADcBCaoPsm3cWs25LJZtEDWicePIsLPOGxae2F5tC2IfGTh9BWl'
const token = localStorage.getItem('id_token')
// const plugins = []

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: 'Bearer ' + token
  }
})

const state = {
  user: {
    authenticated: false,
    info: [],
    profile: [],
    address: [],
    showcase: []
  },
  token: null,
  email: null,
  password: null,
  firstName: null,
  lastName: null,
  phone: null,
  address: null,
  postcode: null,
  city: null,
  coordinates: null,
  showcase: {
    id: null,
    email: null,
    phone: null,
    facebook: null,
    linkedin: null,
    twitter: null,
    pinterest: null,
    image: null,
    displayOrder: null,
    address: null,
    city: null,
    postcode: null,
    location: null,
    country: null
  }
}

const mutations = {
  SET_USER_AUTHENTICATED: function (state, data) {
    state.user.authenticated = data
  },
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
  SET_TOKEN: function (state, data) {
    state.token = data
    localStorage.setItem('id_token', data)
    api.defaults.headers.common['Authorization'] = 'Bearer ' + data
    // Cookies.set('id_token', data)
  },
  SET_EMAIL: function (state, data) {
    state.email = data
  },
  SET_PASSWORD: function (state, data) {
    state.password = data
  }
}

const getters = {
  user: state => state.user,
  token: state => state.token,
  email: state => state.email,
  password: state => state.password
}

const actions = {
  check (store) {
    console.log(store.state.user.info.first_name)
    if (token !== null) {
      try {
        api.get('user/')
          .then(response => {
            store.commit('SET_USER_AUTHENTICATED', true)
            store.commit('SET_USER_INFO', response.data)
          })
          .catch(e => {
            store.commit('SET_USER_AUTHENTICATED', false)
            store.commit('SET_USER_INFO', [])
            console.log('Info: ', e)
          })
      } catch (e) {
        if (e) console.log('Error: ', e)
      }
    }
  },

  login (store) {
    let redirect = false
    api.post('o/token/' + '?grant_type=password&username=' + store.state.email + '&password=' + store.state.password + '&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET)
      .then(response => {
        store.commit('SET_TOKEN', response.data.access_token)
        api.get('user/')
          .then(response => {
            store.commit('SET_USER_AUTHENTICATED', true)
            store.commit('SET_USER_INFO', response.data)

            api.get('user/location')
              .then(response => {
                store.commit('SET_USER_ADDRESS', response.data)
              }, response => {
                store.commit('SET_USER_ADDRESS', [])
              })

            api.get('user/profile')
              .then(response => {
                store.commit('SET_USER_PROFILE', response.data)
              }, response => {
                store.commit('SET_USER_PROFILE', [])
              })

            api.get('user/showcase')
              .then(response => {
                store.commit('SET_USER_SHOWCASE', response.data)
              }, response => {
                store.commit('SET_USER_SHOWCASE', [])
              })
          }, response => {
            console.log('Nok')
            Toast.open({
              message: 'Il y a eu un problème lors du chargement de vos données',
              type: 'is-danger'
            })
          })
        redirect = true
      }, response => {
        console.log('nok')
        Toast.open({
          message: 'Il y a eu un problème, vous ne pouvez vous connecter avec ces identifiants',
          type: 'is-danger'
        })
      })
    return redirect
  },

  updateProfile (context, formData, formDataProfile) {
    console.log(context)
    console.log(formData)
    console.log(formDataProfile)
    /** Vue.http.patch(
      API_URL + 'user/', formData
    ).then(response => {
      if (this.user.profile.length === 0) {
        console.log(formDataProfile)
        Vue.http.post(
          API_URL + 'userProfiles/', formDataProfile
        ).then(response => {
          this.check()
          context.$toast.open({
            message: 'Ok ! C\'est sauvegardé',
            type: 'is-success'
          })
          context.error = false
        }, response => {
          context.$toast.open({
            message: 'Oups ! Il y a eu un problème lors de la sauvegarde',
            type: 'is-danger'
          })
          context.error = true
        })
      } else {
        Vue.http.patch(
          API_URL + 'user/profile/', formDataProfile
        ).then(response => {
          this.check()
          context.$toast.open({
            message: 'Ok ! C\'est sauvegardé',
            type: 'is-success'
          })
          context.error = false
        }, response => {
          context.$toast.open({
            message: 'Oups ! Il y a eu un problème lors de la sauvegarde',
            type: 'is-danger'
          })
          context.error = true
        })
      }
    }, response => {
      context.error = true
    }) **/
  }
}

const store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions
})

export default store
