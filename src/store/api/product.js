import api from '@/store/api'

export default {
  add (product) {
    return api.post('userProducts/', product)
  },
  update (id, product) {
    return api.patch('userProducts/' + id + '/', product)
  },
  get (productId) {
    return api.get('userProducts/' + productId)
  },
  delete (id) {
    return api.delete('userProducts/' + id)
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
