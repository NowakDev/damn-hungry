import React from 'react'

import Drawer from '@material-ui/core/Drawer'
import NavDrawerLink from './NavDrawerLink'

const NavDrawer = props => {
  return (
    <div>
      <Drawer
        anchor="top"
        open={props.isDrawerOpened}
        onClose={props.toggleDrawerStatus}
      >
        <NavDrawerLink
          to={'/damn-hungry-recipes'}
          label={'Damn Hungry Recipes'}
          toggleDrawerStatus={props.toggleDrawerStatus}
        />
        <NavDrawerLink
          to={'/create-recipe'}
          label={'Create New Recipe'}
          toggleDrawerStatus={props.toggleDrawerStatus}
        />
      </Drawer>
    </div>
  )
}

export default NavDrawer
