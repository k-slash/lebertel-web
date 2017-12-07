<template>
  <div class="dashboardAddress">
    <h1 class="title menu-title">Adresse</h1>
    <el-form :model="user" label-position="top" ref="form">
      <el-form-item label="Adresse" prop="address.address">
        <el-input v-model="user.address.address" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Code postal" prop="address.postcode" :rules="[
          { required: false, pattern: /^\d{5}$/, message: 'Votre code postal doit être au format 97400', trigger: 'blur' }
        ]"
      >
        <el-input v-model="user.address.postcode" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Ville" prop="address.city">
        <el-input v-model="user.address.city" auto-complete="off"></el-input>
      </el-form-item>
      <div class="lebertel-map">
        <v-map :padding="[200, 200]" :zoom="zoom" :options="options" :center="center" :min-zoom="minZoom" :max-zoom="maxZoom" v-on:l-zoomanim="zoomChanged">
          <v-tilelayer :url="url"></v-tilelayer>
          <div v-if="user.address.location != undefined">
            <v-marker :lat-lng="user.address.location.coordinates" :draggable="true" v-on:l-move="markerMoved">
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
        <el-button type="primary" @click.stop="saveAddress('form')" class="el-large-button" round>Mettre à jour</el-button>
      </el-form-item>
    </el-form>
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
        // url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        url: 'https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibGViZXJ0ZWwiLCJhIjoiY2o5ZWlrbWo3MjE3bTMycXFjYXJrbTFjdSJ9.lNxTnbWuChJx4UeArFLsXg',
        options: {
          scrollWheelZoom: false
        }
      }
    },

    computed: {
      ...Vuex.mapGetters(['user'])
    },

    methods: {
      ...Vuex.mapActions({
        updateProfileAddress: 'updateProfileAddress',
        check: 'check'
      }),

      markerMoved: function (event) {
        let point = 'POINT(' + event.latlng.lat + ' ' + event.latlng.lng + ')'
        this.$store.commit('SET_LOCATION', point)
      },

      zoomChanged: function (event) {
        this.zoom = event.target.getZoom()
      },

      saveAddress (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const data = {
              'address': this.user.address.address,
              'postcode': this.user.address.postcode,
              'city': this.user.address.city,
              'location': this.user.address.location,
              'country': 'RE'
            }
            console.log(data)
            this.updateProfileAddress(data)
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
