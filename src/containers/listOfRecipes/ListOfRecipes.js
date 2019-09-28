import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import CircularProgress from '@material-ui/core/CircularProgress'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import { Typography } from '@material-ui/core'

import { getRecipesAsyncActionCreator } from '../../state/reducers/recipes'
import RecipeDialog from './RecipeDialog'
import Filters from '../../components/filters/Filters'

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative'
  },
  container: {
    maxWidth: 1000,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  gridList: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  recipe: {
    minWidth: 300,
    width: document.body.clientWidth < 600 ? '100%' : '50%'
  },
  div: {
    display: 'flex',
    width: '100%',
    maxWidth: 1000,
    alignItems: 'center',
    margin: '6px auto',
  },
  progress: {
    marginTop: 100
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
    isDialogOpen: false,
    showUserRecipes: false,
    recipeToDisplay: {},
    search: ''
  }

  componentDidMount() {
    const { key } = this.props.match.params

    this.props._getRecipes()
      .then(() => {
        if (key) {
          const recipeToDisplay = this.props._recipes.filter(
            recipe => (recipe.key === key)
          )
          this.setState({
            isDialogOpen: true,
            recipeToDisplay: recipeToDisplay[0]
          })
        }
      })
  }


  handleOnClick = (key) => {
    const clickedRecipe = this.props._recipes.filter(
      recipe => (recipe.key === key)
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

  handleUserRecipes = () => {
    this.setState({
      ...this.state,
      showUserRecipes: !this.state.showUserRecipes,
      search: ''
    })
  }

  render() {
    const { author, date, title, ingredients, description, cookingTime, imgUrl } = this.state.recipeToDisplay
    const { showUserRecipes, search } = this.state
    const { _isFetching, _recipes, _users, _currentUser } = this.props

    const recipeAuthor = _users && _users.filter(
      user => user.user_id === _currentUser.user_id
    )[0]
    const userRecipes = recipeAuthor && _recipes && _recipes.filter(
      recipe => recipe.author === recipeAuthor.user_name
    )
    const filteredUserRecipes = userRecipes && userRecipes.filter(
      recipe => recipe.ingredients.toLowerCase().includes(search)
    )
    const findRecipes = _recipes && _recipes.filter(recipe => (
      recipe.ingredients.toLowerCase().includes(search)
    ))

    const filteredRecipes = showUserRecipes ?
      filteredUserRecipes || []
      :
      findRecipes

    return (
      <div style={styles.root}>
        {_isFetching ?
          <CircularProgress
            style={styles.progress}
            size={50}
            color='secondary'
          />
          :
          (!_isFetching) && _recipes &&
          <div style={styles.container}>
            <Filters
              showUserRecipes={this.state.showUserRecipes}
              handleUserRecipes={this.handleUserRecipes}
              handleSearch={this.handleSearch}
              value={this.state.search}
            />
            {!_isFetching && filteredRecipes && filteredRecipes.length === 0 ?
              <Typography>No results. Please try again.</Typography>
              :
              <GridList
                cellHeight={200}
                style={styles.gridList}
              >
                {filteredRecipes && filteredRecipes.map((recipe) =>
                  <GridListTile
                    style={styles.recipe}
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
  return {
    _recipes: state.recipes.data,
    _users: state.users.data,
    _currentUser: state.auth.userData,
    _isFetching: state.auth.isFetching
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
