import api from '@/store/api'

export default {
  getListByCategory (c) {
    return api.get('professions/?search=' + c)
  }
}
