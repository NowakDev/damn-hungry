import React from 'react'

import MUITextField from '@material-ui/core/TextField'

const TextField = (props) => (
  <MUITextField
    type="text"
    margin='dense'
    variant='outlined'
    fullWidth
    helperText={props.helperText}
    error={props.error}
    rows={props.rows}
    value={props.value}
    onChange={props.handleInputChange}
    onBlur={props.onBlur}
    label={props.label}
    multiline={props.multiline}
  />
)

export default TextField
