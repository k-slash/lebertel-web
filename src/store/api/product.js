import api from '@/store/api'

export default {
  add (product) {
    return api.post('products/', product)
  },
  update (product) {
    return api.patch('product/', product)
  },
  get (productId) {
    return api.get('products/' + productId)
  },
  delete (id) {
    return api.delete('products/' + id)
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
