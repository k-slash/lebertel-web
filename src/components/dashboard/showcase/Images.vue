<template>
  <div class="dashboardShowcaseImages">
    <h1 class="title menu-title">Images</h1>
    <div class="columns is-multiline">
      <div class="column is-3" v-model="this.user.showcase.images"
        v-for="item in this.user.showcase.images"
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
    ...Vuex.mapGetters(['user'])
  },

  methods: {
    uploadFiles: function () {
      var files = this.$refs.file_input.files
      this.nbFiles = files.length
      for (var i = 0; i < files.length; i++) {
        var formData = new FormData()
        formData.append('showcase', this.user.showcase.id)
        formData.append('image', files[i])
        formData.append('display_order', i)
        // auth.updateShowcaseImages(this, formData)
      }
    },

    reload: function (event) {
      // auth.check
    },

    deleteImage: function (event) {
      // var imageID = event.currentTarget.id
      // auth.deleteShowcaseImages(this, imageID)
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
