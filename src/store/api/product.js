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
  getAllProducts () {
    return api.get('allProducts/')
  },
  getList (page) {
    return api.get('products/?page=' + page)
  },
  getByUser (id) {
    return api.get('user/' + id + '/products/')
  },
  delete (id) {
    return api.delete('products/' + id)
  },
  getProductImages (id) {
    return api.get('products/' + id + '/images/')
  },
  getImage (id) {
    return api.get('product/images/' + id)
  },
  addImage (image) {
    return api.post('product/images/', image)
  },
  deleteImage (imageId) {
    return api.delete('product/images/' + imageId)
  }
}
