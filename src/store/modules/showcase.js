import { Toast } from 'buefy'
import Showcase from '@/store/api/showcase'
import router from '@/router'

// state
const state = {
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
  showcase: state => state.showcase
}

// mutations
const mutations = {
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

  async updateShowcasePresentation (store) {
    try {
      var formDataShowcase = new FormData()
      formDataShowcase.append('name', store.state.showcase.name)
      formDataShowcase.append('presentation', store.state.showcase.presentation)
      if (store.state.logoChanged) {
        formDataShowcase.append('logo', store.state.fileLogo)
      }
      await Showcase.updateShowcase(formDataShowcase)
      const showcase = await Showcase.getShowcase()
      store.commit('SET_SHOWCASE', showcase.data)
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
  },

  async updateShowcaseLocation (store) {
    try {
      var formDataShowcase = new FormData()
      formDataShowcase.append('address', store.state.showcase.address)
      formDataShowcase.append('postcode', store.state.showcase.postcode)
      formDataShowcase.append('city', store.state.showcase.city)
      formDataShowcase.append('location', store.state.showcase.location)
      formDataShowcase.append('country', 'RE')
      await Showcase.updateShowcase(formDataShowcase)
      const showcase = await Showcase.getShowcase()
      store.commit('SET_SHOWCASE', showcase.data)
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
  },

  async updateShowcaseContact (store) {
    try {
      var formDataShowcase = new FormData()
      formDataShowcase.append('email', store.state.showcase.email)
      formDataShowcase.append('phone_number', store.state.showcase.phone_number)
      formDataShowcase.append('facebook', store.state.showcase.facebook)
      formDataShowcase.append('linkedin', store.state.showcase.linkedin)
      formDataShowcase.append('twitter', store.state.showcase.twitter)
      formDataShowcase.append('pinterest', store.state.showcase.pinterest)
      await Showcase.updateShowcase(formDataShowcase)
      const showcase = await Showcase.getShowcase()
      store.commit('SET_SHOWCASE', showcase.data)
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
  },

  async updateShowcaseTimetable (store) {
    try {
      var formDataShowcase = new FormData()
      formDataShowcase.append('timetable', store.state.showcase.timetable)
      await Showcase.updateShowcase(formDataShowcase)
      const showcase = await Showcase.getShowcase()
      store.commit('SET_SHOWCASE', showcase.data)
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
  },

  async updateShowcaseMoreInfo (store) {
    try {
      var formDataShowcase = new FormData()
      formDataShowcase.append('informations', store.state.showcase.informations)
      await Showcase.updateShowcase(formDataShowcase)
      const showcase = await Showcase.getShowcase()
      store.commit('SET_SHOWCASE', showcase.data)
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
  },

  async addShowcaseImages ({ commit, state }, id) {
    try {
      var formData = new FormData()
      formData.append('showcase', id)
      formData.append('image', state.imageAdded.image)
      formData.append('display_order', state.imageAdded.display_order)
      await Showcase.addImage(formData)
      await commit('INIT_IMAGE_ADDED')
      Toast.open({
        message: 'Ok ! L\'image a été ajoutée',
        type: 'is-success'
      }).then(
        router.go(router.currentRoute)
      )
    } catch (e) {
      console.log(e)
      Toast.open({
        message: 'Oups ! Il y a eu un problème lors de la sauvegarde',
        type: 'is-danger'
      })
    }
  },

  async deleteShowcaseImage ({ commit, state }, id) {
    try {
      await Showcase.deleteImage(id)
      Toast.open({
        message: 'Ok ! L\'image a été supprimée',
        type: 'is-success'
      }).then(
        router.go(router.currentRoute)
      )
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
