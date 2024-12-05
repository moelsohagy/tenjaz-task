import api from '../../../utils/axios'

export default {
  getAll() {
    return api().get('/users')
  },
  getOne(id) {
    return api().get(`/users/${id}`)
  },
  create(data) {
    return api().post('/users/add', data)
  },
  update(id, data) {
    return api().put(`/users/${id}`, data)
  },
  remove(id) {
    return api().delete(`/users/${id}`)
  }
}
