import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import NavDrawer from './NavDrawer'
import { Link } from 'react-router-dom'

const styles = {
  Toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'orange'
  },
  title: {
    textAlign: 'center',
    cursor: 'pointer',
    fontSize: document.body.clientWidth < 600 ? 20 : 30
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  }
}

class NavBar extends React.Component {
  state = {
    isDrawerOpened: false
  }

  toggleDrawerStatus = () => {
    this.setState({
      isDrawerOpened: !this.state.isDrawerOpened
    })
  }

  render() {
    return (
      <AppBar position="sticky">
        <Toolbar style={styles.Toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={this.toggleDrawerStatus}
          >
            <MenuIcon />
          </IconButton>
          <Link to={'/damn-hungry-recipes'} style={styles.link}>
            <Typography
              style={styles.title}
            >
              Damn Hungry Recipes!
            </Typography>
          </Link>
          <Button
            color="inherit"
          >
            Login
            </Button>
        </Toolbar>
        <NavDrawer
          isDrawerOpened={this.state.isDrawerOpened}
          toggleDrawerStatus={this.toggleDrawerStatus}
        />
      </AppBar>
    )
  }
}

export default NavBar
