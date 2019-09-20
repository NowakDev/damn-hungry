import React from 'react'

import MUITextField from '@material-ui/core/TextField'

const TextField = (props) => (
  <MUITextField
    autoFocus={props.autoFocus}
    type="text"
    fullWidth
    margin='dense'
    error={props.error}
    rows={props.rows}
    value={props.value}
    onChange={props.handleInputChange}
    onBlur={props.onBlur}
    variant='outlined'
    label={props.label}
    multiline={props.multiline}
  />
)

export default TextField
