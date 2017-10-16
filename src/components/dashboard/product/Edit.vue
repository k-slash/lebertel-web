<template>
  <div class="dashboardProductEdit">
    <h1 class="title menu-title">Édition</h1>
    <vue-form name="editProduct" autocomplete="off" @submit.prevent="onSubmit" :state="formstate" v-model="formstate" enctype="multipart/form-data">

      <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.name)">
        <div class="field">
          <label class="label">Nom</label>
          <div class="control">
            <input id="name" type="text" name="name" class="input" v-model="product.name">
          </div>
        </div>
        <div class="field">
          <label class="label">Prix</label>
          <div class="control">
            <input id="price" type="text" name="price" class="input" required v-model="product.price">
          </div>
        </div>

        <div class="field">
          <label class="label">Description</label>
          <div class="quill-editor">
            <quill-editor ref="description"
                          name="description"
                          v-model="product.description"
                          :options="editorOption">
            </quill-editor>
          </div>
        </div>
      </validate>
      <br>
      <div class="py-2 text-center">
        <button class="button is-medium is-primary is-fullwidth" type="submit">Mettre à jour</button>
      </div>
    </vue-form>
  </div>
</template>

<script>
import Vuex from 'vuex'
import store from '@/store'
// import router from '@/router'

export default {
  data () {
    return {
      name: 'description',
      content: '',
      editorOption: {
        placeholder: 'Veuillez indiquer ici la description de votre produit.',
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
  beforeRouteEnter (to, from, next) {
    store.dispatch('getProduct', to.params.id).then(res => next())
  },

  computed: {
    ...Vuex.mapGetters(['product'])
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
        this.updateProduct(this)
      }
    }
  }
}
</script>
