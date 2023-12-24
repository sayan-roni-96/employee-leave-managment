import axios from 'axios'
import { apiHost } from './constants'
const API = axios.create({
  baseURL: apiHost,
})

// intercepter created
API.interceptors.request.use((config) => {
  const userData = localStorage.getItem('userdata')
  const parsedUserData = JSON.parse(userData)
  console.log('parsedUserData=>', parsedUserData)
  config.headers.Authorization = userData ? `Bearer ${parsedUserData.token}` : ''
  return config
})
export { API as default }
