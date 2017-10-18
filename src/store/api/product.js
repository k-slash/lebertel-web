import api from '@/store/api'

export default {
  add (product) {
    return api.post('products/', product)
  },
  update (id, product) {
    return api.patch('products/' + id + '/', product)
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
