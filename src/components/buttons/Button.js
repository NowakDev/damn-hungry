import React from 'react'

import MUIButton from '@material-ui/core/Button'

const styles = {
  marginTop: 30
}

const Button = props => {
  return (
    <MUIButton
      style={styles}
      color="secondary"
      variant='outlined'
      fullWidth
      onClick={props.handleOnClick}
    >
      add recipe
    </MUIButton >
  )
}

export default Button
