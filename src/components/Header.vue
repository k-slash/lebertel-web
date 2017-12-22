<template>
  <div class="container">
    <nav class="navbar" :class="connectedClass">
      <div class="navbar-brand is-one-quarter">
        <span class="navbar-item app-name">
          <router-link :to="{ name: 'home' }">
            le bertel.
          </router-link>
        </span>
        <span v-if="!user.authenticated" class="navbar-burger burger" @click="toggleMenu" :class="navMenuClass">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
      <div v-if="user.authenticated" class="navbar-avatar">
        <b-dropdown v-model="navigation" position="is-bottom-left">
            <a class="navbar-item" slot="trigger">
              <div class="navbar media">
                <figure class="image is-48x48">
                  <div v-if="!!user.profile.avatar">
                    <div class="avatar" v-bind:style="{ backgroundImage: 'url(' + user.profile.thumb_avatar + ')' }" ></div>
                  </div>
                  <div v-else>
                    <img class="avatar" src="../assets/images/avatar.png">
                  </div>
                </figure>
              </div>
            </a>

            <b-dropdown-item has-link>
              <router-link :to="{ name: 'home' }">
                <b-icon icon="home" class="icon-margin"></b-icon>
                Accueil
              </router-link>
            </b-dropdown-item>
            <hr class="dropdown-divider">
            <b-dropdown-item has-link>
              <router-link :to="{ name: 'dashboard.profile' }">
                <b-icon icon="account_circle" class="icon-margin"></b-icon>
                Mon compte
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item value="showcase" has-link>
              <router-link :to="{ name: 'showcase', params: { id: user.showcase.slug_name } }">
                <b-icon icon="art_track" class="icon-margin"></b-icon>
                Ma vitrine
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item value="products" has-link>
              <router-link :to="{ name: 'dashboard.product.list' }">
                <b-icon icon="store" class="icon-margin"></b-icon>
                Mes produits
              </router-link>
            </b-dropdown-item>
            <hr class="dropdown-divider">
            <b-dropdown-item value="signout" has-link>
              <a class="navbar-item" value="logout" v-on:click="signout">
                  <b-icon icon="exit_to_app" class="icon-margin"></b-icon>
                  Déconnexion
              </a>
            </b-dropdown-item>
        </b-dropdown>
      </div>
      <div v-if="!user.authenticated" class="navbar-menu" :class="navMenuClass">
        <div class="navbar-start">
        </div>

        <div class="navbar-end" :class="navMenuClass">
          <span class="nav-item">
            <router-link :to="{ name: 'register' }" class="register">
              <span>Créer un compte</span>
            </router-link>
          </span>
          <span class="nav-item" v-if="!user.authenticated">
            <router-link :to="{ name: 'signin' }" class="button is-primary">
              <span>Se connecter</span>
            </router-link>
          </span>
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
    },
    connectedClass () {
      return {
        'connected': this.user.authenticated
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
      this.check(this)
    })
  }
}
</script>
