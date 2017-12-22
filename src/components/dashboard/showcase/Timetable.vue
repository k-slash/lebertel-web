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
            [{ 'size': ['small', false, 'large'] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }]
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
