<template>
  <div class="dashboardProfile">
    <div class="avatar-logo-center">
      <el-upload
        class="avatar-logo-uploader"
        :action="url"
        :headers="headers"
        :data="data"
        :before-upload="getFile"
        :on-success="handleAvatarSuccess"
        :show-file-list="true">
        <img v-if="user.profile.avatar" :src="user.profile.thumb_medium" class="avatar-logo">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <el-form :model="user" label-position="top" ref="form">
      <el-form-item label="Prénom" prop="info.first_name" :rules="[
          { required: true, message: 'Votre prénom est requis', trigger: 'blur' }
        ]"
      >
        <el-input v-model="user.info.first_name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Nom" prop="info.last_name" :rules="[
          { required: true, message: 'Votre nom est requis', trigger: 'blur' }
        ]"
      >
        <el-input v-model="user.info.last_name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Email" prop="info.email" :rules="[
          { required: true, message: 'Votre email est requis', trigger: 'blur' },
          { type: 'email', message: 'Votre email n’est pas valide', trigger: 'blur' }
        ]"
      >
        <el-input type="email" v-model="user.info.email" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Téléphone" prop="profile.phone_number" :rules="[
          { required: false, pattern: /^\d{10}$/, message: 'Votre numéro de téléphone doit être au format 0262121212', trigger: 'blur' }
        ]"
      >
        <el-input v-model="user.profile.phone_number" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.stop="saveProfile('form')" class="el-large-button" round>Mettre à jour</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Vuex from 'vuex'
import conf from '@/conf'

const token = localStorage.getItem('id_token')

export default {
  data () {
    return {
      url: conf.API_URL + 'user/uploadAvatar/',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      data: {},
      file: null,
      image: ''
    }
  },
  computed: {
    ...Vuex.mapGetters(['user'])
  },
  methods: {
    ...Vuex.mapActions({
      updateProfile: 'updateProfile',
      check: 'check'
    }),
    getFile (file) {
      this.data.user = this.user.profile.user
      this.data.phone_number = this.user.profile.phone_number
      this.data.pro = this.user.profile.pro
      this.data.avatar = file
    },
    handleAvatarSuccess (res, file) {
      this.user.profile.thumb_medium = URL.createObjectURL(file.raw)
      this.user.profile.thumb_avatar = URL.createObjectURL(file.raw)
    },
    saveProfile (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            'phone_number': this.user.profile.phone_number
          }
          this.updateProfile(data)
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
