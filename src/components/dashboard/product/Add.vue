<template>
  <div class="dashboardProductAdd">
    <h1 class="title menu-title">Ajout</h1>
    <el-form :model="form" label-position="top" :rules="rules" ref="form">
      <el-form-item label="Nom" prop="name">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Prix" prop="price">
        <el-input-number controls-position="right" v-model="form.price"></el-input-number> <span class="currency">€</span>
      </el-form-item>
      <el-form-item label="Petite description" prop="short_description">
        <el-input v-model="form.short_description" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Description" prop="short_description" class="quill-editor">
        <quill-editor ref="description"
                      name="description"
                      v-model="form.description"
                      :options="editorOption">
        </quill-editor>
      </el-form-item>
      <el-form-item label="Taille" prop="size">
        <el-input v-model="form.size" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Poids" prop="size">
        <el-input v-model="form.weight" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Volume" prop="size">
        <el-input v-model="form.volume" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Couleurs" prop="color">
        <el-input v-model="form.colors" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Matériaux" prop="materials">
        <el-input v-model="form.materials" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Ingrédients" prop="ingredients">
        <el-input v-model="form.ingredients" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Quantité" prop="quantity">
        <el-input-number controls-position="right" v-model="form.quantity"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.stop="saveProduct('form')" class="el-large-button" round>Ajouter</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Vuex from 'vuex'
import store from '@/store'

export default {
  data () {
    return {
      form: {
        name: '',
        price: '0.00',
        short_description: '',
        description: '',
        size: '',
        weight: '',
        volume: '',
        colors: '',
        materials: '',
        ingredients: '',
        quantity: ''
      },
      rules: {
        name: [
          { required: true, message: 'Le nom du produit est requis', trigger: 'blur' }
        ]
      },
      name: 'description',
      content: '',
      editorOption: {
        placeholder: 'Veuillez indiquer ici la description de votre produit.',
        modules: {
          toolbar: [
            [{ 'size': ['small', false, 'large'] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }]
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

    saveProduct (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            'owner': this.user.info.id,
            'name': this.form.name,
            'price': this.form.price,
            'short_description': this.form.short_description,
            'description': this.form.description,
            'size': this.form.size,
            'weight': this.form.weight,
            'volume': this.form.volume,
            'colors': this.form.colors,
            'materials': this.form.materials,
            'ingredients': this.form.ingredients,
            'quantity': this.form.quantity
          }
          this.addProduct(data)
        } else {
          this.$toast.open({
            message: 'Le nom du produit est requis',
            type: 'is-danger'
          })
          return false
        }
      })
    }
  }
}
</script>
