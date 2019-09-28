import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import { store } from './store'
import Auth from './containers/auth/Auth'
import Snackbar from './components/snackbars/Snackbar'

ReactDOM.render(
  <Provider store={store}>
    <Auth>
      <App />
    </Auth>
    <Snackbar />
  </Provider>,
  document.querySelector('#root')
)
