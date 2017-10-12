import api from '@/store/api'

export default {
  getShowcase () {
    return api.get('user/showcase/')
  },
  updateShowcase (showcase) {
    return api.patch('user/showcase/', showcase)
  },
  getShowcaseImages (id) {
    return api.get('showcases/' + id + '/images/')
  },
  addImage (image) {
    return api.post('showcases/images/', image)
  },
  deleteImage (imageId) {
    return api.delete('showcases/images/' + imageId)
  }
}
