import { Toast } from 'buefy'
import Showcase from '@/store/api/showcase'
import router from '@/router'

// state
const state = {
  showcase: {
    id: null,
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
  SET_USER_SHOWCASE: function (state, data) {
    state.showcase = data
  },
  SET_SHOWCASE_ID: function (state, data) {
    state.showcase.id = data
  },
  SET_SHOWCASE_NAME: function (state, data) {
    state.showcase.name = data
  },
  SET_SHOWCASE_PRESENTATION: function (state, data) {
    state.showcase.presentation = data
  },
  SET_SHOWCASE_EMAIL: function (state, data) {
    state.showcase.email = data
  },
  SET_SHOWCASE_PHONE: function (state, data) {
    state.showcase.phone = data
  },
  SET_SHOWCASE_FACEBOOK: function (state, data) {
    state.showcase.facebook = data
  },
  SET_SHOWCASE_LINKEDIN: function (state, data) {
    state.showcase.linkedin = data
  },
  SET_SHOWCASE_TWITTER: function (state, data) {
    state.showcase.twitter = data
  },
  SET_SHOWCASE_PINTEREST: function (state, data) {
    state.showcase.pinterest = data
  },
  SET_SHOWCASE_ADDRESS: function (state, data) {
    state.showcase.address = data
  },
  SET_SHOWCASE_CITY: function (state, data) {
    state.showcase.city = data
  },
  SET_SHOWCASE_POSTCODE: function (state, data) {
    state.showcase.postcode = data
  },
  SET_SHOWCASE_LOCATION: function (state, data) {
    state.showcase.location = data
  },
  SET_SHOWCASE_COUNTRY: function (state, data) {
    state.showcase.country = data
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
  async updateShowcasePresentation (store) {
    try {
      var formDataShowcase = new FormData()
      formDataShowcase.append('id', store.state.showcase.id)
      formDataShowcase.append('name', store.state.showcase.name)
      formDataShowcase.append('presentation', store.state.showcase.presentation)
      if (store.state.logoChanged) {
        formDataShowcase.append('logo', store.state.fileLogo)
      }
      await Showcase.updateShowcase(formDataShowcase)
      const showcase = await Showcase.getShowcase()
      store.commit('SET_USER_SHOWCASE', showcase.data)
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
      formDataShowcase.append('id', store.state.showcase.id)
      formDataShowcase.append('address', store.state.showcase.address)
      formDataShowcase.append('postcode', store.state.showcase.postcode)
      formDataShowcase.append('city', store.state.showcase.city)
      formDataShowcase.append('location', store.state.showcase.location)
      formDataShowcase.append('country', 'RE')
      await Showcase.updateShowcase(formDataShowcase)
      const showcase = await Showcase.getShowcase()
      store.commit('SET_USER_SHOWCASE', showcase.data)
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
      formDataShowcase.append('id', store.state.showcase.id)
      formDataShowcase.append('email', store.state.showcase.email)
      formDataShowcase.append('phone_number', store.state.showcase.phone_number)
      formDataShowcase.append('facebook', store.state.showcase.facebook)
      formDataShowcase.append('linkedin', store.state.showcase.linkedin)
      formDataShowcase.append('twitter', store.state.showcase.twitter)
      formDataShowcase.append('pinterest', store.state.showcase.pinterest)
      await Showcase.updateShowcase(formDataShowcase)
      const showcase = await Showcase.getShowcase()
      store.commit('SET_USER_SHOWCASE', showcase.data)
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
      formDataShowcase.append('id', store.state.showcase.id)
      formDataShowcase.append('timetable', store.state.showcase.timetable)
      await Showcase.updateShowcase(formDataShowcase)
      const showcase = await Showcase.getShowcase()
      store.commit('SET_USER_SHOWCASE', showcase.data)
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
      formDataShowcase.append('id', store.state.showcase.id)
      formDataShowcase.append('informations', store.state.showcase.informations)
      await Showcase.updateShowcase(formDataShowcase)
      const showcase = await Showcase.getShowcase()
      store.commit('SET_USER_SHOWCASE', showcase.data)
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
