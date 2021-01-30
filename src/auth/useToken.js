// custom hook for authentication

import { useState } from "react"

// this can be easily converted to localStorage instead,
// to save token across browser windows or keep logged in after browser closes

const useToken = () => {
  const [token, setToken] = useState(() =>
    JSON.parse(sessionStorage.getItem('bearer-token'))?.token)

  const saveToken = bearerToken => {
    sessionStorage.setItem('bearer-token', JSON.stringify(bearerToken))
    setToken(bearerToken.token)
  }

  return {
    setToken: saveToken,
    token
  }
}

export default useToken