// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import router from '@/router'
import store from '@/store'
import conf from '@/conf'
import VueResource from 'vue-resource'
import App from '@/components/App.vue'

import ElementUI from 'element-ui'
import '@/assets/element-theme/index.css'
import Buefy from 'buefy'
import Vue2Leaflet from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import VueQuillEditor from 'vue-quill-editor'
import VueAgile from 'vue-agile'
import VueImg from 'v-img'
import VueAnalytics from 'vue-analytics'
import VueCookie from 'vue-cookie'
import SocialSharing from 'vue-social-sharing'
import lang from 'element-ui/lib/locale/lang/fr'
import locale from 'element-ui/lib/locale'

Vue.use(VueAnalytics, {
  id: conf.GA_ID,
  router,
  autoTracking: {
    pageviewTemplate (route) {
      return {
        page: route.path,
        title: document.title,
        location: window.location.href
      }
    }
  },
  ignoreRoutes: [
    'dashboard',
    'dashboard.profile',
    'dashboard.address',
    'dashboard.showcase.presentation',
    'dashboard.showcase.location',
    'dashboard.showcase.contact',
    'dashboard.showcase.timetable',
    'dashboard.showcase.informations',
    'dashboard.showcase.images',
    'dashboard.product.list',
    'dashboard.product.add',
    'dashboard.product.edit'
  ]
})
Vue.use(Buefy)
Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(VueQuillEditor)
Vue.use(VueAgile)
Vue.use(VueImg)
Vue.use(VueCookie)
Vue.use(SocialSharing)

Vue.component('v-map', Vue2Leaflet.Map)
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer)
Vue.component('v-marker', Vue2Leaflet.Marker)
Vue.component('v-tooltip', Vue2Leaflet.Tooltip)
Vue.component('v-popup', Vue2Leaflet.Popup)

locale.use(lang)

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('./assets/images/marker.png'),
  iconUrl: require('./assets/images/marker.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

Vue.config.productionTip = false

// Set title for each views
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

/* Link store to router */
sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
}).$mount()

/** var root = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})

document.addEventListener('DOMContentLoaded', function () {
  root.$mount('#app')
}) **/
