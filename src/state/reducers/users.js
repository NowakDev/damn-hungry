import { fetchWithToken, } from './auth'
import { mapObjectToArray } from '../../services/mapObjectToArray'
import { USERS_URL } from './constants'

const GET = 'users/GET'

export const getUsersAsyncActionCreator = (queryString = '') => (dispatch, getState) => {

  return fetchWithToken(USERS_URL + '.json?' + queryString)
    .then(data => {
      const mappedData = mapObjectToArray(data)
      dispatch(getActionCreator(mappedData))
      return data
    })
}

const getActionCreator = (data) => ({
  type: GET,
  data
})

const initialState = {
  data: null
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
