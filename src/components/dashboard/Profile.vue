<template>
  <div class="dashboardProfile">
    <vue-form autocomplete="off" @submit.prevent="onSubmit" :state="formstate" v-model="formstate" enctype="multipart/form-data">
      <div class="dashboard-avatar">
        <VueImgInputer id="avatar" name="avatar" :imgSrc="auth.user.profile.avatar" v-model="file" theme="light" size="small" bottomText="avatar" placeholder="avatar" @onChange="updateFile"></VueImgInputer>
      </div>
      <br>
      <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.first_name)">
        <div class="field">
          <label class="label">Prénom</label>
          <div class="control">
            <input id="first_name" type="text" name="first_name" class="input" required v-model="auth.user.info.first_name">
          </div>
          <field-messages name="first_name" show="$touched || $submitted" class="form-control-feedback">
            <div>Ok !</div>
            <div slot="required">Votre prénom est requis</div>
          </field-messages>
        </div>
      </validate>

      <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.last_name)">
        <div class="field">
          <label class="label">Nom</label>
          <div class="control">
            <input id="last_name" type="text" name="last_name" class="input" required v-model="auth.user.info.last_name">
          </div>
          <field-messages name="last_name" show="$touched || $submitted" class="form-control-feedback">
            <div>Ok !</div>
            <div slot="required">Votre nom est requis</div>
          </field-messages>
        </div>
      </validate>

      <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.email)">
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input id="email" type="text" name="email" class="input" required v-model="auth.user.info.email">
          </div>
          <field-messages auto-label name="email" show="$touched || $submitted" class="form-control-feedback">
            <div>Ok !</div>
            <div slot="required">Votre email est requis</div>
            <div slot="email">L'email est invalide</div>
          </field-messages>
        </div>
      </validate>

      <div class="field">
        <label class="label">Téléphone</label>
        <div class="control">
          <input id="phone" type="text" name="phone" class="input" required v-model="auth.user.profile.phone_number">
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
import auth from '../../auth.js'
import Vue2Leaflet from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import VueImgInputer from 'vue-img-inputer'

export default {
  components: {
    'v-map': Vue2Leaflet.Map,
    'v-tilelayer': Vue2Leaflet.TileLayer,
    'v-marker': Vue2Leaflet.Marker,
    'v-tooltip': Vue2Leaflet.Tooltip,
    'v-popup': Vue2Leaflet.Popup,
    VueImgInputer
  },
  data () {
    return {
      auth: auth,
      formstate: {},
      file: '',
      image: ''
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

    updateFile (file) {
      this.file = file
    },

    onSubmit: function () {
      var formData = new FormData()
      var formDataProfile = new FormData()
      formData.append('first_name', auth.user.info.first_name)
      formData.append('last_name', auth.user.info.last_name)
      formData.append('email', auth.user.info.email)
      formDataProfile.append('user', auth.user.info.id)
      formDataProfile.append('avatar', this.file)
      formDataProfile.append('phone_number', auth.user.profile.phone_number)
      if (this.formstate.$valid) {
        auth.updateProfile(this, formData, formDataProfile)
      }
    }
  }
}
</script>
