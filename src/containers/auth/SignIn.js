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
  signUp: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  signInButton: {
    margin: 15,
    width: 100
  },
  signUpButton: {
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
const SignIn = props => {
  const onEnter = event => {
    if (event.key === 'Enter') {
      props.handleSignIn()
    }
  }
  return (
    <div style={styles.div}>
      <Paper style={styles.paper}>
        <div style={styles.header}>
          <img src='https://i.imgur.com/NptUAPg.png' alt='damn-hungry-logo' />
          <Divider style={styles.divider} />
        </div>
        <form style={styles.form}>
          <TextField
            value={props.email}
            onChange={props.handleChange('email')}
            onKeyPress={onEnter}
            error={props.errors.email}
            fullWidth
            variant={'outlined'}
            margin={'dense'}
            label={"email adress"}
          />
          <TextField
            value={props.password}
            onChange={props.handleChange('password')}
            onKeyPress={onEnter}
            error={props.errors.password}
            fullWidth
            variant={'outlined'}
            margin={'dense'}
            label={'password'}
            type={'password'}
          />
          <Button
            style={styles.signInButton}
            variant={'outlined'}
            color={'primary'}
            onClick={props.handleSignIn}
          >
            {props._isFetching ? <CircularProgress size={25} /> : 'sign in'}
          </Button>
        </form>
        <div style={styles.footer}>
          <Divider style={styles.divider} />
          <div style={styles.signUp}>
            <Typography variant='subtitle2'>
              Not a member yet?
            </Typography>
            <Button
              onClick={props.toggleForm}
              style={styles.signUpButton}
              variant={'outlined'}
              color={'secondary'}
            >
              sign up
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  )
}

export default SignIn
