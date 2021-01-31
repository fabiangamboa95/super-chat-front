import axios from 'axios'
import { getBearerToken } from '../auth/authService'

// export const API_URL = 'http://localhost:3001' //local
export const API_URL = 'https://super-chat-backend.herokuapp.com' //deployed

// consuming services of a NOT rest api aahhahaaha

export const searchUsers = async (query) => {
  const response = await axios.get(API_URL + `/api/search-usernames/${encodeURI(query)}`, {
    headers: {
      Authorization: `Bearer ${getBearerToken()}`
    }
  })
  if (response.data.error) {
    throw response.data.errorMessage
  }
  return { result: response.data.result }
}

export const getConversations = async () => {
  const response = await axios.get(API_URL + '/api/conversations', {
    headers: {
      Authorization: `Bearer ${getBearerToken()}`
    }
  })
  if (response.data.error) {
    throw response.data.errorMessage
  }
  return { result: response.data.result }
}

export const createConversation = async (withId) => {
  const response = await axios.post(API_URL + '/api/new-conversation', {
    withId: withId,
  }, {
    headers: {
      Authorization: `Bearer ${getBearerToken()}`
    }
  })
  if (response.data.error) {
    throw response.data.errorMessage
  }
  return { result: response.data.message }
}

export const getMessages = async (conversationId) => {
  const response = await axios.get(API_URL + `/api/conversation-messages/${encodeURI(conversationId)}`, {
    headers: {
      Authorization: `Bearer ${getBearerToken()}`
    }
  })
  if (response.data.error) {
    throw response.data.errorMessage
  }
  return { result: response.data.result }
}

export const sendMessage = async (conversationId, message) => {
  const response = await axios.post(API_URL + '/api/message', {
    conversationId: conversationId,
    message: message,
  }, {
    headers: {
      Authorization: `Bearer ${getBearerToken()}`
    }
  })
  if (response.data.error) {
    throw response.data.errorMessage
  }
  return { result: response.data.message }
}