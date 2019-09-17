import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import ListOfRecipes from './containers/listOfRecipes/ListOfRecipes'
import CreateRecipeForm from './containers/createRecipeForm/CreateRecipeForm'
import NavBar from './components/navigation/NavBar'


const App = props => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <NavBar />
      <Switch>
        <Route path={'/'} component={ListOfRecipes} exact />
        <Route path={'/damn-hungry-recipes'} component={ListOfRecipes} />
        <Route path={'/create-recipe-form'} component={CreateRecipeForm} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
