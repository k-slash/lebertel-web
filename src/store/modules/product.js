import { Toast } from 'buefy'
import Product from '@/store/api/product'
import Showcase from '@/store/api/showcase'
import User from '@/store/api/user'
import router from '@/router'

// state
const state = {
  products: [],
  product: {
    id: null,
    owner: null,
    name: null,
    price: null,
    short_description: null,
    description: null,
    size: null,
    colors: null,
    materials: null,
    images: []
  },
  productImageAdded: {
    image: null,
    display_order: null
  }
}

// getters
const getters = {
  product: state => state.product,
  products: state => state.products
}

// mutations
const mutations = {
  SET_USER_PRODUCTS: function (state, data) {
    state.products = data
  },
  SET_PRODUCT_OWNER_SHOWCASE: function (state, data) {
    state.product.owner = data
  },
  SET_PRODUCT_OWNER_USER: function (state, data) {
    state.product.owner.user = data
  },
  ADD_PRODUCT: function (state, data) {
    state.products += data
  },
  SET_PRODUCT: function (state, data) {
    state.product = data
  },
  SET_PRODUCT_IMAGES: function (state, data) {
    state.product.images = data
  },
  SET_PRODUCT_IMAGE_ADDED: function (state, data) {
    state.productImageAdded.image = data
  },
  SET_PRODUCT_IMAGE_ADDED_DISPLAY_ORDER: function (state, data) {
    state.productImageAdded.display_order = data
  },
  INIT_PRODUCT_IMAGE_ADDED: function (state) {
    state.productImageAdded.image = null
    state.productImageAdded.display_order = null
  },
  INIT_PRODUCT: function (state) {
    state.product.id = null
    state.product.owner = null
    state.product.name = null
    state.product.price = null
    state.product.short_description = null
    state.product.description = null
    state.product.size = null
    state.product.colors = null
    state.product.materials = null
  }
}

// actions
const actions = {
  async addProduct ({ commit, state }, form) {
    try {
      const p = await Product.add(form)
      console.log(p)
      Toast.open({
        message: 'Ok ! C\'est sauvegardé',
        type: 'is-success'
      })
      router.push({
        name: 'dashboard.product.edit',
        params: { id: p.data.id }
      })
    } catch (e) {
      console.log(e)
      Toast.open({
        message: 'Oups ! Il y a eu un problème lors de la sauvegarde',
        type: 'is-danger'
      })
    }
  },

  async initProduct ({ commit, state }) {
    try {
      await commit('INIT_PRODUCT')
    } catch (e) {
      console.log(e)
      Toast.open({
        message: 'Initialisation du produit impossible',
        type: 'is-danger'
      })
    }
  },

  async getProduct ({ commit, state }, id) {
    try {
      console.log(id)
      const p = await Product.get(id)
      console.log(p.data)
      await commit('SET_PRODUCT', p.data)
      const s = await Showcase.get(p.data.owner)
      await commit('SET_PRODUCT_OWNER_SHOWCASE', s.data)
      const u = await User.get(s.data.user)
      await commit('SET_PRODUCT_OWNER_USER', u.data)
      const images = await Product.getProductImages(id)
      await commit('SET_PRODUCT_IMAGES', images.data)
    } catch (e) {
      console.log(e)
      Toast.open({
        message: 'Oups ! Il y a eu un problème lors du chargement du produit',
        type: 'is-danger'
      })
    }
  },

  async getProducts ({ commit, state }) {
    try {
      const userProducts = await User.getUserProducts()
      await commit('SET_USER_PRODUCTS', userProducts.data)
    } catch (e) {
      console.log(e)
      Toast.open({
        message: 'Oups ! Il y a eu un problème lors du chargement des produits',
        type: 'is-danger'
      })
    }
  },

  async getProductsByUser ({ commit, state }, id) {
    try {
      const userProducts = await Product.getByUser(id)
      console.log(userProducts)
      await commit('SET_USER_PRODUCTS', userProducts.data)
    } catch (e) {
      console.log(e)
      Toast.open({
        message: 'Oups ! Il y a eu un problème lors du chargement des produits',
        type: 'is-danger'
      })
    }
  },

  async updateProduct ({ commit, state }, id) {
    try {
      await Product.update(id, state.product)
      Toast.open({
        message: 'Ok ! C\'est sauvegardé',
        type: 'is-success'
      })
    } catch (e) {
      console.log(e)
      Toast.open({
        message: 'Oups ! Il y a eu un problème lors du chargement des produits',
        type: 'is-danger'
      })
    }
  },

  async deleteProduct ({ commit, state }, id) {
    try {
      await Product.delete(id)
      const listProducts = await User.getUserProducts()
      await commit('SET_USER_PRODUCTS', listProducts.data)
    } catch (e) {
      console.log(e)
      Toast.open({
        message: 'Oups ! Il y a eu un problème lors de la suppression du produit',
        type: 'is-danger'
      })
    }
  },

  async addProductImages ({ commit, state }, id) {
    try {
      var formData = new FormData()
      formData.append('product', id)
      formData.append('image', state.productImageAdded.image)
      formData.append('display_order', state.productImageAdded.display_order)
      await Product.addImage(formData)
      await commit('INIT_PRODUCT_IMAGE_ADDED')
      Toast.open({
        message: 'Ok ! L\'image a été ajoutée',
        type: 'is-success'
      }).then(
        router.go(router.currentRoute)
      )
    } catch (e) {
      console.log(e)
      Toast.open({
        message: 'Oups ! Il y a eu un problème lors de l\'ajout de l\'image',
        type: 'is-danger'
      })
    }
  },

  async deleteProductImage ({ commit, state }, id) {
    try {
      await Product.deleteImage(id)
      Toast.open({
        message: 'Ok ! L\'image a été supprimée',
        type: 'is-success'
      }).then(
        router.go(router.currentRoute)
      )
    } catch (e) {
      console.log(e)
      Toast.open({
        message: 'Oups ! Il y a eu un problème lors de la suppression de l\'image',
        type: 'is-danger'
      })
    }
  }

}

export default {
  state,
  getters,
  mutations,
  actions
}
