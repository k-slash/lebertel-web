<template>
  <div>
    <aside class="menu">
      <p class="menu-label">
        General
      </p>
      <ul class="menu-list">
        <router-link :to="{ name: 'dashboard.profile' }" v-bind:class="{ 'is-active': $route.name == 'dashboard.profile' }">
          Profile
        </router-link>
        <router-link :to="{ name: 'dashboard.address' }" v-bind:class="{ 'is-active': $route.name == 'dashboard.address' }">
          Adresse
        </router-link>
      </ul>
      <p class="menu-label" v-if="!!user.profile.pro">
        Ma vitrine
      </p>
      <ul class="menu-list" v-if="!!user.profile.pro">
        <router-link :to="{ name: 'dashboard.showcase.presentation' }" v-bind:class="{ 'is-active': $route.name == 'dashboard.showcase.presentation' }">
          Présentation
        </router-link>
        <li>
          <router-link :to="{ name: 'dashboard.showcase.location' }">
            Informations
          </router-link>
          <ul>
            <router-link :to="{ name: 'dashboard.showcase.location' }" v-bind:class="{ 'is-active': $route.name == 'dashboard.showcase.location' }">
              Localisation
            </router-link>
            <router-link :to="{ name: 'dashboard.showcase.contact' }" v-bind:class="{ 'is-active': $route.name == 'dashboard.showcase.contact' }">
              Contact
            </router-link>
            <router-link :to="{ name: 'dashboard.showcase.timetable' }" v-bind:class="{ 'is-active': $route.name == 'dashboard.showcase.timetable' }">
              Horaires
            </router-link>
            <router-link :to="{ name: 'dashboard.showcase.informations' }" v-bind:class="{ 'is-active': $route.name == 'dashboard.showcase.informations' }">
              Plus d'infos
            </router-link>
          </ul>
        </li>
        <li>
          <router-link :to="{ name: 'dashboard.showcase.images' }" v-bind:class="{ 'is-active': $route.name == 'dashboard.showcase.images' }">
            Images
          </router-link>
        </li>
      </ul>
      <p class="menu-label" v-if="!!user.profile.pro">
        Produits
      </p>
      <ul class="menu-list" v-if="!!user.profile.pro">
        <router-link :to="{ name: 'dashboard.product.list' }" v-bind:class="{ 'is-active': $route.name == 'dashboard.product.list' }">
          Liste des produits
        </router-link>
        <router-link :to="{ name: 'dashboard.product.add' }" v-bind:class="{ 'is-active': $route.name == 'dashboard.product.add' }">
          Ajouter un produit
        </router-link>
      </ul>
      <!-- <p class="menu-label">
        Transactions
      </p>
      <ul class="menu-list">
        <li><a>Payments</a></li>
        <li><a>Transfers</a></li>
        <li><a>Balance</a></li>
      </ul> -->
    </aside>
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  name: 'dashboardMenu',
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...Vuex.mapGetters(['user'])
  }
}
</script>
