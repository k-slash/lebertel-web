<template>
  <div class="dashboardProductAdd">
    <h1 class="title menu-title">Ajout</h1>
    <vue-form name="addProduct" autocomplete="off" @submit.prevent="onSubmit(user.info.id)" :state="formstate" v-model="formstate" enctype="multipart/form-data">

      <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.name)">
        <div class="field">
          <label class="label">Nom</label>
          <div class="control">
            <input id="name" type="text" name="name" class="input" v-model="product.name">
          </div>
        </div>
        <div class="field">
          <label class="label">Prix</label>
          <div class="control price">
            <input id="price" type="number" step="any" name="price" class="input small" required v-model="product.price"> <span class="currency">€</span>
          </div>
        </div>
        <div class="field">
          <label class="label">Petite description</label>
          <div class="control">
            <input id="short_description" type="text" name="short_description" class="input" required v-model="product.short_description">
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
        <div class="field">
          <label class="label">Taille</label>
          <div class="control">
            <input id="size" type="text" name="size" class="input" required v-model="product.size">
          </div>
        </div>
        <div class="field">
          <label class="label">Couleurs</label>
          <div class="control">
            <input id="colors" type="text" name="size" class="input" required v-model="product.colors">
          </div>
        </div>
        <div class="field">
          <label class="label">Matériaux</label>
          <div class="control">
            <input id="materials" type="text" name="materials" class="input" required v-model="product.materials">
          </div>
        </div>
      </validate>
      <br>
      <div class="py-2 text-center">
        <button class="button is-medium is-primary is-fullwidth" type="submit">Ajouter</button>
      </div>
    </vue-form>
  </div>
</template>

<script>
import Vuex from 'vuex'
import store from '@/store'

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
    store.dispatch('initProduct').then(res => next())
  },

  computed: {
    ...Vuex.mapGetters(['user', 'product'])
  },
  methods: {
    ...Vuex.mapActions({
      initProduct: 'initProduct',
      addProduct: 'addProduct'
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

    onSubmit: function (id) {
      if (this.formstate.$valid) {
        var formData = new FormData()
        formData.append('owner', id)
        formData.append('name', this.$store.state.product.product.name)
        formData.append('price', this.$store.state.product.product.price)
        formData.append('short_description', this.$store.state.product.product.short_description)
        formData.append('description', this.$store.state.product.product.description)
        formData.append('size', this.$store.state.product.product.size)
        formData.append('colors', this.$store.state.product.product.colors)
        formData.append('materials', this.$store.state.product.product.materials)
        this.addProduct(formData)
      }
    }
  }
}
</script>
