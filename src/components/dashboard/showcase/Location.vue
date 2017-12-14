<template>
  <div class="dashboardShowcaseLocation">
    <h1 class="title menu-title">Localisation</h1>
    <el-form :model="user" label-position="top" ref="form">
      <el-form-item label="Adresse" prop="showcase.address">
        <el-input v-model="user.showcase.address" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Code postal" prop="showcase.postcode" :rules="[
          { required: false, pattern: /^\d{5}$/, message: 'Votre code postal doit être au format 97400', trigger: 'blur' }
        ]"
      >
        <el-input v-model="user.showcase.postcode" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Ville" prop="showcase.city">
        <el-input v-model="user.showcase.city" auto-complete="off"></el-input>
      </el-form-item>
      <div class="lebertel-map">
        <v-map :padding="[200, 200]" :zoom="zoom" :options="getOptions" :center="center" :min-zoom="minZoom" :max-zoom="maxZoom" v-on:l-zoomanim="zoomChanged">
          <v-tilelayer :url="url"></v-tilelayer>
          <div v-if="user.showcase.location != undefined">
            <v-marker :lat-lng="user.showcase.location.coordinates" :draggable="true" v-on:l-move="markerMoved">
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
      <el-form-item>
        <el-button type="primary" @click.stop="saveShowcaseLocation('form')" class="el-large-button" round>Mettre à jour</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Vuex from 'vuex'
  import L from 'leaflet'

  var MobileDetect = require('mobile-detect')
  var md = new MobileDetect(navigator.userAgent)

  export default {

    data () {
      return {
        zoom: 10,
        center: [-21.15, 55.50],
        marker: L.latLng(-20.8821, 55.4507),
        minZoom: 10,
        maxZoom: 40,
        opacity: 0.6,
        // url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        url: 'https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibGViZXJ0ZWwiLCJhIjoiY2o5ZWlrbWo3MjE3bTMycXFjYXJrbTFjdSJ9.lNxTnbWuChJx4UeArFLsXg',
        options: {
          scrollWheelZoom: false
        }
      }
    },

    computed: {
      ...Vuex.mapGetters(['user']),
      getOptions: function () {
        var options
        if (md.mobile()) {
          options = {
            scrollWheelZoom: false,
            dragging: false,
            tap: false
          }
          return options
        } else {
          options = {
            scrollWheelZoom: false,
            dragging: true,
            tap: true
          }
          return options
        }
      }
    },

    methods: {
      ...Vuex.mapActions({
        updateShowcase: 'updateShowcase'
      }),

      markerMoved: function (event) {
        let point = 'POINT(' + event.latlng.lat + ' ' + event.latlng.lng + ')'
        this.$store.commit('SET_USER_SHOWCASE_LOCATION', point)
      },

      zoomChanged: function (event) {
        this.zoom = event.target.getZoom()
      },

      saveShowcaseLocation (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const data = {
              'address': this.user.showcase.address,
              'postcode': this.user.showcase.postcode,
              'city': this.user.showcase.city,
              'location': this.user.showcase.location,
              'country': 'RE'
            }
            console.log(data)
            this.updateShowcase(data)
          } else {
            this.$toast.open({
              message: 'Veuillez vérifier les données saisies',
              type: 'is-danger'
            })
            return false
          }
        })
      }
    }
  }

</script>
