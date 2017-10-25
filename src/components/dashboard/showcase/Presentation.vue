<template>
  <div class="dashboardShowcasePresentation">
    <vue-form autocomplete="off" @submit.prevent="onSubmit" :state="formstate" v-model="formstate" enctype="multipart/form-data">
      <div class="dashboard-avatar">
        <VueImgInputer id="logo" name="logo" :imgSrc="user.showcase.logo" v-model="file" theme="light" size="small" bottomText="logo" placeholder="logo" @onChange="updateFile"></VueImgInputer>
      </div>
      <br>
      <div class="field">
        <label class="label">Nom</label>
        <div class="control">
          <input id="name" type="text" name="name" class="input" required v-model="user.showcase.name">
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
                        v-model="user.showcase.presentation"
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
import Vuex from 'vuex'
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
      formstate: {},
      file: null,
      image: ''
    }
  },
  methods: {
    ...Vuex.mapActions({
      updateShowcase: 'updateShowcase'
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

    updateFile (file) {
      this.file = file
    },

    onSubmit: function () {
      if (this.formstate.$valid) {
        var formData = new FormData()
        formData.append('name', this.$store.state.user.user.showcase.name)
        formData.append('presentation', this.$store.state.user.user.showcase.presentation)
        if (this.file != null) {
          formData.append('logo', this.file)
        }
        this.updateShowcase(formData)
      }
    }
  },
  computed: {
    ...Vuex.mapGetters(['user']),
    editor () {
      return this.$refs.myTextEditor.quill
    }
  }
}
</script>
