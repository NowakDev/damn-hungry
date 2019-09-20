import React from 'react'

import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import CircularProgress from '@material-ui/core/CircularProgress'
import AccessTimeIcon from '@material-ui/icons/AccessTime'

import { getRecipes } from '../../services/fetchService'
import RecipeDialog from './RecipeDialog'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    margin: 5,
  },
  gridList: {
    maxWidth: 1000,
    height: '100%',
    justifyContent: 'center'
  },
  recipe: {
    minWidth: 150,
    cursor: 'pointer'
  },
  div: {
    display: 'flex',
    alignItems: 'center',
    margin: '6px auto',
  },
  progress: {
    marginTop: 50
  }
}

class ListOfRecipes extends React.Component {
  state = {
    recipes: [],
    isFetching: true,
    isDialogOpen: false,
    recipeToDisplay: {}
  }

  componentDidMount() {
    getRecipes()
      .then((recipes) => this.setState({
        recipes: recipes,
        isFetching: false
      }))
  }

  handleOnClick = (recipeIndex) => {
    const filteredRecipe = this.state.recipes[recipeIndex]
    this.setState({
      isDialogOpen: true,
      recipeToDisplay: filteredRecipe
    })
  }

  handleOnClose = () => {
    this.setState({
      ...this.state,
      isDialogOpen: false
    })
  }

  render() {
    const { author, date, title, ingredients, description, cookingTime, imgUrl } = this.state.recipeToDisplay
    return (
      <div style={styles.root}>
        {this.state.isFetching ?
          <CircularProgress style={styles.progress} size={100} color='secondary' />
          :
          <GridList cellHeight={180} style={styles.gridList}>
            {this.state.recipes.map((recipe, index) =>
              <GridListTile key={recipe.key} style={styles.recipe} onClick={() => this.handleOnClick(index)}>
                <img src={recipe.imgUrl} alt={`img ${recipe.title}`} />
                <GridListTileBar
                  title={recipe.title}
                  subtitle={
                    <div>
                      <span>by: {recipe.author}</span>
                      <div
                        style={styles.div}
                      >
                        <AccessTimeIcon
                          style={{ marginRight: 5 }}
                          fontSize='small'
                        />
                        {recipe.cookingTime} min
                      </div>
                    </div>
                  }
                />
              </GridListTile>
            )}
            <RecipeDialog
              onClose={this.handleOnClose}
              open={this.state.isDialogOpen}
              author={author}
              title={title}
              date={date}
              ingredients={ingredients}
              description={description}
              cookingTime={cookingTime}
              imgUrl={imgUrl}
            />
          </GridList>
        }
      </div>
    )
  }
}

export default ListOfRecipes
