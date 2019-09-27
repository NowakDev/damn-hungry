import React from 'react'

import { Paper, TextField, Button, Typography, CircularProgress, Divider } from '@material-ui/core'

const styles = {
  paper: {
    width: 350,
    height: 350,
    padding: 25,
    paddingBottom: 10,
    maxWidth: '95%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative'
  },
  signUpButton: {
    margin: '15px auto',
    maxWidth: 100
  },
  div: {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw'
  },
  divider: {
    marginTop: 15,
    marginBottom: 10
  },
  signIn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  button: {
    margin: 5,
    padding: 3
  },
  header: {
    width: '100%',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    width: '85%',
    bottom: 10
  }
}
const SignIn = props => {
  const enableSubmit = (
    props.email.length > 0 &&
    props.password.length > 0 &&
    !props.errors.wrongEmail
  )

  return (
    <div style={styles.div}>
      <Paper style={styles.paper}>
        <div style={styles.header}>
          <Typography variant={'h5'}>
            SIGN IN
        </Typography>
          <Divider style={styles.divider} />
        </div>
        <TextField
          value={props.email}
          onChange={props.handleChange('email')}
          onKeyPress={event => { if (event.key === 'Enter' && enableSubmit) props.handleSignIn() }}
          error={props.errors.wrongEmail}
          fullWidth
          variant={'outlined'}
          margin={'dense'}
          label={"email adress"}
          helperText={props.errors.wrongEmail ? "Invalid email adress." : ''}
        />
        <TextField
          value={props.password}
          onChange={props.handleChange('password')}
          onKeyPress={event => { if (event.key === 'Enter') props.handleSignIn() }}
          fullWidth
          variant={'outlined'}
          margin={'dense'}
          label={'password'}
          type={'password'}
        />
        <Button
          style={styles.signUpButton}
          variant={'outlined'}
          color={'primary'}
          onClick={props.handleSignIn}
          disabled={!enableSubmit}
        >
          {props._isFetching ? <CircularProgress size={25} /> : 'sign in'}
        </Button>
        <div style={styles.footer}>
          <Divider style={styles.divider} />
          <div style={styles.signIn}>
            <Typography variant='subtitle2'>
              Not a member yet?
            </Typography>
            <Button
              onClick={props.toggleForm}
              style={styles.button}
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
