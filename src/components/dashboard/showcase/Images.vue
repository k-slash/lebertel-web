<template>
  <div class="dashboardShowcaseImages">
    <h1 class="title menu-title">Images</h1>
    <div class="columns is-multiline">
      <div class="column is-3" v-model="showcase.images"
        v-for="item in showcase.images"
        v-bind:item="item"
        v-bind:key="item.id">
        <article class="media">
          <div class="media-content">
            <p class="image is-128">
              <img :src="item.image">
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
      <input id="files" style="visibility:hidden;"  ref="file_input" type="file" multiple @change="uploadFiles">
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex'

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

  computed: {
    editor () {
      return this.$refs.myTextEditor.quill
    },
    ...Vuex.mapGetters(['showcase'])
  },

  watch: {
    ...Vuex.mapGetters(['showcase'])
  },

  methods: {
    ...Vuex.mapActions({
      addShowcaseImages: 'addShowcaseImages',
      deleteShowcaseImage: 'deleteShowcaseImage',
      check: 'check'
    }),

    uploadFiles: function () {
      var files = this.$refs.file_input.files
      this.nbFiles = files.length
      for (var i = 0; i < files.length; i++) {
        this.$store.commit('SET_IMAGE_ADDED', files[i])
        this.$store.commit('SET_IMAGE_ADDED_DISPLAY_ORDER', i)
        this.addShowcaseImages(this)
      }
    },

    reload: function (event) {
      this.check(this)
    },

    deleteImage: function (event) {
      var imageID = event.currentTarget.id
      this.$store.commit('SET_IMAGE_TO_DELETE', imageID)
      this.deleteShowcaseImage(this)
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
