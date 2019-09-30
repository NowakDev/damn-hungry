import React from 'react'
import { connect } from 'react-redux'

import { signInAsyncActionCreator, signUpAsyncActionCreator } from '../../state/reducers/auth'
import { addSnackbarActionCreator } from '../../state/reducers/snackbars'
import SignIn from './SignIn'
import SignUp from './SignUp'

class Auth extends React.Component {
  state = {
    userName: '',
    email: '',
    password: '',
    password1: '',
    showSignIn: true,
    signUpErrors: {
      userNameError: false,
      emailError: false,
      passwordError: false,
      password1Error: false
    }
  }

  handleChange = (name) => (event) => (
    this.setState({ [name]: event.target.value.trim() })
  )

  handleSignIn = () => {
    if (!this.state.email || !this.state.password) {
      this.props._snackbar('Enter your email and password.', 'red')
    }

    if (this.state.email && this.state.password)
      this.props._signIn(this.state.email, this.state.password)
        .then(() => (
          this.setState({
            ...this.state,
            password: ''
          })
        ))
  }

  handleSignUp = () => {
    const { userName, email, password, password1 } = this.state
    const { userNameError, emailError, passwordError, password1Error } = this.state.signUpErrors

    const noEmptyField = userName && email && password && password1 && password === password1
    const noError = !userNameError && !emailError && !passwordError && !password1Error

    if (!noEmptyField || !noError) {
      this.props._snackbar('Fill in all fields according to instructions.', 'red')
    }

    if (noEmptyField && noError) {
      this.props._signUp(this.state.userName, this.state.email, this.state.password)
        .then(() => (
          this.setState({
            ...this.state,
            password: '',
            password1: ''
          })
        ))
        .then(() => {
          this.setState({
            ...this.state,
            showSignIn: true
          })
        })
    }
  }

  toggleForm = () => (
    this.setState({ showSignIn: !this.state.showSignIn })
  )

  formValidation = (name, event) => {
    const { value } = event.target
    const userNameTest = /^[A-Za-z0-9_-]{3,20}$/
    const emailTest = /[a-z0-9._%+!$&*=^|~#%'`?{}/-]+@([a-z0-9-]+.){1,}([a-z]{2,16})/
    switch (true) {
      case name === 'userNameError'
        && !userNameTest.test(value):
        this.setState({
          signUpErrors: {
            ...this.state.signUpErrors,
            [name]: true
          }
        })
        break
      case name === 'emailError'
        && !emailTest.test(value):
        this.setState({
          signUpErrors: {
            ...this.state.signUpErrors,
            [name]: true
          }
        })
        break
      case name === 'passwordError'
        && value.length < 6:
        this.setState({
          signUpErrors: {
            ...this.state.signUpErrors,
            [name]: true
          }
        })
        break
      case name === 'password1Error'
        && value !== this.state.password:
        this.setState({
          signUpErrors: {
            ...this.state.signUpErrors,
            [name]: true
          }
        })
        break

      default:
        this.setState({
          signUpErrors: {
            ...this.state.signUpErrors,
            [name]: false
          }
        })
        break
    }
  }

  handleOnBlur = (name) => (event) => {
    this.formValidation(name, event)
  }

  handleOnFocus = (name) => () => {
    this.setState({
      signUpErrors: {
        ...this.state.signUpErrors,
        [name]: false
      }
    })
  }

  onEnter = event => {
    if (event.key === 'Enter') {
      this.state.showSignIn ?
        this.handleSignIn()
        :
        this.handleSignUp()
    }
  }

  render() {
    return (
      <div>
        {
          this.props._isUserLoggedIn ?
            this.props.children
            :
            this.state.showSignIn ?
              <SignIn
                errors={this.state.signInErrors}
                email={this.state.email}
                password={this.state.password}
                handleChange={this.handleChange}
                handleSignIn={this.handleSignIn}
                toggleForm={this.toggleForm}
                _isFetching={this.props._isFetching}
              />
              :
              <SignUp
                onKeyPress={this.onEnter}
                onBlur={this.handleOnBlur}
                onFocus={this.handleOnFocus}
                userName={this.state.userName}
                email={this.state.email}
                password={this.state.password}
                password1={this.state.password1}
                handleChange={this.handleChange}
                handleSignUp={this.handleSignUp}
                toggleForm={this.toggleForm}
                errors={this.state.signUpErrors}
                _isFetching={this.props._isFetching}
              />
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    _isUserLoggedIn: state.auth.isUserLoggedIn,
    _isFetching: state.auth.isFetching
  }
}

const mapDispatchToProps = dispatch => ({
  _signIn: (email, password) => dispatch(
    signInAsyncActionCreator(email, password)
  ),
  _signUp: (userName, email, password) => dispatch(
    signUpAsyncActionCreator(userName, email, password)
  ),
  _snackbar: (text, color) => dispatch(
    addSnackbarActionCreator(text, color))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth)
