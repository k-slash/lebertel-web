<template>
  <div class="dashboardShowcasePresentation">
    <vue-form autocomplete="off" @submit.prevent="onSubmit" :state="formstate" v-model="formstate" enctype="multipart/form-data">
      <div class="dashboard-avatar">
        <VueImgInputer id="logo" name="logo" :imgSrc="auth.user.showcase.logo" v-model="file" theme="light" size="small" bottomText="logo" placeholder="logo" @onChange="updateFile"></VueImgInputer>
      </div>
      <br>
      <div class="field">
        <label class="label">Nom</label>
        <div class="control">
          <input id="name" type="text" name="name" class="input" required v-model="auth.user.showcase.name">
        </div>
        <field-messages name="name" show="$touched || $submitted" class="form-control-feedback">
          <div>Ok !</div>
          <div slot="required">Le nom de la vitrine est requis</div>
        </field-messages>
      </div>
      <div class="field">
        <label class="label">Présentation</label>
        <div class="quill-editor">
          <quill-editor ref="myTextEditor"
                        v-model="auth.user.showcase.presentation"
                        :options="editorOption">
          </quill-editor>
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
import auth from '../../../auth.js'
import VueImgInputer from 'vue-img-inputer'

export default {
  components: {
    VueImgInputer
  },
  data () {
    return {
      name: 'presentation',
      content: '',
      editorOption: {
        placeholder: 'Votre présentation',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'header': [1, 2, 3, false] }],
            ['blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'color': [] }],
            [{ 'align': [] }],
            ['clean']
          ]
        }
      },
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
      formData.append('user', auth.user.info.id)
      formData.append('name', auth.user.showcase.name)
      formData.append('presentation', auth.user.showcase.presentation)
      formData.append('logo', this.file)
      if (this.formstate.$valid) {
        auth.updateShowcase(this, formData)
      }
    }
  },
  computed: {
    editor () {
      return this.$refs.myTextEditor.quill
    }
  }
}
</script>
