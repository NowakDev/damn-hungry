import React from 'react'

import MUITextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'


const CookingTimeField = (props) => (
  <MUITextField
    type="number"
    variant='outlined'
    label='cooking time'
    margin='dense'
    error={props.error}
    value={props.cookingTime}
    onBlur={props.onBlur}
    onChange={props.handleInputChange}
    fullWidth
    InputProps={{
      endAdornment: <InputAdornment position="end">min</InputAdornment>,
    }}
    inputProps={{
      min: '0',
      value: props.cookingTime
    }}
  />
)

export default CookingTimeField
