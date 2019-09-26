import { addSnackbarActionCreator } from './snackbars'

const ADD = 'errors/ADD'

export const addErrorWithSnackActionCreator = data => dispatch => {
  const message = data && data.error && data.error.message

  if (message === 'EMAIL_NOT_FOUND' || message === "INVALID_PASSWORD" || message === "INVALID_EMAIL")
    dispatch(addSnackbarActionCreator('Invalid email or password.', 'red'))

  if (message === 'EMAIL_EXISTS')
    dispatch(addSnackbarActionCreator('This email adres already exists. Please try another one.', 'red'))


  dispatch(addActionCreator(data))
}

const addActionCreator = error => ({
  type: ADD,
  error
})

const initialState = {
  errors: []

}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        errors: [...state.errors, action.error]
      }
    default:
      return state
  }
}
