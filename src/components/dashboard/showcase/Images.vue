<template>
  <div class="dashboardShowcaseImages">
    <h1 class="title menu-title">Images</h1>
    <el-upload
      :action="url"
      :headers="headers"
      :data="data"
      :before-upload="getFile"
      list-type="picture-card"
      :multiple="multiple"
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
import conf from '@/conf'

const token = localStorage.getItem('id_token')

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
      multiple: true,
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
