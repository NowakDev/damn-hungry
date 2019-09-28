import React from 'react'

import Drawer from '@material-ui/core/Drawer'

import NavDrawerLink from './NavDrawerLink'
import GithubIcon from '../../Icons/Github.js'

const githubRedirect = () => window.location = 'https://github.com/NowakDev/damn-hungry'

const NavDrawer = props => {
  return (
    <div>
      <Drawer
        anchor="top"
        open={props.isDrawerOpened}
        onClose={props.toggleDrawerStatus}
      >
        <NavDrawerLink
          to={'/'}
          label={'Damn Hungry Recipes'}
          toggleDrawerStatus={props.toggleDrawerStatus}
        />
        <NavDrawerLink
          to={'/create-recipe'}
          label={'Create New Recipe'}
          toggleDrawerStatus={props.toggleDrawerStatus}
        />
        <NavDrawerLink
          to={{}}
          label={<GithubIcon width='40px' height='40px' />}
          redirect={githubRedirect}
          toggleDrawerStatus={props.toggleDrawerStatus}
        />
      </Drawer>
    </div>
  )
}

export default NavDrawer
