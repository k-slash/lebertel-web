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
                <vue-form autocomplete="off" :state="formstate" v-model="formstate" v-on:submit="signin">
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
                </vue-form>
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
      password: null
    }
  },
  methods: {
    ...Vuex.mapActions({
      login: 'login',
      check: 'check'
    }),

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
        e.preventDefault()
        const data = {
          'email': this.email,
          'password': this.password
        }
        this.login(data).then(
          this.$router.push({
            name: 'dashboard.profile'
          })
        )
        /** if (!this.$store.state.error) {
          this.$router.push({
            name: 'dashboard.profile'
          })
          console.log('ok')
        } **/
      }
    }
  }
}
</script>
