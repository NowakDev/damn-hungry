import React from 'react'

import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import CircularProgress from '@material-ui/core/CircularProgress'
import AccessTimeIcon from '@material-ui/icons/AccessTime'

import { getRecipes } from '../../services/fetchService'
import RecipeDialog from './RecipeDialog'
import Filters from '../../components/filters/Filters'

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    margin: 5
  },
  gridList: {
    maxWidth: 1000,
    width: '100%'
  },
  recipe: {
    minWidth: 150,
    cursor: 'pointer'
  },
  div: {
    display: 'flex',
    width: '100%',
    maxWidth: 1000,
    alignItems: 'center',
    margin: '6px auto',
  },
  progress: {
    marginTop: 50
  },
  img: {
    maxWidth: 600,
    maxHeight: 600,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    overflow: 'hidden'
  }
}

class ListOfRecipes extends React.Component {
  state = {
    recipes: [],
    isFetching: true,
    isDialogOpen: false,
    recipeToDisplay: {},
    filteredRecipes: []
  }

  componentDidMount() {
    getRecipes()
      .then((recipes) => this.setState({
        recipes: recipes,
        filteredRecipes: recipes,
        isFetching: false
      }))
  }

  handleOnClick = (key) => {
    const clickedRecipe = this.state.recipes.filter(recipe => recipe.key === key)
    this.setState({
      isDialogOpen: true,
      recipeToDisplay: clickedRecipe[0]
    })
  }

  handleSearch = (event) => {
    const { value } = event.target
    const search = value.toLowerCase()
    const { recipes } = this.state
    const filteredRecipes = recipes && recipes.filter(recipe => recipe.ingredients.includes(search))
    this.setState({
      ...this.state,
      filteredRecipes
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
          <div style={styles.gridList}>
            <Filters
              handleSearch={this.handleSearch}

            />
            <GridList cellHeight={200}>
              {this.state.filteredRecipes.map((recipe) =>
                <GridListTile key={recipe.key} style={styles.recipe} onClick={() => this.handleOnClick(recipe.key)}>
                  <img style={styles.img} src={recipe.imgUrl} alt={`img ${recipe.title}`} />
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
          </div>
        }
      </div>
    )
  }
}

export default ListOfRecipes
