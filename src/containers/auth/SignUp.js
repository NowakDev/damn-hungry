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
    textAlign: 'center'
  },
  footer: {
    position: 'absolute',
    width: '85%',
    bottom: 10
  }
}

const SignUp = props => {
  const enableSubmit = (
    props.email.length > 0 &&
    props.password.length > 0 &&
    props.password1 === props.password &&
    !props.errors.wrongEmail &&
    !props.errors.passwordToShort &&
    !props.errors.passwordsDontMatch
  )

  return (
    <div style={styles.div}>
      <Paper style={styles.paper}>
        <div style={styles.header}>
          <Typography variant={'h5'}>
            SIGN UP
        </Typography>
          <Divider style={styles.divider} />
        </div>
        <TextField
          value={props.email}
          onChange={props.handleChange('email')}
          error={props.errors.wrongEmail}
          fullWidth
          variant={'outlined'}
          margin={'dense'}
          label={"email"}
          helperText={props.errors.wrongEmail ? "Invalid email." : ''}
        />
        <TextField
          value={props.password}
          onChange={props.handleChange('password')}
          error={props.errors.passwordToShort}
          fullWidth
          variant={'outlined'}
          margin={'dense'}
          label={'password'}
          type={'password'}
          helperText={props.errors.passwordToShort ? "Password should contain at least 6 characters." : ''}
        />
        <TextField
          value={props.password2}
          onChange={props.handleChange('password1')}
          error={props.errors.passwordsDontMatch}
          fullWidth
          variant={'outlined'}
          margin={'dense'}
          label={'confirm password'}
          type={'password'}
          helperText={props.errors.passwordsDontMatch ? "Both passwords must be equal." : ''}
        />
        <Button
          onClick={props.handleSignUp}
          style={styles.signUpButton}
          variant={'outlined'}
          color={'primary'}
          disabled={!(enableSubmit)}
        >
          {props._isFetching ? <CircularProgress size={20} /> : 'sign up'}
        </Button>
        <div style={styles.footer}>
          <Divider style={styles.divider} />
          <div style={styles.signIn}>
            <Typography variant={'subtitle2'}>
              Already a member?
            </Typography>
            <Button
              onClick={props.toggleForm}
              style={styles.button}
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
