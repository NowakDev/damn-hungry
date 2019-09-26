import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import CircularProgress from '@material-ui/core/CircularProgress'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import { Typography } from '@material-ui/core'

import { getRecipes } from '../../services/fetchService'
import { getRecipesAsyncActionCreator } from '../../state/reducers/recipes'
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
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  recipe: {
    width: '100%'
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
    search: ''
  }

  componentDidMount() {
    this.props._getRecipes()
    const { key } = this.props.match.params
    getRecipes()
      .then((recipes) => this.setState({
        recipes: recipes,
        filteredRecipes: recipes,
        isFetching: false
      }, () => {
        if (key) {
          const recipeToDisplay = this.state.recipes.filter(recipe => (
            recipe.key === key)
          )
          this.setState({
            isDialogOpen: true,
            recipeToDisplay: recipeToDisplay[0]
          })
        }
      }
      ))
  }

  handleOnClick = (key) => {
    const clickedRecipe = this.state.recipes.filter(recipe => (
      recipe.key === key)
    )
    this.setState({
      isDialogOpen: true,
      recipeToDisplay: clickedRecipe[0]
    })
  }

  handleSearch = (event) => {
    const search = event.target.value.toLowerCase()
    this.setState({
      ...this.state,
      search
    })
  }

  handleOnClose = () => {
    this.props.history.push('/recipes')
    this.setState({
      ...this.state,
      isDialogOpen: false
    })
  }

  render() {
    console.log(this.props)
    const { author, date, title, ingredients, description, cookingTime, imgUrl } = this.state.recipeToDisplay
    const { recipes, search } = this.state
    const filteredRecipes = recipes && recipes.filter(recipe => (
      recipe.ingredients.toLowerCase().includes(search)
    ))
    return (
      <div style={styles.root}>
        {this.state.isFetching ?
          <CircularProgress
            style={styles.progress}
            size={100}
            color='secondary'
          />
          :
          <div style={styles.gridList}>
            <Filters
              handleSearch={this.handleSearch}
            />
            {filteredRecipes.length === 0 ?
              <Typography>No results. Please try again.</Typography>
              :
              <GridList
                cellHeight={200}
                style={styles.recipe}
              >
                {filteredRecipes.map((recipe) =>
                  <GridListTile
                    component={Link}
                    to={`/recipes/${recipe.key}`}
                    key={recipe.key}
                    onClick={() => this.handleOnClick(recipe.key)}
                  >
                    <img
                      style={styles.img}
                      src={recipe.imgUrl}
                      alt={`img ${recipe.title}`}
                    />
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
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    _recipes: state.recipes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    _getRecipes: () => dispatch(getRecipesAsyncActionCreator())
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListOfRecipes)
