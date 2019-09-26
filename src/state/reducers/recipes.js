import { fetchWithToken } from './auth'
import { mapObjectToArray } from '../../services/mapObjectToArray'
import { addSnackbarActionCreator } from './snackbars'
import { RECIPES_URL } from './constants'

const GET = 'users/GET'

export const getRecipesAsyncActionCreator = (queryString = '') => (dispatch) => {

  return fetchWithToken(RECIPES_URL + '.json?' + queryString)
    .then(data => {
      const mappedData = mapObjectToArray(data)
      dispatch(getActionCreator(mappedData))
      return data
    })
}

export const addRecipeAsyncActionCreator = (recipe, queryString = '', withSnackbars = true) => (dispatch, getState) => {
  const auth = getState().auth
  if (auth.idToken) return queryString = queryString + '&auth=' + auth.idToken

  return fetchWithToken(RECIPES_URL + '.json?' + queryString,
    {
      method: 'POST',
      body: JSON.stringify(recipe)
    })
    .then((data) => {
      if (withSnackbars) dispatch(addSnackbarActionCreator('Recipe successfully added.', 'green'))
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
