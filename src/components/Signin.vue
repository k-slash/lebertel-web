<template>
  <div class="account-register">
    <div class="hero-body">
      <div class="container is-fluid">
        <div class="columns">
          <div class="column is-6 is-offset-3">
            <div class="box no-padding">
              <div class="box-header">
                <section class="hero is-bertel-dark">
                  <div class="hero-body connection">
                    <div class="has-text-centered">
                      <h1 class="title">
                        Bienvenue sur <span class="lebertel-font"> le bertel. </span>
                      </h1>
                      <h2 class="subtitle">
                        Adoptez la consom'action, en privilégiant les artisans, les producteurs et les savoir-faire réunionnais.
                      </h2>
                    </div>
                  </div>
                </section>
              </div>
              <div class="box-content">
                <el-form :model="ruleForm" label-position="top" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                  <el-form-item label="Email" prop="email">
                    <el-input type="email" v-model="ruleForm.email" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="Mot de passe" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="signin('ruleForm')">Connexion</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vuex from 'vuex'

export default {
  data () {
    return {
      formstate: {},
      email: null,
      password: null,
      ruleForm: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { required: true, message: 'Vous devez renseigner votre email pour vous authentifier', trigger: 'blur' },
          { type: 'email', message: 'Votre email n’est pas valide', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Votre email est requis', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...Vuex.mapActions({
      login: 'login',
      check: 'check'
    }),

    signin (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            'email': this.ruleForm.email,
            'password': this.ruleForm.password
          }
          this.login(data)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
