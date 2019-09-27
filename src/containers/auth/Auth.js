import React from 'react'

import { connect } from 'react-redux'
import { signInAsyncActionCreator, signUpAsyncActionCreator } from '../../state/reducers/auth'

import SignIn from './SignIn'
import SignUp from './SignUp'

class Auth extends React.Component {
  state = {
    email: '',
    password: '',
    password1: '',
    showSignIn: true,
    signUpInputError: {
      wrongEmail: false,
      passwordToShort: false,
      passwordsDontMatch: false
    },
    signInInputError: {
      wrongEmailOrPassword: false
    }
  }

  handleChange = (input) => (event) => (
    this.setState({ [input]: event.target.value })
  )

  handleSignIn = () => {
    if (!this.state.signInInputError.wrongEmailOrPassword)
      this.props._signIn(this.state.email, this.state.password)
  }

  handleSignUp = () => {
    const { wrongEmail, passwordToShort, passwordsDontMatch } = this.state.signUpInputError
    if (!wrongEmail || !passwordToShort || !passwordsDontMatch)
      this.props._signUp(this.state.email, this.state.password)
  }

  toggleForm = () => (
    this.setState({ showSignIn: !this.state.showSignIn })
  )

  render() {
    console.log(this.props)
    return (
      <div>
        {
          this.props._isUserLoggedIn ?
            this.props.children
            :
            this.state.showSignIn ?
              <SignIn
                email={this.state.email}
                password={this.state.password}
                handleChange={this.handleChange}
                handleSignIn={this.handleSignIn}
                toggleForm={this.toggleForm}
                errors={this.state.signInInputError}
                _isFetching={this.props._isFetching}
              />
              :
              <SignUp
                email={this.state.email}
                password={this.state.password}
                password1={this.state.password1}
                handleChange={this.handleChange}
                handleSignUp={this.handleSignUp}
                toggleForm={this.toggleForm}
                errors={this.state.signUpInputError}
                _isFetching={this.props._isFetching}
                toggleForgotPassword={this.toggleForgotPassword}
              />
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    _isUserLoggedIn: state.auth.isUserLoggedIn,
    _isFetching: state.auth.isFetching
  }
}

const mapDispatchToProps = dispatch => ({
  _signIn: (email, password) => dispatch(signInAsyncActionCreator(email, password)),
  _signUp: (email, password) => dispatch(signUpAsyncActionCreator(email, password)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth)
