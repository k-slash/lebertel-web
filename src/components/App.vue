<template>
  <div id="app">
    <div class="hero-head">
      <lb-header></lb-header>
    </div>
    <div class="panel-body">
      <transition name="container" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <template>
      <footer>
        <cookie-law theme="dark-lime" buttonText="OK ! 🍪">
          <div slot="message">
            Ce site utilise des cookies pour le bon fonctionnement de celui-ci <router-link to="utilisation-des-cookies"> En savoir plus </router-link>
          </div>
        </cookie-law>
      </footer>
    </template>
  </div>
</template>

<script>
import LbHeader from './Header'
import CookieLaw from 'vue-cookie-law'

export default {
  components: {
    'lb-header': LbHeader,
    CookieLaw
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/main.scss'
</style>
