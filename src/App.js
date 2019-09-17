import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import ListOfRecipes from './containers/listOfRecipes/ListOfRecipes'
import CreateRecipeForm from './containers/createRecipeForm/CreateRecipeForm'
import NavBar from './components/navigation/NavBar'


const App = props => {
  return (
    <BrowserRouter>
      <NavBar />
      <Route path={'/damn-hungry-recipes'} component={ListOfRecipes} />
      <Route path={'/create-recipe-form'} component={CreateRecipeForm} />
    </BrowserRouter>
  )
}

export default App
