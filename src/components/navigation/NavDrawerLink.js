
import React from 'react'
import { Link } from 'react-router-dom'

import { ListItem, ListItemText } from '@material-ui/core'

const styles = {
  link: {
    textDecoration: 'none',
    color: 'black'
  },
  listItem: {
    textAlign: 'center',
    height: 70,
    borderBottom: '1px solid black'
  }
}

const NavDrawerLink = (props) => {
  return (
    <Link to={props.to} style={styles.link} onClick={props.toggleDrawerStatus}>
      <ListItem button={true} style={styles.listItem}>
        <ListItemText primary={props.label} />
      </ListItem>
    </Link>
  )
}

export default NavDrawerLink
