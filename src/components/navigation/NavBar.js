import React from 'react'
import { connect } from 'react-redux'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import NavDrawer from './NavDrawer'
import { Link } from 'react-router-dom'

import { signedOutActionCreator } from '../../state/reducers/auth'

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
  },
  img: {
    marginTop: 5,
    maxHeight: 70
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
          <Link to={'/'} style={styles.link}>
            <img style={styles.img} src='https://i.imgur.com/NptUAPg.png' alt='damn-hungry-logo' />
          </Link>
          <Button
            color="inherit"
            onClick={this.props._signOut}
          >
            sign out
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

const mapDispatchToProps = (dispatch) => {
  return {
    _signOut: () => (dispatch(signedOutActionCreator()))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(NavBar)
