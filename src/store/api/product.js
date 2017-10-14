import api from '@/store/api'

export default {
  addProduct (product) {
    return api.post('products/', product)
  },
  updateProduct (product) {
    return api.patch('product/', product)
  },
  getProduct (productId) {
    return api.get('products/' + productId)
  },
  getProductImages (id) {
    return api.get('products/' + id + '/images/')
  },
  addImage (image) {
    return api.post('products/images/', image)
  },
  deleteImage (imageId) {
    return api.delete('products/images/' + imageId)
  }
}
