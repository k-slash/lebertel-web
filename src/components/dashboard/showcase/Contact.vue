<template>
  <div class="dashboardShowcaseContact">
    <h1 class="title menu-title">Contact</h1>
    <vue-form autocomplete="off" @submit.prevent="onSubmit" :state="formstate" v-model="formstate" enctype="multipart/form-data">

      <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.email)">
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input id="email" type="text" name="email" class="input" v-model="showcase.email">
          </div>
          <field-messages auto-label name="email" show="$touched || $submitted" class="form-control-feedback">
            <div>Ok !</div>
            <div slot="email">L'email est invalide</div>
          </field-messages>
        </div>
      </validate>

      <div class="field">
        <label class="label">Téléphone</label>
        <div class="control">
          <input id="phone" type="text" name="phone" class="input" required v-model="showcase.phone_number">
        </div>
      </div>

      <div class="field">
        <label class="label">Facebook</label>
        <div class="control">
          <input id="facebook" type="text" name="facebook" class="input" required v-model="showcase.facebook">
        </div>
      </div>

      <div class="field">
        <label class="label">LinkedIn</label>
        <div class="control">
          <input id="linkedin" type="text" name="linkedin" class="input" required v-model="showcase.linkedin">
        </div>
      </div>

      <div class="field">
        <label class="label">Twitter</label>
        <div class="control">
          <input id="twitter" type="text" name="twitter" class="input" required v-model="showcase.twitter">
        </div>
      </div>

      <div class="field">
        <label class="label">Pinterest</label>
        <div class="control">
          <input id="pinterest" type="text" name="pinterest" class="input" required v-model="showcase.pinterest">
        </div>
      </div>
      <br>
      <div class="py-2 text-center">
        <button class="button is-medium is-primary is-fullwidth" type="submit">Mettre à jour</button>
      </div>
    </vue-form>
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
    ...Vuex.mapGetters(['showcase'])
  },
  methods: {
    ...Vuex.mapActions({
      updateShowcaseContact: 'updateShowcaseContact'
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
        this.updateShowcaseContact(this)
      }
    }

  }
}
</script>
