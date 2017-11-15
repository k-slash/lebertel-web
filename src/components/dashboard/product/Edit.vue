<template>
  <div class="dashboardProductEdit">
    <h1 class="title menu-title">Édition</h1>
    <b-tabs type="is-toggle" expanded>
      <b-tab-item label="Informations" icon="assignment">
        <br>
        <vue-form name="editProduct" autocomplete="off" @submit.prevent="onSubmit(product.id)" :state="formstate" v-model="formstate" enctype="multipart/form-data">
          <template>
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
                <label class="label">Petite description</label>
                <div class="control">
                  <input id="short_description" type="text" name="short_description" class="input" required v-model="product.short_description">
                </div>
              </div>
              <div class="field">
                <label class="label">Description détaillée</label>
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
          </template>
          <br>
          <div class="py-2 text-center">
            <button class="button is-medium is-primary is-fullwidth" type="submit">Mettre à jour</button>
          </div>
        </vue-form>
      </b-tab-item>
      <b-tab-item label="Images" icon="photo_library">
        <br>
        <el-upload
          :action="url"
          :headers="headers"
          :data="data"
          :before-upload="getFile"
          list-type="picture-card"
          :multiple="multiple"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list=product.images>
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import Vuex from 'vuex'
import store from '@/store'
import conf from '@/conf'

const token = localStorage.getItem('id_token')

export default {
  data () {
    return {
      url: conf.API_URL + 'product/images/',
      headers: {
        'Authorization': 'Bearer ' + token
      },
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
      formstate: {},
      files: [],
      data: {},
      image: '',
      imageSrc: '',
      nbFiles: '',
      multiple: true,
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  beforeRouteEnter (to, from, next) {
    store.dispatch('getProduct', to.params.id).then(res => next())
  },
  computed: {
    ...Vuex.mapGetters(['product'])
  },
  methods: {
    ...Vuex.mapActions({
      updateProduct: 'updateProduct',
      addProductImages: 'addProductImages',
      deleteProductImage: 'deleteProductImage'
    }),
    handleRemove (file, fileList) {
      this.deleteProductImage(file.id)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.thumb_big
      this.dialogVisible = true
    },
    getFile (file) {
      this.data.product = this.product.id
      this.data.image = file
    },
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
        this.updateProduct(id)
      }
    }
  }
}
</script>
