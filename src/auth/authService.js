import axios from 'axios'
import { API_URL } from '../services'

export const signUp = async ({ username, password }) => {
  const response = await axios.post(API_URL + '/signup', {
    username: username,
    passwd: password,
  })
  if (response.data.error) {
    throw response.data.errorMessage
  }

  return { token: response.data.token }
}

export const signIn = async ({ username, password }) => {
  const response = await axios.post(API_URL + '/signin', {
    username: username,
    passwd: password,
  })
  if (response.data.error) {
    throw response.data.errorMessage
  }

  return { token: response.data.token }
}

export const getBearerToken = () => JSON.parse(sessionStorage.getItem('bearer-token')).token