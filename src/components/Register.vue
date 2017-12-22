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
                    <div class=" has-text-centered">
                      <h1 class="title">
                        Bienvenue sur <span class="lebertel-font big"> le bertel. </span>
                      </h1>
                      <h2 class="subtitle">
                        Adoptez la consom'action, en privilégiant les artisans, les producteurs et les savoir-faire réunionnais.
                      </h2>
                    </div>
                  </div>
                </section>
              </div>
              <div class="box-content">
                <b-field class="is-centered">
                  <b-radio-button v-model="pro"
                    :native-value="false"
                    type="is-primary">
                    <b-icon icon="face"></b-icon>
                    <span>Utilisateur</span>
                  </b-radio-button>

                  <b-radio-button v-model="pro"
                    :native-value="true"
                    type="is-primary">
                    <b-icon icon="work"></b-icon>
                    <span>Professionnel</span>
                  </b-radio-button>
                </b-field>
                <el-form :model="ruleForm" label-position="top" status-icon :rules="rules" ref="ruleForm" >
                  <el-form-item label="Prénom" prop="firstName">
                    <el-input type="text" v-model="ruleForm.firstName" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="Nom" prop="lastName">
                    <el-input type="text" v-model="ruleForm.lastName" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item v-if="pro" label="Nom de la vitrine ( Nom commercial )" prop="name">
                    <el-input type="text" v-model="ruleForm.name" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="Email" prop="email">
                    <el-input type="email" v-model="ruleForm.email" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="Mot de passe" prop="password">
                    <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="Confirmation du mot de passe" prop="confirmPassword">
                    <el-input type="password" v-model="ruleForm.confirmPassword" auto-complete="off" @keyup.enter.native="createAccount('ruleForm')"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="createAccount('ruleForm')" class="el-large-button" round>Créer votre compte</el-button>
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
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Merci d\'indiquer votre mot de passe'))
      } else {
        if (value.match((/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z].{6,}$/))) {
          if (this.ruleForm.confirmPassword !== '') {
            this.$refs.ruleForm.validateField('confirmPassword')
          }
          callback()
        } else {
          callback(new Error('Votre mot de passe doit contenir au moins une majuscule, une minuscule, un nombre et avoir au moins 6 caratères'))
        }
      }
    }

    var validateConfirmPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Merci d\'indiquer à nouveau votre mot de passe'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('La confirmation n\'est pas identique au mot de passe'))
      } else {
        callback()
      }
    }

    return {
      pro: false,
      ruleForm: {
        firstName: null,
        lastName: null,
        name: null,
        email: null,
        password: null
      },
      rules: {
        firstName: [
          { type: 'string', required: true, message: 'Votre prénom est requis', trigger: 'blur' }
        ],
        lastName: [
          { type: 'string', required: true, message: 'Votre nom est requis', trigger: 'blur' }
        ],
        name: [
          { type: 'string', required: true, message: 'Le nom de votre vitrine est requis', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Vous devez renseigner votre email pour vous authentifier', trigger: 'blur' },
          { type: 'email', message: 'Votre email n’est pas valide', trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: validateConfirmPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...Vuex.mapActions({
      register: 'register'
    }),

    createAccount (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            'firstName': this.ruleForm.firstName,
            'lastName': this.ruleForm.lastName,
            'email': this.ruleForm.email,
            'password': this.ruleForm.password,
            'pro': this.pro,
            'name': this.ruleForm.name
          }
          this.register(data)
        } else {
          this.$toast.open({
            message: 'Impossible de créer votre compte. Merci de vérifier les données saisies.',
            type: 'is-danger'
          })
          return false
        }
      })
    }
  }
}
</script>
