import React from 'react'

import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import { Button } from '@material-ui/core'

const styles = {
  root: {
    margin: '5px auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  },
  input: {
    display: 'flex',
    width: '100%',
    maxWidth: 500,
    margin: 5,
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: 5
  },
  button: {
    maxWidth: 500,
    width: '100%',
    padding: 5,
    margin: 5
  },
  iconButton: {
    padding: 7
  }
}

const Filters = (props) => {
  return (
    <Paper style={styles.root}>
      <div style={styles.input}>
        <InputBase
          style={{ paddingLeft: 10 }}
          fullWidth
          onChange={props.handleSearch}
          placeholder="Search by ingredients"
          inputProps={{
            'aria-label': 'search recipe by ingredients',
          }}
        />
        <SearchIcon style={styles.iconButton} />
      </div>
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
