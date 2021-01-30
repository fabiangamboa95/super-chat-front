import axios from 'axios'

const API_URL = 'http://localhost:3001'

export const signUp = ({ username, password }) => axios.post(API_URL + '/signup', {
  username: username,
  passwd: password,
})

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