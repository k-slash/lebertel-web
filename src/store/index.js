import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import showcase from '@/store/modules/showcase'
import product from '@/store/modules/product'
import { Toast } from 'buefy'
import User from '@/store/api/user'
import Showcase from '@/store/api/showcase'
import api from '@/store/api'

Vue.use(Vuex)

const state = {
  error: null,
  token: null
}

const mutations = {
  SET_ERROR: function (state, data) {
    user.state.error = data
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
        const showcaseImages = await Showcase.getShowcaseImages(userShowcase.data.id)
        await store.commit('SET_SHOWCASE_IMAGES', showcaseImages.data)
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
        store.commit('SET_SHOWCASE_IMAGES', [])
        store.commit('SET_USER_PRODUCTS', [])
        store.commit('SET_ERROR', true)
      }
    } else {
      localStorage.removeItem('id_token')
      localStorage.removeItem('authenticated')
      store.commit('SET_USER_AUTHENTICATED', false)
      store.commit('SET_USER_INFO', [])
      store.commit('SET_USER_ADDRESS', [])
      store.commit('SET_USER_SHOWCASE', [])
      store.commit('SET_SHOWCASE_IMAGES', [])
      store.commit('SET_USER_PRODUCTS', [])
      store.commit('SET_ERROR', true)
    }
  },

  async register ({ commit, state }, data) {
    try {
      const userInfo = await User.initUserInfo(data['firstName'], data['lastName'], data['email'], data['password'])
      console.log(userInfo)
      let userId = userInfo.data.id
      // connect user to get the token
      const connect = await User.connectUser(data['email'], data['password'])
      if (connect.data.access_token != null) {
        try {
          await commit('SET_TOKEN', connect.data.access_token)
        } catch (e) {
          Toast.open({
            message: 'Oups ! Il y a eu un problème lors de la sauvegarde',
            type: 'is-danger'
          })
          commit('SET_ERROR', true)
        }
      }
      await User.initUserProfile(userId)
      await User.initUserLocation(userId)
      await User.initUserShowcase(userId)
      Toast.open({
        message: 'Votre compte a été créé. Vous pouvez maintenant vous authentifier',
        type: 'is-success'
      })
      commit('SET_ERROR', false)
    } catch (e) {
      console.log(e)
      Toast.open({
        message: 'Oups ! Il y a eu un problème lors de la création de votre compte. Merci de vérifier les champs éronnés',
        type: 'is-danger'
      })
      commit('SET_ERROR', true)
    }
  },

  async login ({ commit, state }, data) {
    const connect = await User.connectUser(data['email'], data['password'])
    if (connect.data.access_token != null) {
      try {
        await commit('SET_TOKEN', connect.data.access_token)
        const userInfo = await User.getUserInfo()
        await commit('SET_USER_AUTHENTICATED', true)
        await commit('SET_USER_INFO', userInfo.data)
        const userProfile = await User.getUserProfile()
        await commit('SET_USER_PROFILE', userProfile.data)
        const userLocation = await User.getUserLocation()
        await commit('SET_USER_ADDRESS', userLocation.data)
        const userShowcase = await User.getUserShowcase()
        await commit('SET_USER_SHOWCASE', userShowcase.data)
        const showcaseImages = await Showcase.getShowcaseImages(userShowcase.data.id)
        await commit('SET_SHOWCASE_IMAGES', showcaseImages.data)
        const userProducts = await User.getUserProducts()
        await commit('SET_USER_PRODUCTS', userProducts.data)
        await commit('SET_ERROR', false)
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
