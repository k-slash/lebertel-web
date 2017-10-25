<template>
  <div class="dashboardShowcaseTimetable">
    <h1 class="title menu-title">Horaires</h1>
    <vue-form autocomplete="off" @submit.prevent="onSubmit" :state="formstate" v-model="formstate" enctype="multipart/form-data">

      <div class="field">
        <label class="label">Horaires</label>
        <div class="quill-editor">
          <quill-editor ref="myTextEditor"
                        v-model="user.showcase.timetable"
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

export default {
  data () {
    return {
      name: 'timetable',
      content: '',
      editorOption: {
        placeholder: 'Vos horaires',
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
      formstate: {}
    }
  },
  computed: {
    ...Vuex.mapGetters(['user'])
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

    onSubmit: function () {
      if (this.formstate.$valid) {
        var formData = new FormData()
        formData.append('timetable', this.$store.state.user.user.showcase.timetable)
        this.updateShowcase(formData)
      }
    }
  }
}
</script>
