<template>
  <div class="container">
    <nav class="navbar">
      <div class="navbar-brand is-one-quarter">
        <span class="navbar-item app-name">
          <router-link :to="{ name: 'home' }">
            le bertel.
          </router-link>
        </span>
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
          <b-dropdown v-model="navigation" position="is-bottom-left">
              <a class="navbar-item" slot="trigger">
                <div class="navbar-link media" v-if="this.user.authenticated">
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
                  </div>
                </div>
              </a>

              <b-dropdown-item>
                <router-link :to="{ name: 'home' }">
                  <b-icon icon="home" class="icon-margin"></b-icon>
                  Accueil
                </router-link>
              </b-dropdown-item>
              <hr class="dropdown-divider">
              <b-dropdown-item>
                <router-link :to="{ name: 'dashboard.profile' }">
                  <b-icon icon="account_circle" class="icon-margin"></b-icon>
                  Mon compte
                </router-link>
              </b-dropdown-item>
              <b-dropdown-item value="showcase">
                <router-link :to="{ name: 'showcase', params: { id: user.info.id } }">
                  <b-icon icon="art_track" class="icon-margin"></b-icon>
                  Ma vitrine
                </router-link>
              </b-dropdown-item>
              <b-dropdown-item value="products">
                <router-link :to="{ name: 'dashboard.profile' }">
                  <b-icon icon="store" class="icon-margin"></b-icon>
                  Mes produits
                </router-link>
              </b-dropdown-item>
              <hr class="dropdown-divider">
              <b-dropdown-item value="signout">
                <a class="navbar-item" value="logout" v-on:click="signout">
                    <b-icon icon="exit_to_app" class="icon-margin"></b-icon>
                    Déconnexion
                </a>
              </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  name: 'header',
  components: {
  },
  data () {
    return {
      navigation: 'home',
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
      )
    })
  }
}
</script>
