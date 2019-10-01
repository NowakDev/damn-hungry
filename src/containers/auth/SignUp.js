import React from 'react'

import { Paper, TextField, Button, Typography, CircularProgress, Divider } from '@material-ui/core'

const styles = {
  paper: {
    width: 500,
    height: 550,
    maxWidth: '95vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  div: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw'
  },
  divider: {
    marginTop: 10,
    marginBottom: 10
  },
  signIn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  signUpButton: {
    margin: 15,
    marginBottom: 0,
    width: 100
  },
  signInButton: {
    margin: 5,
    padding: 2,
    width: 70
  },
  header: {
    width: '85%',
    textAlign: 'center',
    margin: '15px auto',
    position: 'absolute',
    top: 0
  },
  form: {
    width: '80%',
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '85%',
    margin: '10px auto'
  }
}

const SignUp = props => {

  return (
    <div style={styles.div}>
      <Paper style={styles.paper}>
        <div style={styles.header}>
          <img src='https://i.imgur.com/NptUAPg.png' alt='damn-hungry-logo' />
          <Divider style={styles.divider} />
        </div>
        <form style={styles.form}>
          <TextField
            value={props.userName}
            onBlur={props.onBlur('userNameError')}
            onFocus={props.onFocus('userNameError')}
            onChange={props.handleChange('userName')}
            onKeyPress={props.onKeyPress}
            error={props.errors.userNameError}
            fullWidth
            variant={'outlined'}
            margin={'dense'}
            label={"user name"}
            helperText={"May include (A-Z a-z 0-9 _ -). Length of 3 to 20 characters."}
          />
          <TextField
            value={props.email}
            onBlur={props.onBlur('emailError')}
            onFocus={props.onFocus('emailError')}
            onChange={props.handleChange('email')}
            onKeyPress={props.onKeyPress}
            error={props.errors.emailError}
            fullWidth
            variant={'outlined'}
            margin={'dense'}
            label={"email"}
            helperText={"Enter your email adress."}
          />
          <TextField
            value={props.password}
            onBlur={props.onBlur('passwordError')}
            onFocus={props.onFocus('passwordError')}
            onChange={props.handleChange('password')}
            onKeyPress={props.onKeyPress}
            error={props.errors.passwordError}
            fullWidth
            variant={'outlined'}
            margin={'dense'}
            label={'password'}
            type={'password'}
            helperText={"Password should contain at least 6 characters."}
          />
          <TextField
            value={props.password1}
            onBlur={props.onBlur('password1Error')}
            onFocus={props.onFocus('password1Error')}
            onChange={props.handleChange('password1')}
            onKeyPress={props.onKeyPress}
            error={props.errors.password1Error}
            fullWidth
            variant={'outlined'}
            margin={'dense'}
            label={'confirm password'}
            type={'password'}
            helperText={"Both passwords must be equal."}
          />
          <Button
            onClick={props.handleSignUp}
            style={styles.signUpButton}
            variant={'outlined'}
            color={'primary'}
          >
            {props._isFetching ?
              <CircularProgress size={20} />
              :
              'sign up'
            }
          </Button>
        </form>
        <div style={styles.footer}>
          <Divider style={styles.divider} />
          <div style={styles.signIn}>
            <Typography variant={'subtitle2'}>
              Already a member?
            </Typography>
            <Button
              onClick={props.toggleForm}
              style={styles.signInButton}
              margin='dense'
              variant={'outlined'}
              color={'secondary'}
            >
              sign in
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  )
}
export default SignUp
