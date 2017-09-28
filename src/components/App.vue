<template>
  <div id="app" class="hero panel panel-default">
    <div class="hero-head">
      <div class="container">
        <nav class="navbar">
          <div class="navbar-brand is-one-quarter">
            <span class="navbar-item app-name">
              <router-link :to="{ name: 'home' }">
                le bertel.
              </router-link>
            </span>
            <a class="navbar-item is-hidden-desktop" href="https://github.com/jgthms/bulma" target="_blank">
              <span class="icon" style="color: #333;">
                <i class="fa fa-github"></i>
              </span>
            </a>

            <a class="navbar-item is-hidden-desktop" href="https://twitter.com/jgthms" target="_blank">
              <span class="icon" style="color: #55acee;">
                <i class="fa fa-twitter"></i>
              </span>
            </a>

            <span class="navbar-burger burger" @click="toggleMenu" :class="navMenuClass">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div class="navbar-menu" :class="navMenuClass">
            <div class="navbar-start">
            </div>

            <div class="navbar-end" :class="navMenuClass">
              <span class="nav-item" v-if="!auth.user.authenticated">
                <router-link :to="{ name: 'register' }" class="button is-primary">
                  <span>Créer un compte</span>
                </router-link>
              </span>
              <span class="nav-item" v-if="!auth.user.authenticated">
                <router-link :to="{ name: 'signin' }" class="button is-primary">
                  <span>Se connecter</span>
                </router-link>
              </span>
              <div class="navbar-item has-dropdown" :class="navMenuClass">
                <div class="navbar-link media" v-if="auth.user.authenticated" @click="toggleMenu">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <div v-if="auth.user.profile.avatar.length > 0">
                        <img :src="auth.user.profile.avatar" alt="Image" v-if="auth.user.authenticated">
                      </div>
                      <div v-else>
                        <img src="../assets/images/avatar.png" alt="Image" v-if="auth.user.authenticated">
                      </div>
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="title is-4">{{ auth.user.info.first_name }} {{ auth.user.info.last_name }}</p>
                    <!--<p class="subtitle is-6">@johnsmith</p>-->
                  </div>
                </div>
                <div id="blogDropdown" class="navbar-dropdown is-boxed" :class="navMenuClass" v-if="auth.user.authenticated">
                  <router-link class="navbar-item" :to="{ name: 'home' }">
                    <i class="material-icons icon-margin">home</i>
                    Accueil
                  </router-link>
                  <router-link class="navbar-item" :to="{ name: 'dashboard.profile' }">
                    <i class="material-icons icon-margin">account_circle</i>
                    Mon compte
                  </router-link>
                  <router-link class="navbar-item" :to="{ name: 'dashboard.profile' }">
                    <i class="material-icons icon-margin">art_track</i>
                    Ma vitrine
                  </router-link>
                  <router-link class="navbar-item" :to="{ name: 'dashboard.profile' }">
                    <i class="material-icons icon-margin">store</i>
                    Mes produits
                  </router-link>
                  <hr class="navbar-divider">
                  <a class="navbar-item" value="logout" href="javascript:void(0)" v-on:click="signout">
                      <i class="material-icons icon-margin">exit_to_app</i>
                      Déconnexion
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <div class="panel-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import auth from '../auth.js'

export default {
  data () {
    return {
      auth: auth,
      isNavMenuActive: false
    }
  },
  computed: {
    navMenuClass () {
      return {
        'is-active': this.isNavMenuActive
      }
    }
  },
  methods: {
    toggleMenu () {
      this.isNavMenuActive = !this.isNavMenuActive
    },
    signout () {
      auth.signout()
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      auth.check()
    })
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/main.scss'
</style>
