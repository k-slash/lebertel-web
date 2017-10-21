import api from '@/store/api'

export default {
  getShowcase () {
    return api.get('user/showcase/')
  },
  get (id) {
    return api.get('showcases/' + id + '/')
  },
  updateShowcase (showcase) {
    return api.patch('user/showcase/', showcase)
  },
  getShowcaseImages (id) {
    return api.get('showcases/' + id + '/images/')
  },
  addImage (image) {
    return api.post('showcase/images/', image)
  },
  deleteImage (imageId) {
    return api.delete('showcase/images/' + imageId)
  }
}
