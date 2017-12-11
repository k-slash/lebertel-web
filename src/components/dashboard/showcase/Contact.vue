<template>
  <div class="dashboardShowcaseContact">
    <h1 class="title menu-title">Contact</h1>
    <el-form :model="user" label-position="top" ref="form">
      <el-form-item label="Email" prop="showcase.email" :rules="[
          { type: 'email', message: 'Votre email n’est pas valide', trigger: 'blur' }
        ]"
      >
        <el-input v-model="user.showcase.email" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Téléphone" prop="showcase.phone_number" :rules="[
          { required: false, pattern: /^\d{10}$/, message: 'Le numéro de téléphone doit être au format 0262121212', trigger: 'blur' }
        ]"
      >
        <el-input v-model="user.showcase.phone_number" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Site web" prop="showcase.website">
        <el-input v-model="user.showcase.website" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Facebook" prop="showcase.facebook">
        <el-input v-model="user.showcase.facebook" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="LinkedIn" prop="showcase.linkedin">
        <el-input v-model="user.showcase.linkedin" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Twitter" prop="showcase.twitter">
        <el-input v-model="user.showcase.twitter" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Pinterest" prop="showcase.pinterest">
        <el-input v-model="user.showcase.pinterest" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.stop="saveShowcaseContact('form')" class="el-large-button" round>Mettre à jour</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...Vuex.mapGetters(['user'])
  },
  methods: {
    ...Vuex.mapActions({
      updateShowcase: 'updateShowcase'
    }),

    saveShowcaseContact (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            'email': this.user.showcase.email,
            'phone_number': this.user.showcase.phone_number,
            'website': this.user.showcase.website,
            'facebook': this.user.showcase.facebook,
            'linkedin': this.user.showcase.linkedin,
            'twitter': this.user.showcase.twitter,
            'pinterest': this.user.showcase.pinterest
          }
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
