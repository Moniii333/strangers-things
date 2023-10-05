// helper functions

export const loggedIn = (token, setToken) => {
  setToken(token)
  sessionStorage.setItem('token', token)
}
// remove token
export const loggedOut = () => {
  sessionStorage.removeItem('token')
}
// confirms they have token thus they are in
export const isLoggedIn = (token) => {
  return !!token
}

// headers
export const headerUtils = (token) => {
  const headers = {
    'Content-Type': 'application/json'
  }
  if(isLoggedIn(token)) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}