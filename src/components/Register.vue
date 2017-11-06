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
                  <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.registerFirstName)">
                    <div class="field">
                      <label class="label">Prénom</label>
                      <div class="control">
                        <input id="firstName" type="text" name="firstName" class="input" required v-model="firstName">
                      </div>
                      <field-messages name="firstName" show="$touched || $submitted" class="form-control-feedback">
                        <div>Ok !</div>
                        <div slot="required">Votre prénom est requis</div>
                      </field-messages>
                    </div>
                  </validate>

                  <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.registerLastName)">
                    <div class="field">
                      <label class="label">Nom</label>
                      <div class="control">
                        <input id="lastName" type="text" name="lastName" class="input" required v-model="lastName">
                      </div>
                      <field-messages name="lastName" show="$touched || $submitted" class="form-control-feedback">
                        <div>Ok !</div>
                        <div slot="required">Votre nom est requis</div>
                      </field-messages>
                    </div>
                  </validate>

                  <validate v-if="pro" auto-label class="form-group required-field" :class="fieldClassName(formstate.name)">
                    <div class="field">
                      <label class="label">Nom de votre vitrine ( Nom commercial )</label>
                      <div class="control">
                        <input id="name" type="text" name="name" class="input" required v-model="name">
                      </div>
                      <field-messages name="name" show="$touched || $submitted" class="form-control-feedback">
                        <div>Ok !</div>
                        <div slot="required">Le nom de votre vitrine est requis</div>
                      </field-messages>
                    </div>
                  </validate>

                  <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.registerEmail)">
                    <div class="field">
                      <label class="label">Email</label>
                      <div class="control">
                        <input id="email" type="email" name="email" class="input" required v-model="email">
                      </div>
                      <field-messages auto-label name="email" show="$touched || $submitted" class="form-control-feedback">
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
                        <input id="password" type="password" password-strength name="password" class="input" required v-model="password">
                      </div>
                      <field-messages auto-label name="password" show="$touched || $submitted" class="form-control-feedback">
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
                        <input id="confirmPassword" type="password" :matches="password" name="confirmPassword" class="input" required>
                      </div>
                      <field-messages auto-label name="confirmPassword" show="$touched || $submitted" class="form-control-feedback">
                        <div>Ok !</div>
                        <div slot="required">La confirmation de votre mot de passe est requise</div>
                        <div slot="matches">Les mots de passe ne correspondent pas</div>
                      </field-messages>
                    </div>
                  </validate>
                  <br>
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
      formstate: {},
      pro: false,
      firstName: null,
      lastName: null,
      name: null,
      email: null,
      password: null
    }
  },
  methods: {
    ...Vuex.mapActions({
      register: 'register'
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

    onSubmit: function () {
      if (this.formstate.$valid) {
        const data = {
          'firstName': this.firstName,
          'lastName': this.lastName,
          'email': this.email,
          'password': this.password,
          'pro': this.pro,
          'name': this.name
        }
        console.log(data)
        // this.register(data)
      }
    }
  }
}
</script>
