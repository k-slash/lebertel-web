<template>
  <div class="dashboardShowcaseImages">
    <h1 class="title menu-title">Images</h1>
    <!-- <div class="columns is-multiline">
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
    </div> -->
    <el-upload
      :action="url"
      :headers="headers"
      :data="data"
      :before-upload="getFile"
      list-type="picture-card"
      multiple="true"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-change="loadImages"
      :file-list=user.showcase.images>
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import Vuex from 'vuex'
// import store from '@/store'
import conf from '@/conf'

const token = localStorage.getItem('id_token')
console.log(token)

export default {

  data () {
    return {
      url: conf.API_URL + 'showcase/images/',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      formstate: {},
      files: [],
      data: {},
      image: '',
      imageSrc: '',
      nbFiles: '',
      dialogImageUrl: '',
      dialogVisible: false
    }
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
    handleRemove (file, fileList) {
      console.log(file, fileList)
      const data = {
        id: file.id,
        showcaseId: this.user.showcase.user
      }
      this.deleteShowcaseImage(data)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.thumb_big
      this.dialogVisible = true
    },
    loadImages (file, fileList) {
      this.addShowcaseImages(this.user.showcase.user)
    },
    getFile (file) {
      this.data.showcase = this.user.showcase.user
      this.data.image = file
    }
  }
}
</script>
