import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import auth from './state/reducers/auth'
import users from './state/reducers/users'
import recipes from './state/reducers/recipes'
import errors from './state/reducers/errors'
import snackbars from './state/reducers/snackbars'

const reducer = combineReducers({
  users,
  auth,
  recipes,
  errors,
  snackbars
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)


