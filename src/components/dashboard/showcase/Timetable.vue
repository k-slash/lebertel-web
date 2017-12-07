<template>
  <div class="dashboardShowcaseTimetable">
    <h1 class="title menu-title">Horaires</h1>
    <el-form :model="user" label-position="top" ref="form">
      <el-form-item label="Plus d'informations" prop="showcase.timetable" class="quill-editor">
        <quill-editor ref="timetable"
                      name="timetable"
                      v-model="user.showcase.timetable"
                      :options="editorOption">
        </quill-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.stop="saveShowcase('form')" class="el-large-button" round>Mettre à jour</el-button>
      </el-form-item>
    </el-form>
    <!--<vue-form autocomplete="off" @submit.prevent="onSubmit" :state="formstate" v-model="formstate" enctype="multipart/form-data">

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
    </vue-form>-->
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
      }
    }
  },
  computed: {
    ...Vuex.mapGetters(['user'])
  },
  methods: {
    ...Vuex.mapActions({
      updateShowcase: 'updateShowcase'
    }),

    saveShowcase (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            'timetable': this.user.showcase.timetable
          }
          this.updateShowcase(data)
        } else {
          this.$toast.open({
            message: 'Veuillez vérifier les données saisies',
            type: 'is-danger'
          })
          return false
        }
      })
    }
  }
}
</script>
