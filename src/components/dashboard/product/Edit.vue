<template>
  <div class="dashboardProductEdit">
    <h1 class="title menu-title">Édition</h1>
    <b-tabs type="is-toggle" expanded>
      <b-tab-item label="Informations" icon="assignment">
        <br>
        <el-form :model="product" label-position="top" :rules="rules" ref="form">
          <el-form-item label="Nom" prop="name">
            <el-input v-model="product.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="Prix" prop="price">
            <el-input-number controls-position="right" v-model="product.price"></el-input-number> <span class="currency">€</span>
          </el-form-item>
          <el-form-item label="Petite description" prop="short_description">
            <el-input v-model="product.short_description" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="Description" prop="short_description" class="quill-editor">
            <quill-editor ref="description"
                          name="description"
                          v-model="product.description"
                          :options="editorOption">
            </quill-editor>
          </el-form-item>
          <el-form-item label="Taille" prop="size">
            <el-input v-model="product.size" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="Couleurs" prop="color">
            <el-input v-model="product.colors" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="Matériaux" prop="materials">
            <el-input v-model="product.materials" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="Ingrédients" prop="ingredients">
            <el-input v-model="product.ingredients" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.stop="saveProduct('form')" class="el-large-button" round>Mettre à jour</el-button>
          </el-form-item>
        </el-form>
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
      rules: {
        name: [
          { required: true, message: 'Le nom du produit est requis', trigger: 'blur' }
        ]
      },
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
    saveProduct (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            'id': this.product.id,
            'owner': this.product.owner.user.id,
            'name': this.product.name,
            'price': this.product.price,
            'short_description': this.product.short_description,
            'description': this.product.description,
            'size': this.product.size,
            'colors': this.product.colors,
            'materials': this.product.materials,
            'ingredients': this.product.ingredients
          }
          this.updateProduct(data)
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
