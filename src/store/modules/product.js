import { Toast } from 'buefy'
import Product from '@/store/api/product'
import User from '@/store/api/User'

// state
const state = {
  products: [],
  product: {
    id: null,
    name: null,
    price: null,
    description: null
  },
  productImageAdded: {
    image: null,
    display_order: null
  },
  productImageToDelete: null
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
  ADD_PRODUCT: function (state, data) {
    state.products += data
  },
  SET_PRODUCT: function (state, data) {
    state.product = data
  },
  SET_PRODUCT_IMAGE_ADDED: function (state, data) {
    state.productImageAdded.image = data
  },
  SET_PRODUCT_IMAGE_ADDED_DISPLAY_ORDER: function (state, data) {
    state.productImageAdded.display_order = data
  },
  SET_PRODUCT_IMAGE_TO_DELETE: function (state, data) {
    state.productImageToDelete = data
  },
  INIT_PRODUCT_IMAGE_ADDED: function (state) {
    state.productImageAdded.image = null
    state.productImageAdded.display_order = null
  },
  INIT_PRODUCT: function (state) {
    state.product.owner = null
    state.product.name = null
    state.product.price = null
    state.product.description = null
  }
}

// actions
const actions = {
  async addProduct (store) {
    try {
      var formData = new FormData()
      formData.append('owner', store.state.product.owner)
      formData.append('name', store.state.product.name)
      formData.append('price', store.state.product.price)
      formData.append('description', store.state.product.description)
      await Product.addProduct(formData)
      await store.commit('INIT_IMAGE_ADDED')
      Toast.open({
        message: 'Ok ! C\'est sauvegardé',
        type: 'is-success'
      })
    } catch (e) {
      console.log(e)
      Toast.open({
        message: 'Oups ! Il y a eu un problème lors de la sauvegarde',
        type: 'is-danger'
      })
    }
  },

  async getProduct ({ commit, state }, id) {
    try {
      const product = await Product.get(id)
      await commit('SET_PRODUCT', product.data)
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
      const product = await Product.get(id)
      await commit('SET_PRODUCT', product.data)
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
      const product = await Product.delete(id)
      console.log(product)
      const listProducts = await User.getUserProducts()
      await commit('SET_USER_PRODUCTS', listProducts.data)
    } catch (e) {
      console.log(e)
      Toast.open({
        message: 'Oups ! Il y a eu un problème lors de la suppression du produit',
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
