<template>
  <div class="dashboardAddress">
    <h1 class="title menu-title">Adresse</h1>
    <vue-form autocomplete="off" @submit.prevent="onSubmit" :state="formstate" v-model="formstate" enctype="multipart/form-data">

      <div class="field">
        <label class="label">Adresse</label>
        <div class="control">
          <input id="address" type="text" name="address" class="input" v-model="this.user.address.address">
        </div>
      </div>

      <div class="field">
        <label class="label">Code postal</label>
        <div class="control">
          <input id="postcode" type="text" name="postcode" class="input" v-model="this.user.address.postcode">
        </div>
      </div>

      <div class="field">
        <label class="label">Ville</label>
        <div class="control">
          <input id="city" type="text" name="city" class="input" v-model="this.user.address.city">
        </div>
      </div>

      <div class="lebertel-map">
        <v-map :padding="[200, 200]" :zoom="zoom" :options="options" :center="center" :min-zoom="minZoom" :max-zoom="maxZoom" v-on:l-zoomanim="zoomChanged">
          <v-tilelayer :url="url"></v-tilelayer>
          <div v-if="this.user.address.location != undefined">
            <v-marker :lat-lng="this.user.address.location.coordinates" :draggable="true" v-on:l-move="markerMoved">
              <v-popup content="Mon atelier"></v-popup>
            </v-marker>
          </div>
          <div v-else>
            <v-marker :lat-lng="marker" :draggable="true" v-on:l-move="markerMoved">
              <v-popup content="Mon atelier"></v-popup>
            </v-marker>
          </div>
        </v-map>
      </div>

      <br>

      <div class="py-2 text-center">
        <button class="button is-medium is-primary is-fullwidth" type="submit">Mettre à jour</button>
      </div>
    </vue-form>
  </div>
</template>

<script>
  import Vuex from 'vuex'
  import L from 'leaflet'

  export default {

    data () {
      return {
        formstate: {},
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
      ...Vuex.mapGetters(['user'])
    },

    methods: {
      markerMoved: function (event) {
        this.user.address.location = 'POINT(' + event.latlng.lat + ' ' + event.latlng.lng + ')'
      },

      zoomChanged: function (event) {
        this.zoom = event.target.getZoom()
      },

      onSubmit: function () {
        if (this.formstate.$valid) {
          var formData = new FormData()
          formData.append('user', this.user.info.id)
          formData.append('address', this.user.address.address)
          formData.append('city', this.user.address.city)
          formData.append('postcode', this.user.address.postcode)
          formData.append('location', this.user.address.location)
          formData.append('country', 'RE')
          // auth.updateProfileAddress(this, formData)
        }
      }
    }
  }

</script>
