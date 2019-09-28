import React from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Typography, Divider } from '@material-ui/core'
import AccessTimeIcon from '@material-ui/icons/AccessTime'


const styles = {
  img: {
    width: '100%',
  },
  ingredients: {
    margin: '20px auto'
  },
  time: {
    display: 'flex',
    alignItems: 'center'
  },
}

const RecipeDialog = props => {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        scroll={'body'}
        aria-label="scroll-dialog-title"
      >
        <img src={props.imgUrl} alt={`img ${props.title}`} style={styles.img} />
        <DialogTitle style={styles.title} id="scroll-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <Typography style={styles.time} variant={"subtitle1"}>
            <AccessTimeIcon
              style={{ marginRight: 5 }}
              fontSize='small'
            />
            {props.cookingTime} min
          </Typography>
          <Typography variant={"subtitle2"}>By: {props.author}</Typography>
          <Typography variant={"subtitle2"}>{props.date}</Typography>
          <Divider />
          <Typography style={styles.ingredients} variant='subtitle1'><strong>Ingredients:</strong> {props.ingredients}</Typography>
          <DialogContentText>
            {props.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="secondary" variant='outlined'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  )
}

export default RecipeDialog
