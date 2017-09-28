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
                        Bienvenue sur Le Bertel
                      </h1>
                      <h2 class="subtitle">
                        Adoptez la consom'action, en privilégiant les artisans, les producteurs et les savoir-faire réunionnais.
                      </h2>
                    </div>
                  </div>
                </section>
              </div>
              <div class="box-content">
                <vue-form autocomplete="off" @submit.prevent="onSubmit" v-if="!success" :state="formstate" v-model="formstate">

                  <div class="alert alert-danger" v-if="error && !success">
                    <p>Il y a eu un problème lors de l'enregistrement</p>
                  </div>
                  <div class="alert alert-success" v-if="success">
                    <p>Votre compte a été créé. Vous pouvez maintenant vous authentifier.</p>
                  </div>

                  <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.firstName)">
                    <div class="field">
                      <label class="label">Prénom</label>
                      <div class="control">
                        <input id="firstName" type="text" name="firstName" class="input" required v-model.lazy="firstName">
                      </div>
                      <field-messages name="firstName" show="$touched || $submitted" class="form-control-feedback">
                        <div>Ok !</div>
                        <div slot="required">Votre prénom est requis</div>
                      </field-messages>
                    </div>
                  </validate>

                  <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.lastName)">
                    <div class="field">
                      <label class="label">Nom</label>
                      <div class="control">
                        <input id="lastName" type="text" name="lastName" class="input" required v-model.lazy="lastName">
                      </div>
                      <field-messages name="lastName" show="$touched || $submitted" class="form-control-feedback">
                        <div>Ok !</div>
                        <div slot="required">Votre nom est requis</div>
                      </field-messages>
                    </div>
                  </validate>

                  <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.email)">
                    <div class="field">
                      <label class="label">Email</label>
                      <div class="control">
                        <input id="email" type="email" name="email" class="input" required v-model.lazy="email">
                      </div>
                      <field-messages auto-label name="email" show="$touched || $submitted" class="form-control-feedback">
                        <div>Ok !</div>
                        <div slot="required">Votre email est requis</div>
                        <div slot="email">L'email est invalide</div>
                      </field-messages>
                    </div>
                  </validate>

                  <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.password)">
                    <div class="field">
                      <label class="label">Mot de passe</label>
                      <div class="control">
                        <input id="password" type="password" password-strength name="password" class="input" required v-model.lazy="password">
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
                        <input id="confirmPassword" type="password" :matches="password" name="confirmPassword" class="input" required v-model.lazy="confirmPassword">
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
import auth from '../auth.js'

export default {
  data () {
    return {
      formstate: {},
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      confirmPassword: null,
      success: false,
      error: false,
      response: null
    }
  },
  methods: {
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
        auth.register(this, this.firstName, this.lastName, this.email, this.password)
      }
    }
  }
}
</script>
