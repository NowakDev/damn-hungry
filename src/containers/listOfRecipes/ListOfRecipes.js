import React from 'react'

import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import { Typography } from '@material-ui/core'

import { mapObjectToArray } from '../../services/mapObjectToArray'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    marginTop: 5,
  },
  gridList: {
    maxWidth: 1000,
    height: '100%',
    justifyContent: 'center'
  },
  recipe: {
    minWidth: 150,
    cursor: 'pointer'
  }
}

class ListOfRecipes extends React.Component {
  state = {
    recipes: []
  }

  componentDidMount() {
    const recipesURL = 'https://damn-hungry-recipes-123ed.firebaseio.com/recipes/.json'
    fetch(recipesURL)
      .then(resp => resp.json())
      .then((data) => mapObjectToArray(data))
      .then((data) => this.setState({
        recipes: data
      }))
  }

  render() {
    console.log(this.state)
    return (
      <div style={styles.root}>
        <GridList cellHeight={180} style={styles.gridList}>
          {this.state.recipes.map(recipe => (
            <GridListTile key={recipe.key} style={styles.recipe} onClick={() => { }}>
              <img src={recipe.img} alt={recipe.title} />
              <GridListTileBar
                title={recipe.title}
                subtitle={<span>by: {recipe.author}</span>}
              />
              <Typography>
                {recipe.date}
              </Typography>
            </GridListTile>
          ))}
        </GridList>
      </div>
    )
  }
}

export default ListOfRecipes
