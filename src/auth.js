import Vue from './main.js'
import router from '@/router/index.js'
// import createPersistedState from 'vuex-persistedstate'

const API_URL = 'http://localhost:8000/'
const TOKEN_URL = API_URL + 'o/token/'
const CLIENT_ID = '3WoLnGo8YKjrNwZmJpQjDKYJJTRAamMLbpQnBl5U'
const CLIENT_SECRET = 'x98x6lzSoI6zQRoDnbDKKGup6whNpCIGNb87z5FvLAUDXjAaYzz4PRkW6c4agP58HuajVnmSK49I3ADcBCaoPsm3cWs25LJZtEDWicePIsLPOGxae2F5tC2IfGTh9BWl'
const token = localStorage.getItem('id_token')
// const authenticated = localStorage.getItem('authenticated')

export default {
  user: {
    authenticated: false,
    info: [],
    profile: [],
    address: [],
    showcase: []
  },

  check () {
    if (token !== null) {
      Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')
      Vue.http.get(
        API_URL + 'user/',
      ).then(response => {
        this.user.authenticated = true
        this.user.info = response.data

        Vue.http.get(
          API_URL + 'user/location/',
        ).then(response => {
          this.user.address = response.data
        }, response => {
          this.user.address = []
        })

        Vue.http.get(
          API_URL + 'user/profile/',
        ).then(response => {
          this.user.profile = response.data
        }, response => {
          this.user.profile = []
        })

        Vue.http.get(
          API_URL + 'user/showcase/',
        ).then(response => {
          this.user.showcase = response.data
          Vue.http.get(
            API_URL + 'showcases/' + this.user.showcase.id + '/images/',
          ).then(response => {
            this.user.showcase.images = response.data
            console.log(this.user.showcase.images)
          }, response => {
            this.user.showcase.images = []
          })
        }, response => {
          this.user.showcase = []
        })
      },
      response => {
        localStorage.removeItem('id_token')
        localStorage.removeItem('authenticated')
        this.user.authenticated = false
        this.user.profile = []
        this.user.address = []
        this.user.showcase = []
      })
    }
  },

  register (context, firstName, lastName, email, password) {
    Vue.http.post(
      API_URL + 'users/',
      {
        username: email,
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password
      }
    ).then(response => {
      context.$toast.open({
        message: 'Votre compte a été créé. Vous pouvez maintenant vous authentifier',
        type: 'is-success'
      })
      context.success = true
    }, response => {
      context.$toast.open({
        message: 'Oups ! Il y a eu un problème lors de la création de votre compte. Merci de vérifier les champs éronnés',
        type: 'is-danger'
      })
      context.response = response.data
      context.error = true
    })
  },

  signin (context, email, password) {
    Vue.http.post(
      TOKEN_URL + '?grant_type=password&username=' + email + '&password=' + password + '&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET,
      {
        email: email,
        password: password
      }
    ).then(response => {
      context.error = false
      localStorage.setItem('id_token', response.body.access_token)
      Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')
      Vue.http.get(
        API_URL + 'user/'
      ).then(response => {
        this.user.authenticated = true
        this.user.info = response.data
        localStorage.setItem('authenticated', true)
        Vue.http.get(
          API_URL + 'user/location/'
        ).then(response => {
          this.user.address = response.data
        }, response => {
          this.user.address = []
        })

        Vue.http.get(
          API_URL + 'user/profile/',
        ).then(response => {
          this.user.profile = response.data
        }, response => {
          this.user.profile = []
        })

        Vue.http.get(API_URL + 'user/showcase/').then(response => {
          this.user.showcase = response.data
          router.push({
            name: 'dashboard.profile'
          })
        }, response => {
          this.user.showcase = []
        })
      }, response => {
        context.$toast.open({
          message: 'Il y a eu un problème lors du chargement de vos données',
          type: 'is-danger'
        })
        context.error = true
      })
    }, response => {
      context.$toast.open({
        message: 'Il y a eu un problème, vous ne pouvez vous connecter avec ces identifiants',
        type: 'is-danger'
      })
      context.error = true
    })
  },

  signout () {
    localStorage.removeItem('id_token')
    localStorage.removeItem('authenticated')
    this.user.authenticated = false
    this.user.info = []
    this.user.profile = []
    this.user.address = []
    this.user.showcase = []

    router.push({
      name: 'home'
    })
  },

  updateProfile (context, formData, formDataProfile) {
    Vue.http.patch(
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
    })
  },

  updateProfileAddress (context, formData) {
    if (this.user.address.length === 0) {
      Vue.http.post(
        API_URL + 'userLocations/', formData
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
        API_URL + 'user/location/', formData
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
  },

  updateShowcase (context, formData) {
    if (this.user.showcase.length === 0) {
      Vue.http.post(
        API_URL + 'userShowcases/', formData
      ).then(response => {
        this.check()
        context.$toast.open({
          message: 'Ok ! C\'est sauvegardé',
          type: 'is-success'
        })
        context.error = false
      }, response => {
        console.log(response)
        context.$toast.open({
          message: 'Oups ! Il y a eu un problème lors de la sauvegarde',
          type: 'is-danger'
        })
        context.error = true
      })
    } else {
      Vue.http.patch(
        API_URL + 'user/showcase/', formData
      ).then(response => {
        this.check()
        context.$toast.open({
          message: 'Ok ! C\'est sauvegardé',
          type: 'is-success'
        })
        context.error = false
      }, response => {
        console.log(response)
        context.$toast.open({
          message: 'Oups ! Il y a eu un problème lors de la sauvegarde',
          type: 'is-danger'
        })
        context.error = true
      })
    }
  },

  updateShowcaseImages (context, formData) {
    Vue.http.post(
      API_URL + 'showcases/images/', formData
    ).then(response => {
      this.check()
      context.$toast.open({
        message: 'Ok ! C\'est sauvegardé',
        type: 'is-success'
      })
      context.error = false
    }, response => {
      console.log(response)
      context.$toast.open({
        message: 'Oups ! Il y a eu un problème lors de la sauvegarde',
        type: 'is-danger'
      })
      context.error = true
    })
  },

  deleteShowcaseImages (context, imageID) {
    Vue.http.delete(
      API_URL + 'showcases/images/' + imageID
    ).then(response => {
      this.check()
      context.$toast.open({
        message: 'Ok ! L\'image a été supprimée',
        type: 'is-success'
      })
      context.error = false
    }, response => {
      console.log(response)
      context.$toast.open({
        message: 'Oups ! Il y a eu un problème lors de la suppression de l\'image',
        type: 'is-danger'
      })
      context.error = true
    })
  }

}
