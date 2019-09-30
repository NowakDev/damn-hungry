import React from 'react'
import { connect } from 'react-redux'

import MuiSnackbar from '@material-ui/core/Snackbar'
import { SnackbarContent } from '@material-ui/core'

const Snackbar = props => {
  return (
    <div>
      {props._snackbars.map((snackbar) => (
        <MuiSnackbar
          key={snackbar.key}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={true}
        >
          <SnackbarContent
            style={{
              backgroundColor: snackbar.color,
              boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.5)',
              textAlign: 'center',
              margin: 10
            }}
            message={snackbar.text}
          />
        </MuiSnackbar>
      ))}
    </div>
  )
}

const mapStateToProps = state => ({
  _snackbars: state.snackbars.bars
})

export default connect(
  mapStateToProps,
)(Snackbar)
