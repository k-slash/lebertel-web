<template>
  <div class="home">
    <section class="hero is-milk-jam is-medium">
      <div class="hero-body showcase">
        <div class="container">
          <article class="media showcase">
            <div class="media-left">
              <figure class="image">
                <div v-if="!!showcase.logo">
                  <img :src="showcase.logo" alt="Image">
                </div>
                <div v-else>
                  <img src="../assets/images/avatar.png" alt="Image">
                </div>
              </figure>
            </div>
            <div class="media-right">
              <h1 class="title menu-title">{{ showcase.name }}</h1>
            </div>
          </article>
        </div>
      </div>
    </section>
    <section>
        <b-tabs position="is-centered" class="tabs-showcase">
            <b-tab-item label="Présentation">
              <div class="container showcase">
                <div class="presentation" v-html="showcase.presentation"></div>
              </div>
              <section class="hero is-yellow-pop">
                <section class="photos">
                  <div v-model="showcase.images"
                    v-for="item in showcase.images"
                    v-bind:item="item"
                    v-bind:key="item.id">
                    <img :src="item.image">
                  </div>
                </section>
              </section>
              <section class="hero is-light">
                <div class="hero-body">
                  <div class="container">
                    <div class="columns">
                      <div class="column is-half">
                        <div class="lebertel-map" v-if="!!showcase.location">
                          <v-map :padding="[200, 200]" :zoom="zoom" :options="options" :center="center" :min-zoom="minZoom" :max-zoom="maxZoom" v-on:l-zoomanim="zoomChanged">
                            <v-tilelayer :url="url"></v-tilelayer>
                            <div v-if="showcase.location != undefined">
                              <v-marker :lat-lng="showcase.location.coordinates" :draggable="false" v-on:l-move="markerMoved">
                                <v-popup :content="showcase.address"></v-popup>
                              </v-marker>
                            </div>
                            <div v-else>
                              <v-marker :lat-lng="marker" :draggable="false" v-on:l-move="markerMoved">
                                <v-popup content="Mon atelier"></v-popup>
                              </v-marker>
                            </div>
                          </v-map>
                        </div>
                      </div>
                      <div class="column is-one-third is-offset-1">
                        <address>
                          <h2>{{ showcase.name }}</h2>
                          {{ showcase.address }}<br>
                          {{ showcase.postcode }} {{ showcase.city }}<br>
                          La Réunion <br>
                          <abbr title="Téléphone">P:</abbr> {{ showcase.phone_number }} <br>
                          <abbr title="Email">P:</abbr> {{ showcase.email }}
                        </address>
                        <br>

                        <div class="timetable">
                          <h2>Horaires</h2>
                          <div v-html="showcase.timetable"></div>
                        </div>
                        <br>
                        <div class="moreInfos">
                          <h2>Pour info</h2>
                          <div v-html="showcase.informations"></div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section class="hero is-blanc-espagne">
                <div class="hero-body">
                  <div class="container social">
                    <a class="navbar-item" :href="showcase.facebook" target="_blank">
                      <span class="icon" style="color: #3b5998;">
                        <i class="fa fa-facebook"></i>
                      </span>
                    </a>
                    <a class="navbar-item" :href="showcase.linkedin" target="_blank">
                      <span class="icon" style="color: #007bb6;">
                        <i class="fa fa-linkedin"></i>
                      </span>
                    </a>
                    <a class="navbar-item" :href="showcase.twitter" target="_blank">
                      <span class="icon" style="color: #55acee;">
                        <i class="fa fa-twitter"></i>
                      </span>
                    </a>
                    <a class="navbar-item" :href="showcase.pinterest" target="_blank">
                      <span class="icon" style="color: #BD081C;">
                        <i class="fa fa-pinterest"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </section>
            </b-tab-item>
            <b-tab-item label="Produits">
              <div class="container showcase">
                <div class="presentation">
                  <h2> Et voici mes produits </h2>
                </div>
              </div>
              <div class="container">
                <section class="products">
                  <div class="card"
                    v-model="products"
                    v-for="p in products"
                    v-bind:item="p"
                    v-bind:key="p.id">
                    <div class="card-image">
                      <figure class="image is-4by3">
                        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
                      </figure>
                    </div>
                    <div class="card-content">
                      <div class="media">
                        <div class="media-content">
                          <p class="title is-4">{{ p.name }}</p>
                          <p class="subtitle is-6">{{ p.price }} €</p>
                        </div>
                      </div>

                      <div class="content">
                        <div v-html="p.description"></div>
                      </div>
                    </div>
                    <br>
                  </div>
                </section>
                <section class="hero is-blanc-espagne">
                  <div class="hero-body">
                    <div class="container social">
                      <a class="navbar-item" :href="showcase.facebook" target="_blank">
                        <span class="icon" style="color: #3b5998;">
                          <i class="fa fa-facebook"></i>
                        </span>
                      </a>
                      <a class="navbar-item" :href="showcase.linkedin" target="_blank">
                        <span class="icon" style="color: #007bb6;">
                          <i class="fa fa-linkedin"></i>
                        </span>
                      </a>
                      <a class="navbar-item" :href="showcase.twitter" target="_blank">
                        <span class="icon" style="color: #55acee;">
                          <i class="fa fa-twitter"></i>
                        </span>
                      </a>
                      <a class="navbar-item" :href="showcase.pinterest" target="_blank">
                        <span class="icon" style="color: #BD081C;">
                          <i class="fa fa-pinterest"></i>
                        </span>
                      </a>
                    </div>
                  </div>
                </section>
              </div>
            </b-tab-item>
        </b-tabs>
    </section>
  </div>
</template>

<script>
import Vuex from 'vuex'
import VueImgInputer from 'vue-img-inputer'
import store from '@/store'
import L from 'leaflet'

export default {
  components: {
    VueImgInputer
  },
  data () {
    return {
      formstate: {},
      file: '',
      image: '',
      zoom: 10,
      center: [-21.15, 55.50],
      marker: L.latLng(-20.8821, 55.4507),
      minZoom: 10,
      maxZoom: 40,
      opacity: 0.6,
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      options: {
        scrollWheelZoom: false
      }
    }
  },
  computed: {
    ...Vuex.mapGetters(['showcase', 'products'])
  },
  beforeRouteEnter (to, from, next) {
    store.dispatch('getShowcase', to.params.id).then(
      store.dispatch('getProductsByUser', to.params.id).then(res => next())
    )
  },
  methods: {
    ...Vuex.mapActions({
      getShowcase: 'getShowcase',
      getProductsByUser: 'getProductsByUser'
    }),

    zoomChanged: function (event) {
      this.zoom = event.target.getZoom()
    }
  }
}
</script>
