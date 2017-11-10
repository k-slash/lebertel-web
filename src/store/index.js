import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import user from '@/store/modules/user'
import showcase from '@/store/modules/showcase'
import product from '@/store/modules/product'
import { Toast } from 'buefy'
import User from '@/store/api/user'
import Showcase from '@/store/api/showcase'
import api from '@/store/api'
import router from '@/router'

Vue.use(Vuex)

const state = {
  error: null,
  token: null
}

const mutations = {
  SET_ERROR: function (state, data) {
    state.error = data
  },
  SET_TOKEN: function (state, data) {
    state.token = data
    localStorage.setItem('id_token', data)
    Cookies.set('csrftoken', data, { expires: 3, secure: true })
    api.defaults.headers.common['Authorization'] = 'Bearer ' + data
    // api.defaults.headers.common['X-CSRF-TOKEN'] = 'Bearer ' + data
  }
}

const getters = {
  token: state => state.token
}

const actions = {
  async check (store) {
    const token = Cookies.get('csrftoken')
    // const token = localStorage.getItem('id_token')
    console.log(token)
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
        const showcaseImages = await Showcase.getShowcaseImages(userShowcase.data.user)
        await store.commit('SET_USER_SHOWCASE_IMAGES', showcaseImages.data)
        const userProducts = await User.getUserProducts()
        await store.commit('SET_USER_PRODUCTS', userProducts.data)
        await store.commit('SET_ERROR', false)
      } catch (e) {
        console.log(e)
        localStorage.removeItem('id_token')
        localStorage.removeItem('authenticated')
        store.commit('SET_USER_AUTHENTICATED', false)
        store.commit('SET_USER_INFO', [])
        store.commit('SET_USER_ADDRESS', [])
        store.commit('SET_USER_SHOWCASE', [])
        store.commit('SET_USER_SHOWCASE_IMAGES', [])
        store.commit('SET_USER_PRODUCTS', [])
        store.commit('SET_ERROR', true)
      }
    } else {
      // Cookies.remove('csrftoken')
      localStorage.removeItem('id_token')
      localStorage.removeItem('authenticated')
      store.commit('SET_USER_AUTHENTICATED', false)
      store.commit('SET_USER_INFO', [])
      store.commit('SET_USER_ADDRESS', [])
      store.commit('SET_SHOWCASE', [])
      store.commit('SET_SHOWCASE_IMAGES', [])
      store.commit('SET_USER_PRODUCTS', [])
      store.commit('SET_ERROR', true)
    }
  },

  async register ({ dispatch, commit, state }, data) {
    try {
      const userInfo = await User.initUserInfo(data['firstName'], data['lastName'], data['email'], data['password'])
      let userId = userInfo.data.id
      // connect user to get the token
      const connect = await User.connectUser(data['email'], data['password'])
      if (connect.data.access_token != null) {
        try {
          await commit('SET_TOKEN', connect.data.access_token)
          console.log(api.defaults.headers.common['Authorization'])
          if (state.token === connect.data.access_token) {
            await User.initUserProfile(userId, data['pro'])
            await User.initUserLocation(userId)
            await User.initUserShowcase(userId, data['name'])
            dispatch('login', data)
          }
        } catch (e) {
          console.log(e)
          Toast.open({
            message: 'Oups ! Il y a eu un problème lors de la sauvegarde',
            type: 'is-danger'
          })
          commit('SET_ERROR', true)
        }
      }
    } catch (e) {
      console.log(e)
      Toast.open({
        message: 'Oups ! Il y a eu un problème lors de la création de votre compte. Merci de vérifier les champs éronnés',
        type: 'is-danger'
      })
    }
  },

  async login ({ dispatch, commit, state }, data) {
    console.log(data)
    const connect = await User.connectUser(data['email'], data['password'])
    console.log(connect.data.access_token)
    if (connect.data.access_token != null) {
      try {
        await commit('SET_TOKEN', connect.data.access_token)
        await User.setToken(connect.data.access_token)
        if (state.token === connect.data.access_token) {
          const userInfo = await User.getUserInfo()
          await commit('SET_USER_AUTHENTICATED', true)
          await commit('SET_USER_INFO', userInfo.data)
          const userProfile = await User.getUserProfile()
          await commit('SET_USER_PROFILE', userProfile.data)
          const userLocation = await User.getUserLocation()
          await commit('SET_USER_ADDRESS', userLocation.data)
          const userShowcase = await User.getUserShowcase()
          await commit('SET_USER_SHOWCASE', userShowcase.data)
          const showcaseImages = await Showcase.getShowcaseImages(userShowcase.data.user)
          await commit('SET_USER_SHOWCASE_IMAGES', showcaseImages.data)
          const userProducts = await User.getUserProducts()
          await commit('SET_USER_PRODUCTS', userProducts.data)
          await commit('SET_ERROR', false)
        }
        router.push({
          name: 'dashboard.profile'
        })
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
    // Cookies.remove('csrftoken')
    localStorage.removeItem('id_token')
    localStorage.removeItem('authenticated')
    await store.commit('SET_USER_AUTHENTICATED', false)
    await store.commit('SET_TOKEN', null)
    await store.commit('SET_USER_INFO', [])
    await store.commit('SET_USER_ADDRESS', [])
    await store.commit('SET_USER_PROFILE', [])
    await store.commit('SET_SHOWCASE', [])
    await store.commit('SET_SHOWCASE_IMAGES', [])
    await store.commit('SET_USER_PRODUCTS', [])
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
    showcase,
    product
  },
  plugins: [createPersistedState({
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
      removeItem: key => Cookies.remove(key)
    }
  })]
})

export default store
