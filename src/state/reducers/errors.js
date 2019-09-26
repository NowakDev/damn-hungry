import { addSnackbarActionCreator } from './snackbars'

const ADD = 'errors/ADD'

export const addErrorWithSnackActionCreator = data => dispatch => {
  const message = data && data.error && data.error.message

  if (message === 'EMAIL_NOT_FOUND' || message === "INVALID_PASSWORD" || message === "INVALID_EMAIL")
    dispatch(addSnackbarActionCreator('Niepoprawny e-mail lub hasło.', 'red'))

  if (message === 'EMAIL_EXISTS')
    dispatch(addSnackbarActionCreator('Podany adres e-mail jest już zarejestrowany.', 'red'))


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
