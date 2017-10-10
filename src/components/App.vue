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
              <span class="nav-item" v-if="!this.user.authenticated">
                <router-link :to="{ name: 'register' }" class="button is-primary">
                  <span>Créer un compte</span>
                </router-link>
              </span>
              <span class="nav-item" v-if="!this.user.authenticated">
                <router-link :to="{ name: 'signin' }" class="button is-primary">
                  <span>Se connecter</span>
                </router-link>
              </span>
              <div class="navbar-item has-dropdown" :class="navMenuClass">
                <div class="navbar-link media" v-if="this.user.authenticated" @click="toggleMenu">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <div v-if="!!this.user.profile.avatar">
                        <img :src="this.user.profile.avatar" alt="Image" v-if="this.user.authenticated">
                      </div>
                      <div v-else>
                        <img src="../assets/images/avatar.png" alt="Image" v-if="this.user.authenticated">
                      </div>
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="title is-4">{{ this.user.info.first_name }} {{ this.user.info.last_name }}</p>
                    <!--<p class="subtitle is-6">@johnsmith</p>-->
                  </div>
                </div>
                <div id="blogDropdown" class="navbar-dropdown is-boxed" :class="navMenuClass" v-if="this.user.authenticated">
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
import Vuex from 'vuex'

export default {
  data () {
    return {
      isNavMenuActive: false
    }
  },
  computed: {
    ...Vuex.mapGetters(['user']),
    navMenuClass () {
      return {
        'is-active': this.isNavMenuActive
      }
    }
  },
  methods: {
    ...Vuex.mapActions({
      logout: 'logout',
      check: 'check'
    }),
    toggleMenu () {
      this.isNavMenuActive = !this.isNavMenuActive
    },
    signout (e) {
      e.preventDefault()
      const redirect = this.logout(this)
      if (redirect) {
        this.$router.push({
          name: 'home'
        })
      }
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.check(this).then(
        console.log(this.user.authenticated),
        console.log(this.user.info)
      )
    })
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/main.scss'
</style>
