import { mapObjectToArray } from './mapObjectToArray'

const recipesURL = 'https://damn-hungry-recipes-123ed.firebaseio.com/recipes/'

export const getRecipes = () => {
  return fetch(recipesURL + '.json')
    .then(r => r.json())
    .then(data => {
      const recipes = mapObjectToArray(data)
      return recipes
    })
}

export const addRecipe = (recipe) => {
  return fetch(recipesURL + '.json',
    {
      method: 'POST',
      body: JSON.stringify(recipe)
    })

}

export const removeRecipe = (key) => {
  return fetch(recipesURL + key + '.json',
    {
      method: 'DELETE',
    })
}
