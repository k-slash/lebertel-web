<template>
  <div id="app" class="hero panel panel-default">
    <div class="hero-head">
      <lb-header></lb-header>
    </div>
    <div class="panel-body">
      <transition name="container" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import LbHeader from './Header'

export default {
  components: {
    'lb-header': LbHeader
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/main.scss'
</style>
