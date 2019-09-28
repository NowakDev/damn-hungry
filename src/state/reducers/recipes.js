import { fetchWithToken } from './auth'
import { mapObjectToArray } from '../../utilities/mapObjectToArray'
import { addSnackbarActionCreator } from './snackbars'
import { RECIPES_URL } from './constants'

const GET = 'recipes/GET'
const START_FETCHING = 'recipes/START_FETCHING'
const STOP_FETCHING = 'recipes/STOP_FETCHING'

export const getRecipesAsyncActionCreator = (queryString = '') => (dispatch) => {
  return dispatch(fetchWithToken(RECIPES_URL + '.json?' + queryString))
    .then(data => {
      const mappedData = mapObjectToArray(data)
      dispatch(getActionCreator(mappedData))
      return data
    })
}

export const addRecipeAsyncActionCreator = (recipe, queryString, withSnackbars = true) => (dispatch, getState) => {
  dispatch(startFetchingActionCreator())
  return dispatch(fetchWithToken(RECIPES_URL + '.json?' + queryString,
    {
      method: 'POST',
      body: JSON.stringify(recipe)
    }
  ))
    .then((data) => {
      dispatch(stopFetchingActionCreator())
      if (withSnackbars) {
        return dispatch(addSnackbarActionCreator('Recipe successfully added.', 'green'))
      }
      return data
    })
}

const getActionCreator = (data) => ({
  type: GET,
  data
})

const startFetchingActionCreator = () => ({ type: START_FETCHING })

const stopFetchingActionCreator = () => ({ type: STOP_FETCHING })


const initialState = {
  data: null,
  isFetching: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET:
      return {
        ...state,
        data: action.data
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
