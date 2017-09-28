// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router/index.js'
import VueResource from 'vue-resource'
import App from '@/components/App.vue'

import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import VueForm from 'vue-form'
import Vue2Leaflet from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import VueQuillEditor from 'vue-quill-editor'

Vue.use(Vuex)
Vue.use(Buefy)
Vue.use(VueResource)
Vue.use(VueQuillEditor)
Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  },
  validators: {
    matches: function (value, attrValue) {
      if (!attrValue) return true
      return value === attrValue
    },
    'password-strength': function (value) {
      return /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(value)
    }
  }
})
Vue.component('v-map', Vue2Leaflet.Map)
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer)
Vue.component('v-marker', Vue2Leaflet.Marker)
Vue.component('v-tooltip', Vue2Leaflet.Tooltip)
Vue.component('v-popup', Vue2Leaflet.Popup)

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')
Vue.http.options.root = ''
Vue.config.productionTip = false

export default Vue

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
