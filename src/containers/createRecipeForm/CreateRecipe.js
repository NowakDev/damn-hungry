import React from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { addRecipeAsyncActionCreator } from '../../state/reducers/recipes'

import CookingTimeField from './CookingTimeField'
import TextField from './TextField'
import Paper from '@material-ui/core/Paper'

import Button from '../../components/buttons/Button'
import { CircularProgress, Typography } from '@material-ui/core'

const styles = {
  formContainer: {
    margin: 'auto',
    marginTop: 10,
    display: 'flex',
    width: 500,
    maxWidth: '95vw',
    justifyContent: 'center'
  },
  div: {
    margin: 15,
    textAlign: 'center'
  },
  progress: {
    marginTop: 100
  }
}

const initialState = {
  recipe: {
    author: '',
    cookingTime: null,
    date: '',
    description: '',
    imgUrl: '',
    ingredients: '',
    title: ''
  },
  errors: {
    cookingTime: false,
    description: false,
    imgUrl: false,
    ingredients: false,
    title: false
  },
  redirect: false
}

class CreateRecipe extends React.Component {
  state = initialState

  clearInputs = () => {
    this.setState({
      ...initialState
    })
  }

  handleInputChange = (name) => (event) => {
    const value = event.target.value.trim() ?
      event.target.value
      :
      event.target.value.trim()
    this.setState({
      recipe: {
        ...this.state.recipe,
        [name]: value
      }
    })
  }

  formValidation = (name, event) => {
    const imgRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/
    switch (true) {
      case name !== 'cookingTime'
        && name !== 'imgUrl'
        && event.target.value.length < 10:
        this.setState({
          errors: {
            ...this.state.errors,
            [name]: true
          }
        })
        break
      case name === 'cookingTime'
        && (event.target.value < 10 || event.target.value > 300):
        this.setState({
          errors: {
            ...this.state.errors,
            [name]: true
          }
        })
        break
      case name === 'imgUrl'
        && !imgRegex.test(event.target.value):
        this.setState({
          errors: {
            ...this.state.errors,
            [name]: true
          }
        })
        break

      default:
        this.setState({
          errors: {
            ...this.state.errors,
            [name]: false
          }
        })
        break
    }
  }

  handleOnBlur = (name) => (event) => {
    this.formValidation(name, event)
  }

  handleOnFocus = (name) => () => {
    this.setState({
      errors: {
        ...this.state.errors,
        [name]: false
      }
    })
  }

  handleOnClick = () => {
    const { _users, _currentUser } = this.props
    const author = _users && _currentUser && _users.filter(
      user => (user.user_id === _currentUser.user_id))[0]
    const { recipe, errors } = this.state

    if (!recipe.title) {
      this.setState({
        errors: {
          ...this.state.errors,
          title: true
        }
      })
    } else if (!recipe.ingredients) {
      this.setState({
        errors: {
          ...this.state.errors,
          ingredients: true
        }
      })
    } else if (!recipe.description) {
      this.setState({
        errors: {
          ...this.state.errors,
          description: true
        }
      })
    } else if (!recipe.cookingTime) {
      this.setState({
        errors: {
          ...this.state.errors,
          cookingTime: true
        }
      })
    } else if (!recipe.imgUrl) {
      this.setState({
        errors: {
          ...this.state.errors,
          imgUrl: true
        }
      })
    }

    if (recipe.cookingTime && recipe.description && recipe.imgUrl && recipe.ingredients && recipe.title)
      if (!errors.cookingTime && !errors.description && !errors.imgUrl && !errors.ingredients && !errors.title) {
        const date = Date().substring(0, 24)
        this.setState({
          recipe: {
            ...this.state.recipe,
            author: author && author.user_name,
            date: date
          }
        }, () => {
          this.props._addRecipe(this.state.recipe)
          this.clearInputs()
          this.setState({
            ...this.state,
            redirect: true
          })
        })
      }
  }

  onEnter = event => {
    if (event.key === 'Enter') {
      this.handleOnClick()
    }
  }

  render() {
    const { recipe } = this.state
    const { title, ingredients, description, cookingTime, imgUrl } = this.state.errors
    const helperText = {
      title: 'Pass a title which describes your meal.',
      ingredients: 'Pass all ingredients in your meal.',
      description: 'Describe steps needed to prepare your meal.',
      cookingTime: 'Pass approximate cooking time in minutes.',
      imgUrl: 'Pass a valid image url. Accepted formats: gif, jpg, png '
    }
    return (

      <div style={{ textAlign: 'center' }}>
        {this.props._isFetching ?
          <CircularProgress
            style={styles.progress}
            color='secondary'
            size={50}
          />
          :
          <Paper style={styles.formContainer}>
            <div style={styles.div}>
              <Typography>
                Share your idea:
              </Typography>
              <TextField
                label='title'
                error={title}
                value={recipe.title}
                helperText={helperText.title}
                onBlur={this.handleOnBlur('title')}
                onFocus={this.handleOnFocus('title')}
                onKeyPress={this.onEnter}
                handleInputChange={this.handleInputChange('title')}
              />
              <TextField
                label='ingredients'
                multiline
                rows='5'
                error={ingredients}
                value={recipe.ingredients}
                helperText={helperText.ingredients}
                onBlur={this.handleOnBlur('ingredients')}
                onFocus={this.handleOnFocus('ingredients')}
                onKeyPress={this.onEnter}
                handleInputChange={this.handleInputChange('ingredients')}
              />
              <TextField
                label='description'
                rows='10'
                error={description}
                multiline
                value={recipe.description}
                helperText={helperText.description}
                onBlur={this.handleOnBlur('description')}
                onFocus={this.handleOnFocus('description')}
                onKeyPress={this.onEnter}
                handleInputChange={this.handleInputChange('description')}
              />
              <CookingTimeField
                error={cookingTime}
                value={recipe.cookingTime}
                helperText={helperText.cookingTime}
                onBlur={this.handleOnBlur('cookingTime')}
                onFocus={this.handleOnFocus('cookingTime')}
                onKeyPress={this.onEnter}
                handleInputChange={this.handleInputChange('cookingTime')}
              />
              <TextField
                label='img URL'
                error={imgUrl}
                value={recipe.imgUrl}
                helperText={helperText.imgUrl}
                onBlur={this.handleOnBlur('imgUrl')}
                onFocus={this.handleOnFocus('imgUrl')}
                onKeyPress={this.onEnter}
                handleInputChange={this.handleInputChange('imgUrl')}
              />
              <Button
                handleOnClick={this.handleOnClick}
                isFetching={this.props._isFetching}
              />
              {this.state.redirect ? <Redirect to={'/'} /> : null}
            </div>
          </Paper>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    _users: state.users.data,
    _currentUser: state.auth.userData,
    _recipes: state.recipes.data,
    _isFetching: state.auth.isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    _addRecipe: (recipe) => dispatch(addRecipeAsyncActionCreator(recipe))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRecipe)
