import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import ListOfRecipes from './containers/listOfRecipes/ListOfRecipes'
import CreateRecipe from './containers/createRecipeForm/CreateRecipe'
import NavBar from './components/navigation/NavBar'


const App = props => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <NavBar />
      <Switch>
        <Route path={'/'} component={ListOfRecipes} exact />
        <Route path={'/create-recipe'} component={CreateRecipe} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
