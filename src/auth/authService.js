import axios from 'axios'

const API_URL = 'http://localhost:3001'

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