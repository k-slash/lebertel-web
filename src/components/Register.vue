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
                <vue-form autocomplete="off" @submit.prevent="onSubmit" :state="formstate" v-model="formstate">

                  <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.registerFirstName)">
                    <div class="field">
                      <label class="label">Prénom</label>
                      <div class="control">
                        <input id="registerFirstName" type="text" name="registerFirstName" class="input" required :value="registerFirstName" @change="setFirstName">
                      </div>
                      <field-messages name="registerFirstName" show="$touched || $submitted" class="form-control-feedback">
                        <div>Ok !</div>
                        <div slot="required">Votre prénom est requis</div>
                      </field-messages>
                    </div>
                  </validate>

                  <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.registerLastName)">
                    <div class="field">
                      <label class="label">Nom</label>
                      <div class="control">
                        <input id="registerLastName" type="text" name="registerLastName" class="input" required :value="registerLastName" @change="setLastName">
                      </div>
                      <field-messages name="registerLastName" show="$touched || $submitted" class="form-control-feedback">
                        <div>Ok !</div>
                        <div slot="required">Votre nom est requis</div>
                      </field-messages>
                    </div>
                  </validate>

                  <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.registerEmail)">
                    <div class="field">
                      <label class="label">Email</label>
                      <div class="control">
                        <input id="registerEmail" type="email" name="registerEmail" class="input" required :value="registerEmail" @change="setEmail">
                      </div>
                      <field-messages auto-label name="registerEmail" show="$touched || $submitted" class="form-control-feedback">
                        <div>Ok !</div>
                        <div slot="required">Votre email est requis</div>
                        <div slot="email">L'email est invalide</div>
                      </field-messages>
                    </div>
                  </validate>

                  <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.registerPassword)">
                    <div class="field">
                      <label class="label">Mot de passe</label>
                      <div class="control">
                        <input id="registerPassword" type="password" password-strength name="registerPassword" class="input" required :value="registerPassword" @change="setPassword">
                      </div>
                      <field-messages auto-label name="registerPassword" show="$touched || $submitted" class="form-control-feedback">
                        <div>Ok !</div>
                        <div slot="required">Votre mot de passe est requis</div>
                        <div slot="password-strength">Votre mot de passe doit contenir des majuscules, des minuscules, des nombres ou des caractères spéciaux et contenir au moins 8 caratères</div>
                      </field-messages>
                    </div>
                  </validate>

                  <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.confirmPassword)">
                    <div class="field">
                      <label class="label">Confirmation du mot de passe</label>
                      <div class="control">
                        <input id="confirmPassword" type="password" :matches="registerPassword" name="confirmPassword" class="input" required>
                      </div>
                      <field-messages auto-label name="confirmPassword" show="$touched || $submitted" class="form-control-feedback">
                        <div>Ok !</div>
                        <div slot="required">La confirmation de votre mot de passe est requise</div>
                        <div slot="matches">Les mots de passe ne correspondent pas</div>
                      </field-messages>
                    </div>
                  </validate>

                  <div class="py-2 text-center">
                    <button class="button is-medium is-primary is-fullwidth" type="submit">Créer votre compte</button>
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
      formstate: {}
    }
  },
  computed: {
    ...Vuex.mapGetters(['registerFirstName', 'registerLastName', 'registerEmail', 'registerPassword'])
  },
  methods: {
    ...Vuex.mapActions({
      register: 'register',
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

    setFirstName (e) {
      this.$store.commit('SET_REGISTER_FIRSTNAME', e.target.value)
    },

    setLastName (e) {
      this.$store.commit('SET_REGISTER_LASTNAME', e.target.value)
    },

    setEmail (e) {
      this.$store.commit('SET_REGISTER_EMAIL', e.target.value)
    },

    setPassword (e) {
      this.$store.commit('SET_REGISTER_PASSWORD', e.target.value)
    },

    onSubmit: function () {
      if (this.formstate.$valid) {
        this.register(this)
          .then(response => {
            console.log(this.$store.error)
            if (!this.$store.error) {
              this.$router.push({
                name: 'dashboard.profile'
              })
            }
          })
      }
    }
  }
}
</script>
