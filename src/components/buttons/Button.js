import React from 'react'

import MUIButton from '@material-ui/core/Button'

const styles = {
  marginTop: 30,
  width: 150
}

const Button = props => {
  return (
    <MUIButton
      style={styles}
      color="primary"
      variant='outlined'
      onClick={props.handleOnClick}
    >
      add recipe
    </MUIButton >
  )
}

export default Button
