import Vue from 'vue'
import Router from 'vue-router'
// import store from '@/store'
import Dashboard from '@/components/Dashboard.vue'
import Home from '@/components/Home.vue'
import CookiesPage from '@/components/CookiesPage.vue'
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
  const authenticated = localStorage.getItem('authenticated')
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
      component: Home,
      meta: {
        title: 'Bienvenue sur lebertel.',
        analytics: {
          pageviewTemplate (route) {
            return {
              title: 'Bienvenue sur lebertel. Le site des artisans, commercants, services et associations près de chez vous.',
              path: route.path,
              location: 'https://lebertel.re/'
            }
          }
        }
      }
    },
    {
      path: '/utilisation-des-cookies',
      name: 'utilisation-des-cookies',
      component: CookiesPage,
      meta: {
        title: 'Utilisation des cookies',
        analytics: {
          pageviewTemplate (route) {
            return {
              title: 'Utilisation des cookies',
              path: route.path,
              location: 'https://lebertel.re/utilisation-des-cookies'
            }
          }
        }
      }
    },
    {
      path: '/:id',
      name: 'showcase',
      meta: {
        title: 'lebertel.'
      },
      component: Showcase
    },
    {
      path: '/produit/:id(\\d+)',
      name: 'product',
      meta: {
        title: 'lebertel.'
      },
      component: Product
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        title: 'Tableau de bord'
      },
      beforeEnter: requireAuth,
      children: [{
        path: 'profile',
        name: 'dashboard.profile',
        meta: {
          title: 'Tableau de bord - Profile'
        },
        component: DashboardProfile
      }, {
        path: 'address',
        name: 'dashboard.address',
        meta: {
          title: 'Tableau de bord - Adresse'
        },
        component: DashboardAddress
      }, {
        path: 'showcase/presentation',
        name: 'dashboard.showcase.presentation',
        meta: {
          title: 'Tableau de bord - Vitrine - Présentation'
        },
        component: DashboardPresentation
      }, {
        path: 'showcase/location',
        name: 'dashboard.showcase.location',
        meta: {
          title: 'Tableau de bord - Vitrine - Localisation'
        },
        component: DashboardLocation
      }, {
        path: 'showcase/contact',
        name: 'dashboard.showcase.contact',
        meta: {
          title: 'Tableau de bord - Vitrine - Contact'
        },
        component: DashboardContact
      }, {
        path: 'showcase/timetable',
        name: 'dashboard.showcase.timetable',
        meta: {
          title: 'Tableau de bord - Vitrine - Horaires'
        },
        component: DashboardTimetable
      }, {
        path: 'showcase/informations',
        name: 'dashboard.showcase.informations',
        meta: {
          title: 'Tableau de bord - Vitrine - Informations'
        },
        component: DashboardMoreInformations
      }, {
        path: 'showcase/images',
        name: 'dashboard.showcase.images',
        meta: {
          title: 'Tableau de bord - Vitrine - Images'
        },
        component: DashboardImages
      }, {
        path: 'product/list',
        name: 'dashboard.product.list',
        meta: {
          title: 'Tableau de bord - Liste des produits'
        },
        component: DashboardProductList
      }, {
        path: 'product/add',
        name: 'dashboard.product.add',
        meta: {
          title: 'Tableau de bord - Ajouter un produit'
        },
        component: DashboardProductAdd
      }, {
        path: 'product/:id(\\d+)',
        name: 'dashboard.product.edit',
        meta: {
          title: 'Tableau de bord - Modifier un produit'
        },
        component: DashboardProductEdit
      }]
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        title: 'Créez votre compte sur le bertel.',
        analytics: {
          pageviewTemplate (route) {
            return {
              title: 'Créez votre compte sur le bertel.',
              path: route.path,
              location: 'https://lebertel.re/inscription'
            }
          }
        }
      }
    },
    {
      path: '/login',
      name: 'signin',
      component: Signin,
      meta: {
        title: 'Connexion à lebertel.',
        analytics: {
          pageviewTemplate (route) {
            return {
              title: 'Connexion à lebertel.',
              path: route.path,
              location: 'https://lebertel.re/connexion'
            }
          }
        }
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
