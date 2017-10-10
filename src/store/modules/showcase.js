import api from '@/store'
import { Toast } from 'buefy'

// state
const state = {
  user: {
    showcase: {
      id: null,
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
    }
  },
  showcaseImages: []
}

// getters
const getters = {
  showcaseId: state => state.user.showcase.id,
  showcaseName: state => state.user.showcase.name,
  showcasePresentation: state => state.user.showcase.presentation,
  showcaseEmail: state => state.user.showcase.email,
  showcasePhone: state => state.user.showcase.phone,
  showcaseFacebook: state => state.user.showcase.facebook,
  showcaseLinkedin: state => state.user.showcase.linkedin,
  showcaseTwitter: state => state.user.showcase.twitter,
  showcasePinterest: state => state.user.showcase.pinterest,
  showcaseAddress: state => state.user.showcase.address,
  showcaseCity: state => state.user.showcase.city,
  showcasePostcode: state => state.user.showcase.postcode,
  showcaseLocation: state => state.user.showcase.location,
  showcaseCountry: state => state.user.showcase.country,
  showcaseImages: state => state.showcaseImages
}

// mutations
const mutations = {
  SET_SHOWCASE_ID: function (state, data) {
    state.user.showcase.id = data
  },
  SET_SHOWCASE_NAME: function (state, data) {
    state.user.showcase.name = data
  },
  SET_SHOWCASE_PRESENTATION: function (state, data) {
    state.user.showcase.presentation = data
  },
  SET_SHOWCASE_EMAIL: function (state, data) {
    state.user.showcase.email = data
  },
  SET_SHOWCASE_PHONE: function (state, data) {
    state.user.showcase.phone = data
  },
  SET_SHOWCASE_FACEBOOK: function (state, data) {
    state.user.showcase.facebook = data
  },
  SET_SHOWCASE_LINKEDIN: function (state, data) {
    state.user.showcase.linkedin = data
  },
  SET_SHOWCASE_TWITTER: function (state, data) {
    state.user.showcase.twitter = data
  },
  SET_SHOWCASE_PINTEREST: function (state, data) {
    state.user.showcase.pinterest = data
  },
  SET_SHOWCASE_ADDRESS: function (state, data) {
    state.user.showcase.address = data
  },
  SET_SHOWCASE_CITY: function (state, data) {
    state.user.showcase.city = data
  },
  SET_SHOWCASE_POSTCODE: function (state, data) {
    state.user.showcase.postcode = data
  },
  SET_SHOWCASE_LOCATION: function (state, data) {
    state.user.showcase.location = data
  },
  SET_SHOWCASE_COUNTRY: function (state, data) {
    state.user.showcase.country = data
  },
  SET_SHOWCASE_IMAGES: function (state, data) {
    state.showcaseImages = data
  }
}

// actions
const actions = {
  updateShowcase (store, formData) {
    if (store.state.user.showcase.length === 0) {
      api.post('userShowcases/', formData)
        .then(response => {
          // store.check(store)
          Toast.open({
            message: 'Ok ! C\'est sauvegardé',
            type: 'is-success'
          })
        }, response => {
          Toast.open({
            message: 'Oups ! Il y a eu un problème lors de la sauvegarde',
            type: 'is-danger'
          })
        })
    } else {
      api.patch('user/showcase/', formData)
        .then(response => {
          // this.check()
          Toast.open({
            message: 'Ok ! C\'est sauvegardé',
            type: 'is-success'
          })
        }, response => {
          Toast.open({
            message: 'Oups ! Il y a eu un problème lors de la sauvegarde',
            type: 'is-danger'
          })
        })
    }
  },

  updateShowcaseImages (store) {
    api.post('showcases/images/', store.state.showcaseImages)
      .then(response => {
        // this.check()
        Toast.open({
          message: 'Ok ! C\'est sauvegardé',
          type: 'is-success'
        })
      }, response => {
        Toast.open({
          message: 'Oups ! Il y a eu un problème lors de la sauvegarde',
          type: 'is-danger'
        })
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
