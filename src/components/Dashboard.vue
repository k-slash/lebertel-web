<template>
  <section class="section">
    <div class="columns">
      <div class="column is-3 menu-border">
        <lb-dashboardMenu></lb-dashboardMenu>
      </div>

      <div class="column">
        <transition name="dashboard" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </section>

</template>

<script>
import 'leaflet/dist/leaflet.css'
import LbDashboardMenu from './dashboard/Menu'

export default {
  name: 'dashboard',
  components: {
    'lb-dashboardMenu': LbDashboardMenu
  },
  data () {
    return {
    }
  }
}
</script>
