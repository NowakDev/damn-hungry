import React from 'react'

import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import { Button } from '@material-ui/core'

const styles = {
  root: {
    marginBottom: 5,
    padding: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    display: 'flex',
    width: '100%',
    maxWidth: 500,
    margin: 5,
  },
  button: {
    maxWidth: 500,
    width: '100%',
    padding: 5,
    margin: 5
  },
  iconButton: {
    padding: 3,
  }
}

const Filters = (props) => {
  return (
    <Paper style={styles.root}>
      <TextField
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
        variant='outlined'
        onClick={props.handleUsersRecipes}
      >
        your recipes
        </Button>
    </Paper>
  )
}

export default Filters
