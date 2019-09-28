import React from 'react'

import Paper from '@material-ui/core/Paper'
import MUITextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import { Button, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'orange',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: 30,
        margin: 5
      },
      '&:hover fieldset': {
        borderColor: 'orange',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'orange',
      },
    },
  },
})(MUITextField)

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    width: 1000,
    maxWidth: '98vw',
    margin: 10,
    marginBottom: 3
  },
  container: {
    margin: 10,
    textAlign: 'center'
  },
  input: {
    width: 500,
    maxWidth: '95vw',
  },
  button: {
    maxWidth: 150,
    width: '100%',
    padding: 5,
    marginTop: 15,
  },
  iconButton: {
    padding: 3,
  },
  text: {
    marginTop: 20,
    marginBottom: 10,
    color: 'red'
  }
}

const Filters = (props) => {
  return (
    <Paper style={styles.root}>
      <div style={styles.container}>
        <CssTextField
          style={styles.input}
          variant="outlined"
          type='text'
          label="Search by ingredients"
          value={props.value}
          onChange={props.handleSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon style={styles.iconButton} />
              </InputAdornment>
            )
          }}
        />
        <Button
          style={styles.button}
          color={props.showUserRecipes ? 'secondary' : 'primary'}
          variant='outlined'
          onClick={props.handleUserRecipes}
        >
          {props.showUserRecipes ? 'all recipes' : 'your recipes'}
        </Button>
        <Typography style={styles.text} variant='h5'>
          <strong>Hungry? Find inspiration:</strong>
        </Typography>
      </div>
    </Paper>
  )
}

export default Filters
