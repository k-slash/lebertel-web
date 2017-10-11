import Vue from 'vue'
import Router from 'vue-router'
// import store from '@/store'
import Dashboard from '@/components/Dashboard.vue'
import Home from '@/components/Home.vue'
import Register from '@/components/Register.vue'
import Signin from '@/components/Signin.vue'
import DashboardProfile from '@/components/dashboard/Profile.vue'
import DashboardAddress from '@/components/dashboard/Address.vue'
import DashboardPresentation from '@/components/dashboard/showcase/Presentation.vue'
import DashboardLocation from '@/components/dashboard/showcase/Location.vue'
import DashboardContact from '@/components/dashboard/showcase/Contact.vue'
import DashboardTimetable from '@/components/dashboard/showcase/Timetable.vue'
import DashboardMoreInformations from '@/components/dashboard/showcase/MoreInformations.vue'
import DashboardImages from '@/components/dashboard/showcase/Images.vue'

Vue.use(Router)

async function requireAuth (to, from, next) {
  const authenticated = localStorage.getItem('authenticated')
  console.log(authenticated)
  if (authenticated === 'true') {
    next()
  } else {
    next({ name: 'home' })
  }
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: requireAuth,
      children: [{
        path: 'profile',
        name: 'dashboard.profile',
        component: DashboardProfile
      }, {
        path: 'address',
        name: 'dashboard.address',
        component: DashboardAddress
      }, {
        path: 'showcasePresentation',
        name: 'dashboard.showcase.presentation',
        component: DashboardPresentation
      }, {
        path: 'showcaseLocation',
        name: 'dashboard.showcase.location',
        component: DashboardLocation
      }, {
        path: 'showcaseContact',
        name: 'dashboard.showcase.contact',
        component: DashboardContact
      }, {
        path: 'showcaseTimetable',
        name: 'dashboard.showcase.timetable',
        component: DashboardTimetable
      }, {
        path: 'showcaseMoreInformations',
        name: 'dashboard.showcase.informations',
        component: DashboardMoreInformations
      }, {
        path: 'showcaseImages',
        name: 'dashboard.showcase.images',
        component: DashboardImages
      }]
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
