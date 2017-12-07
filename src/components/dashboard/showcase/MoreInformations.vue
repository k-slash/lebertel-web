<template>
  <div class="dashboardShowcaseMoreInformations">
    <h1 class="title menu-title">Plus d'infos</h1>
    <el-form :model="user" label-position="top" ref="form">
      <el-form-item label="Plus d'informations" prop="showcase.informations" class="quill-editor">
        <quill-editor ref="informations"
                      name="informations"
                      v-model="user.showcase.informations"
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
      name: 'moreInformations',
      content: '',
      editorOption: {
        placeholder: 'Veuillez indiquer ici les informations comme les jours de présence au marché, etc.',
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
            'informations': this.user.showcase.informations
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
