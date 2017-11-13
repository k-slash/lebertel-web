<template>
  <div class="dashboardShowcaseImages">
    <h1 class="title menu-title">Images</h1>
    <div class="columns is-multiline">
      <div class="column is-3" v-model="user.showcase.images"
        v-for="item in user.showcase.images"
        v-bind:item="item"
        v-bind:key="item.id">
        <article class="media">
          <div class="media-content">
            <p class="image is-128">
              <img :src="item.thumb_medium">
            </p>
          </div>
          <div class="media-right">
            <button class="delete" @click="deleteImage" :id="item.id"></button>
          </div>
        </article>
      </div>
    </div>
    <div class="block">
      <label for="files" class="button is-primary badge" :data-badge="nbFiles">Ajouter des images</label>
      <input id="files" style="visibility:hidden;"  ref="file_input" type="file" multiple @change="uploadFiles(user.showcase.user)">
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex'
import store from '@/store'

export default {

  data () {
    return {
      formstate: {},
      files: [],
      image: '',
      imageSrc: '',
      nbFiles: ''
    }
  },

  beforeRouteEnter (to, from, next) {
    store.dispatch('check').then(res => next())
  },

  computed: {
    ...Vuex.mapGetters(['user'])
  },

  methods: {
    ...Vuex.mapActions({
      addShowcaseImages: 'addShowcaseImages',
      deleteShowcaseImage: 'deleteShowcaseImage',
      check: 'check'
    }),

    async uploadFiles (id) {
      var files = this.$refs.file_input.files
      this.nbFiles = files.length
      for (var i = 0; i < files.length; i++) {
        console.log(files[i])
        await store.commit('SET_IMAGE_ADDED', files[i])
        await store.commit('SET_IMAGE_ADDED_DISPLAY_ORDER', i)
        await this.addShowcaseImages(id)
      }
    },

    async deleteImage (event) {
      var imageID = event.currentTarget.id
      this.deleteShowcaseImage(imageID)
    },

    fieldClassName: function (field) {
      if (!field) {
        return ''
      }
      if ((field.$touched || field.$submitted) && field.$valid) {
        return 'has-success'
      }
      if ((field.$touched || field.$submitted) && field.$invalid) {
        return 'has-danger'
      }
    }
  }
}
</script>
