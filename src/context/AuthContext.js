import {createContext} from 'react'

function noop() {}

export const AuthContext = createContext({
  token: null,
  userStauts: 3,
  userName: '',
  login: noop,
  logout: noop,
  isAuthenticated: false
})