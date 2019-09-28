import jwt from 'jsonwebtoken'

import { addErrorWithSnackActionCreator } from './errors'
import { getUsersAsyncActionCreator, addUserAsyncActionCreator } from './users'
import { SIGN_IN_URL, SIGN_UP_URL, REFRESH_TOKEN_URL } from './constants'

const SIGNED_IN = 'auth/SIGNED_IN'
const SIGNED_OUT = 'auth/SIGNED_OUT'
const START_FETCHING = 'auth/START_FETCHING'
const STOP_FETCHING = 'auth/STOP_FETCHING'

export const fetchWithToken = (url, options) => (dispatch, getState) => {
  dispatch(startFetchingActionCreator())

  const getUrlWithToken = () => {
    const auth = getState().auth
    if (auth.idToken) {
      return url.includes('?') ?
        url + '&auth=' + auth.idToken
        :
        url + '?auth=' + auth.idToken
    }
    return url
  }
  return fetch(getUrlWithToken(), options)
    .then(r => {
      if (r.status === 401) {
        return Promise.reject()
      }
      return r
    })
    .catch((r) => {
      return dispatch(refreshTokenAsyncActionCreator())
        .catch(() => Promise.reject(r))
        .then(() => fetch(getUrlWithToken(), options))
    })
    .then(r => r.json())
    .then(data => {
      if (data && data.error) return Promise.reject

      return data
    })
    .catch(error => {
      addErrorWithSnackActionCreator(error)
      return error
    })
    .finally((data) => {
      dispatch(stopFetchingActionCreator())
      return data
    })
}

const authFetch = (url, options) => (dispatch, getState) => {
  dispatch(startFetchingActionCreator())

  return fetch(url, options)
    .then(r => r.json())
    .then(data => {
      if (data.error) {
        return Promise.reject(data)
      }
      return data
    })
    .then(data => {
      localStorage.setItem('idToken', data.idToken)
      localStorage.setItem('refreshToken', data.refreshToken)

      dispatch(checkIfUserIsSignedInAsyncActionCreator())

      return data
    })
    .catch(error => {
      dispatch(addErrorWithSnackActionCreator(error))
      return error
    })
    .finally(() => dispatch(stopFetchingActionCreator()))

}

export const checkIfUserIsSignedInAsyncActionCreator = () => (dispatch, getState) => {
  const idToken = localStorage.getItem('idToken')
  const refreshToken = localStorage.getItem('refreshToken')

  if (!checkIfTokenIsValid(idToken) && refreshToken) {
    dispatch(refreshTokenAsyncActionCreator())
    return
  }

  if (idToken && refreshToken) {
    dispatch(signedInActionCreator(idToken, refreshToken))
    const userId = jwt.decode(idToken).user_id
    dispatch(getUsersAsyncActionCreator(userId))
  } else {
    dispatch(signedOutActionCreator())
  }
}

export const signUpAsyncActionCreator = (userName, email, password) => (dispatch, getState) => {
  dispatch(startFetchingActionCreator())
  return dispatch(authFetch(
    SIGN_UP_URL,
    {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true
      })
    }
  ))
    .then(data => {
      if (data && data.email && userName) {
        const user = Object.assign(jwt.decode(data.idToken), { user_name: userName })
        dispatch(addUserAsyncActionCreator(user))
      }
    })
}

export const signInAsyncActionCreator = (email, password) => (dispatch, getState) => {
  dispatch(startFetchingActionCreator())
  return dispatch(authFetch(
    SIGN_IN_URL,
    {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true
      })
    }
  ))
}

export const refreshTokenAsyncActionCreator = () => (dispatch, getState) => {

  return refreshToken()
    .then(data => {
      dispatch(checkIfUserIsSignedInAsyncActionCreator())
      return data
    })
    .catch(() => {
      return Promise.reject
    })

}

const refreshToken = () => {
  const refreshToken = localStorage.getItem('refreshToken')
  if (refreshToken) {
    return fetch(
      REFRESH_TOKEN_URL,
      {
        method: 'POST',
        body: JSON.stringify({
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })
      }
    )
      .then(r => r.json())
      .then(data => {
        if (data.error) {
          return Promise.reject(data)
        }
        return data
      })
      .then(data => {
        localStorage.setItem('idToken', data.id_token)
        localStorage.setItem('refreshToken', data.refresh_token)
        return data
      })
  }
}

const checkIfTokenIsValid = idToken => {
  if (!idToken) return false
  let decoded = null
  try {
    decoded = jwt.decode(idToken)
  } catch (error) {
    return false
  }

  if (!decoded) return false

  return (Number(decoded.exp) * 1000 > Date.now())
}

const signedInActionCreator = (idToken, refreshToken) => ({
  type: SIGNED_IN,
  idToken,
  refreshToken,
  userData: jwt.decode(idToken)
})

const startFetchingActionCreator = () => ({ type: START_FETCHING })

const stopFetchingActionCreator = () => ({ type: STOP_FETCHING })

export const signedOutActionCreator = () => {
  localStorage.removeItem('idToken')
  localStorage.removeItem('refreshToken')
  return { type: SIGNED_OUT }
}

const initialState = {
  isUserLoggedIn: false,
  userData: null,
  idToken: null,
  refreshToken: null,
  isFetching: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNED_IN:
      return {
        ...state,
        idToken: action.idToken,
        refreshToken: action.refreshToken,
        userData: action.userData,
        isUserLoggedIn: true
      }
    case SIGNED_OUT:
      return {
        ...initialState
      }
    case START_FETCHING:
      return {
        ...state,
        isFetching: true
      }
    case STOP_FETCHING:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state
  }
}
