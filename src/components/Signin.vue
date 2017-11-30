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
                  <el-form-item label="Password" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="Confirm" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="Age" prop="age">
                    <el-input v-model.number="ruleForm.age"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
                    <el-button @click="resetForm('ruleForm')">Reset</el-button>
                  </el-form-item>
                </el-form>
                <!-- <vue-form autocomplete="off" :state="formstate" v-model="formstate" v-on:submit="signin">
                  <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.email)">
                    <div class="field">
                      <label class="label">Email</label>
                      <div class="control">
                        <input id="email" type="email" name="email" class="input" required v-model="email">
                      </div>
                      <field-messages auto-label name="email" show="$touched || $submitted" class="form-control-feedback">
                        <div slot="required">Votre email est requis</div>
                        <div slot="email">L'email est invalide</div>
                      </field-messages>
                    </div>
                  </validate>
                  <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.password)">
                    <div class="field">
                      <label class="label">Mot de passe</label>
                      <div class="control">
                        <input id="password" type="password" name="password" class="input" required v-model="password">
                      </div>
                      <field-messages auto-label name="password" show="$touched || $submitted" class="form-control-feedback">
                        <div slot="required">Votre mot de passe est requis</div>
                      </field-messages>
                    </div>
                  </validate>
                  <br>
                  <div class="py-2 text-center">
                    <button class="button is-medium is-primary is-fullwidth" type="submit">Connexion</button>
                  </div>
                </vue-form> -->
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
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please input the age'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('Please input digits'))
        } else {
          if (value < 18) {
            callback(new Error('Age must be greater than 18'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('Two inputs don\'t match!'))
      } else {
        callback()
      }
    }
    return {
      formstate: {},
      email: null,
      password: null,
      ruleForm: {
        pass: '',
        checkPass: '',
        age: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...Vuex.mapActions({
      login: 'login',
      check: 'check'
    }),

    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
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
    },

    signin (e) {
      if (this.formstate.$valid) {
        console.log('ok')
        e.preventDefault()
        const data = {
          'email': this.email,
          'password': this.password
        }
        this.login(data)
      }
    }
  }
}
</script>
