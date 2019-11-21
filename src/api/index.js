import { extend } from 'lodash'

const HOST = process.env.API_URL || ''
const PATH = process.env.API_PATH || ''
const ENDPOINTS = {
  LOGIN: 'login',
  AUTHENTICATE: ''
}

const getOption = () => {
  return {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    redirect: 'follow'
  }
}
const makeURL = endpoint => `${HOST}${PATH}${endpoint}`

export const authenticate = params => {
  const { username, password } = params
  const url = makeURL(ENDPOINTS.LOGIN)
  const body = {
    username,
    password
  }
  const method = 'POST'
  const option = extend(getOption(), {
    body,
    method
  }) 
  return fetch(url, option)
}

// export const authenticate = () => {
//   const url = makeURL(ENDPOINTS.AUTHENTICATE)
//   const method = 'POST'
//   const option = extend(getOption(), {
//     method
//   })
//   return fetch(url, option)
// }