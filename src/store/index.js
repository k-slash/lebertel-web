import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import showcase from '@/store/modules/showcase'
import product from '@/store/modules/product'
import { Toast } from 'buefy'
import UserApi from '@/store/api/user'
import ShowcaseApi from '@/store/api/showcase'
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
    api.defaults.headers.common['Authorization'] = 'Bearer ' + data
  }
}

const getters = {
  token: state => state.token
}

const actions = {
  async check (store) {
    const token = localStorage.getItem('id_token')
    console.log(token)
    if (token != null) {
      try {
        await store.commit('SET_TOKEN', token)
        const userInfo = await UserApi.getUserInfo()
        await store.commit('SET_USER_AUTHENTICATED', true)
        await store.commit('SET_USER_INFO', userInfo.data)
        const userProfile = await UserApi.getUserProfile()
        await store.commit('SET_USER_PROFILE', userProfile.data)
        const userLocation = await UserApi.getUserLocation()
        await store.commit('SET_USER_ADDRESS', userLocation.data)
        const userShowcase = await UserApi.getUserShowcase()
        await store.commit('SET_USER_SHOWCASE', userShowcase.data)
        const showcaseImages = await ShowcaseApi.getShowcaseImages(userShowcase.data.user)
        await store.commit('SET_USER_SHOWCASE_IMAGES', showcaseImages.data)
        const userProducts = await UserApi.getUserProducts()
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
      const userInfo = await UserApi.initUserInfo(data['firstName'], data['lastName'], data['email'], data['password'])
      let userId = userInfo.data.id
      // connect user to get the token
      const connect = await UserApi.connectUser(data['email'], data['password'])
      if (connect.data.access_token != null) {
        try {
          await commit('SET_TOKEN', connect.data.access_token)
          console.log(api.defaults.headers.common['Authorization'])
          if (state.token === connect.data.access_token) {
            await UserApi.initUserProfile(userId, data['pro'])
            await UserApi.initUserLocation(userId)
            await UserApi.initUserShowcase(userId, data['name'])
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
    const connect = await UserApi.connectUser(data['email'], data['password'])
    console.log(connect.data.access_token)
    if (connect.data.access_token != null) {
      try {
        await commit('SET_TOKEN', connect.data.access_token)
        await UserApi.setToken(connect.data.access_token)
        if (state.token === connect.data.access_token) {
          const userInfo = await UserApi.getUserInfo()
          await commit('SET_USER_AUTHENTICATED', true)
          await commit('SET_USER_INFO', userInfo.data)
          const userProfile = await UserApi.getUserProfile()
          await commit('SET_USER_PROFILE', userProfile.data)
          const userLocation = await UserApi.getUserLocation()
          await commit('SET_USER_ADDRESS', userLocation.data)
          const userShowcase = await UserApi.getUserShowcase()
          await commit('SET_USER_SHOWCASE', userShowcase.data)
          const showcaseImages = await ShowcaseApi.getShowcaseImages(userShowcase.data.user)
          await commit('SET_USER_SHOWCASE_IMAGES', showcaseImages.data)
          const userProducts = await UserApi.getUserProducts()
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
  }
})

export default store
