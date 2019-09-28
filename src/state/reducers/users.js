import { fetchWithToken, } from './auth'
import { mapObjectToArray } from '../../utilities/mapObjectToArray'
import { USERS_URL } from './constants'

const GET = 'users/GET'

export const getUsersAsyncActionCreator = (queryString = '') => (dispatch, getState) => {

  return dispatch(fetchWithToken(USERS_URL + '.json?' + queryString))
    .then(data => {
      const mappedData = mapObjectToArray(data)
      dispatch(getActionCreator(mappedData))
      return data
    })
}

export const addUserAsyncActionCreator = (user) => (dispatch, getState) => {

  return dispatch(fetchWithToken(USERS_URL + '.json?',
    {
      method: 'POST',
      body: JSON.stringify(user)
    }
  ))
}

const getActionCreator = (data) => ({
  type: GET,
  data
})

const initialState = {
  data: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET:
      return {
        ...state,
        data: action.data
      }
    default:
      return state
  }
}
