import api from '@/store/api'

export default {
  getListShowcases (page) {
    return api.get('showcases/?page=' + page)
    // return api.get('showcases/?limit=' + limit + '&offset=' + offset)
  },
  getAllShowcases () {
    return api.get('allShowcases/')
    // return api.get('showcases/?limit=' + limit + '&offset=' + offset)
  },
  getShowcase () {
    return api.get('user/showcase/')
  },
  get (id) {
    return api.get('showcases/' + id + '/')
  },
  getById (id) {
    return api.get('showcasesById/' + id + '/')
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
