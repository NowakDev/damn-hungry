import React from 'react'

import Button from '@material-ui/core/Button'

const styles = {
  input: {
    display: 'none'
  },
  root: {
    margin: '10px auto'
  }
}

const UploadImageButton = props => {
  return (
    <div style={styles.root}>
      <input
        style={styles.input}
        accept='image/*'
        id='outlined-button-file'
        type='file'
        onChange={props.onImageUpload}
      />
      <label htmlFor='outlined-button-file'>
        <Button
          variant='outlined'
          component='span'
          fullWidth
        >
          Upload image of your meal
        </Button>
      </label>
    </div>
  )
}

export default UploadImageButton
