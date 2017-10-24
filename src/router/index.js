import Vue from 'vue'
import Router from 'vue-router'
// import store from '@/store'
import Dashboard from '@/components/Dashboard.vue'
import Home from '@/components/Home.vue'
import Register from '@/components/Register.vue'
import Signin from '@/components/Signin.vue'
import Showcase from '@/components/Showcase.vue'
import Product from '@/components/Product.vue'
import DashboardProfile from '@/components/dashboard/Profile.vue'
import DashboardAddress from '@/components/dashboard/Address.vue'
import DashboardPresentation from '@/components/dashboard/showcase/Presentation.vue'
import DashboardLocation from '@/components/dashboard/showcase/Location.vue'
import DashboardContact from '@/components/dashboard/showcase/Contact.vue'
import DashboardTimetable from '@/components/dashboard/showcase/Timetable.vue'
import DashboardMoreInformations from '@/components/dashboard/showcase/MoreInformations.vue'
import DashboardImages from '@/components/dashboard/showcase/Images.vue'
import DashboardProductList from '@/components/dashboard/product/List.vue'
import DashboardProductAdd from '@/components/dashboard/product/Add.vue'
import DashboardProductEdit from '@/components/dashboard/product/Edit.vue'

Vue.use(Router)

async function requireAuth (to, from, next) {
  // await store.dispatch('check')
  const authenticated = localStorage.getItem('authenticated')
  if (authenticated === 'true') {
    next()
  } else {
    next({ name: 'home' })
  }
  /** const token = store.state.token
  console.log(token)
  if (token !== null) {
    next()
  } else {
    next({ name: 'home' })
  } **/
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
      path: '/vitrine/:id(\\d+)',
      name: 'showcase',
      component: Showcase
    },
    {
      path: '/produit/:id(\\d+)',
      name: 'product',
      component: Product
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
        path: 'showcase/presentation',
        name: 'dashboard.showcase.presentation',
        component: DashboardPresentation
      }, {
        path: 'showcase/location',
        name: 'dashboard.showcase.location',
        component: DashboardLocation
      }, {
        path: 'showcase/contact',
        name: 'dashboard.showcase.contact',
        component: DashboardContact
      }, {
        path: 'showcase/timetable',
        name: 'dashboard.showcase.timetable',
        component: DashboardTimetable
      }, {
        path: 'showcase/informations',
        name: 'dashboard.showcase.informations',
        component: DashboardMoreInformations
      }, {
        path: 'showcase/images',
        name: 'dashboard.showcase.images',
        component: DashboardImages
      }, {
        path: 'product/list',
        name: 'dashboard.product.list',
        component: DashboardProductList
      }, {
        path: 'product/add',
        name: 'dashboard.product.add',
        component: DashboardProductAdd
      }, {
        path: 'product/:id(\\d+)',
        name: 'dashboard.product.edit',
        component: DashboardProductEdit
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
