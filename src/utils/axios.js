import axios from 'axios'
import { API_BASE_URL } from '../config/constant'
import { showAlert } from '../utils/sweetalert'

const API_TIMEOUT = 20000

export const apiResponseCatch = (error) => {
  const status = error?.response?.status ?? 0

  if (status != 422) {
    showAlert(error?.response?.data?.message ?? 'API Error', 'error')
    console.log('error: ', error)
  }

  return Promise.reject(error)
}

export default () => {
  const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    timeout: API_TIMEOUT
  })
  apiClient.interceptors.response.use((response) => {
    return response
  }, apiResponseCatch)
  return apiClient
}
