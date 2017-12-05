import { Toast } from 'buefy'
import Showcase from '@/store/api/showcase'

// state
const state = {
  showcases: [],
  allShowcases: [],
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
    country: null
  },
  showcaseImages: [],
  imageAdded: {
    image: null,
    display_order: null
  },
  logoChanged: false,
  logoFile: null,
  showcasesCount: null
}

// getters
const getters = {
  showcases: state => state.showcases,
  allShowcases: state => state.allShowcases,
  showcasesCount: state => state.showcasesCount,
  showcase: state => state.showcase,
  showcaseImages: state => state.showcaseImages
}

// mutations
const mutations = {
  SET_SHOWCASES: function (state, data) {
    state.showcases = data
  },
  SET_SHOWCASES_COUNT: function (state, data) {
    state.showcasesCount = data
  },
  SET_ALL_SHOWCASES: function (state, data) {
    state.allShowcases = data
  },
  SET_SHOWCASE: function (state, data) {
    state.showcase = data
  },
  SET_SHOWCASE_LOCATION: function (state, data) {
    state.showcase.location = data
  },
  SET_SHOWCASE_IMAGES: function (state, data) {
    state.showcaseImages = data
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
  async getAllShowcases ({ commit, state }) {
    try {
      const s = await Showcase.getAllShowcases()
      await commit('SET_ALL_SHOWCASES', s.data)
    } catch (e) {
      console.log(e)
      Toast.open({
        message: 'Oups ! Il y a eu un problème lors du chargement des vitrines',
        type: 'is-danger'
      })
    }
  },

  async getListShowcases ({ commit, state }, p) {
    try {
      let s = null
      if (p != null) {
        s = await Showcase.getListShowcases(p)
      } else {
        s = await Showcase.getListShowcases()
      }
      await commit('SET_SHOWCASES', s.data.results)
      await commit('SET_SHOWCASES_COUNT', s.data.count)
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
