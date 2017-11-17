import { Toast } from 'buefy'
import Showcase from '@/store/api/showcase'

// state
const state = {
  showcases: [],
  showcase: {
    user: null,
    logo: null,
    name: null,
    presentation: null,
    email: null,
    phone: null,
    facebook: null,
    linkedin: null,
    twitter: null,
    pinterest: null,
    address: null,
    city: null,
    postcode: null,
    location: null,
    country: null,
    images: []
  },
  imageAdded: {
    image: null,
    display_order: null
  },
  logoChanged: false,
  logoFile: null
}

// getters
const getters = {
  showcases: state => state.showcases,
  showcase: state => state.showcase
}

// mutations
const mutations = {
  SET_SHOWCASES: function (state, data) {
    state.showcases = data
  },
  SET_SHOWCASE: function (state, data) {
    state.showcase = data
  },
  SET_SHOWCASE_LOCATION: function (state, data) {
    state.showcase.location = data
  },
  SET_SHOWCASE_IMAGES: function (state, data) {
    state.showcase.images = data
  },
  SET_LOGO: function (state, data) {
    state.fileLogo = data
    state.logoChanged = true
  },
  SET_IMAGE_ADDED: function (state, data) {
    state.imageAdded.image = data
  },
  SET_IMAGE_ADDED_DISPLAY_ORDER: function (state, data) {
    state.imageAdded.display_order = data
  },
  INIT_IMAGE_ADDED: function (state) {
    state.imageAdded.image = null
    state.imageAdded.display_order = null
  }
}

// actions
const actions = {

  async getListShowcases ({ commit, state }) {
    try {
      const s = await Showcase.getListShowcases()
      await commit('SET_SHOWCASES', s.data)
      console.log(state.showcases)
    } catch (e) {
      console.log(e)
      Toast.open({
        message: 'Oups ! Il y a eu un problème lors du chargement des vitrines',
        type: 'is-danger'
      })
    }
  },

  async getShowcase ({ commit, state }, id) {
    try {
      const s = await Showcase.get(id)
      await commit('SET_SHOWCASE', s.data)
      const images = await Showcase.getShowcaseImages(id)
      await commit('SET_SHOWCASE_IMAGES', images.data)
    } catch (e) {
      console.log(e)
      Toast.open({
        message: 'Oups ! Il y a eu un problème lors du chargement de la vitrine',
        type: 'is-danger'
      })
    }
  },

  async updateShowcase ({ commit, state }, form) {
    try {
      await Showcase.updateShowcase(form)
      const showcase = await Showcase.getShowcase()
      commit('SET_USER_SHOWCASE', showcase.data)
      Toast.open({
        message: 'Ok ! C\'est sauvegardé',
        type: 'is-success'
      })
    } catch (e) {
      Toast.open({
        message: 'Oups ! Il y a eu un problème lors de la sauvegarde',
        type: 'is-danger'
      })
    }
  },

  async addShowcaseImages ({ commit, state }, id) {
    try {
      const images = await Showcase.getShowcaseImages(id)
      await commit('SET_USER_SHOWCASE_IMAGES', images.data)
      /** Toast.open({
        message: 'Ok ! L\'image a été ajoutée',
        type: 'is-success'
      }) **/
    } catch (e) {
      console.log(e)
      Toast.open({
        message: 'Oups ! Il y a eu un problème lors de la sauvegarde',
        type: 'is-danger'
      })
    }
  },

  async deleteShowcaseImage ({ commit, state }, data) {
    try {
      await Showcase.deleteImage(data.id)
      const images = await Showcase.getShowcaseImages(data.showcaseId)
      await commit('SET_USER_SHOWCASE_IMAGES', images.data)
      Toast.open({
        message: 'Ok ! L\'image a été supprimée',
        type: 'is-success'
      })
    } catch (e) {
      console.log(e)
      Toast.open({
        message: 'Oups ! Il y a eu un problème lors de la suppression de l\'image',
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
