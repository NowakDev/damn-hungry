import React from 'react'
import { connect } from 'react-redux'
import { addRecipeAsyncActionCreator } from '../../state/reducers/recipes'

import CookingTimeField from './CookingTimeField'
import TextField from './TextField'
import Paper from '@material-ui/core/Paper'

import Button from '../../components/buttons/Button'

const styles = {
  formContainer: {
    margin: '5px auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 500,
    maxWidth: '95vw'
  },
  paper: {
    padding: 15,
    textAlign: 'center'
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
  }
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
    const imgRegex = /\.(gif|jpg|jpeg|tiff|png)$/
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

  handleOnClick = () => {
    const date = Date().substring(0, 24)
    this.setState({
      recipe: {
        ...this.state.recipe,
        date: date
      }
    }, () => {
      this.props._addRecipe(this.state.recipe)
      this.clearInputs()
    })
  }

  render() {
    const { recipe } = this.state
    const { title, ingredients, description, cookingTime, imgUrl } = this.state.errors
    const inputsFilled = recipe.cookingTime && recipe.description && recipe.ingredients && recipe.imgUrl && recipe.title
    const noError = !inputsFilled || title || ingredients || description || cookingTime || imgUrl
    const helperText = {
      title: 'Title too short! Pass a title which describes your meal.',
      ingredients: 'Pass all ingredients in your meal.',
      description: 'Describe steps needed to prepare your meal.',
      cookingTime: 'Think about that :) Pass time in minutes.',
      imgUrl: 'Pass a valid image url. Accepted formats: gif, jpg, jpeg, tiff, png '
    }
    return (
      // bug with cooking time field clearing to fix
      <div style={styles.formContainer}>
        <Paper style={styles.paper}>
          <TextField
            label='title'
            error={title}
            value={recipe.title}
            helperText={title ? helperText.title : null}
            onBlur={this.handleOnBlur('title')}
            handleInputChange={this.handleInputChange('title')}
          />
          <TextField
            label='ingredients'
            multiline
            error={ingredients}
            value={recipe.ingredients}
            helperText={ingredients ? helperText.ingredients : null}
            onBlur={this.handleOnBlur('ingredients')}
            handleInputChange={this.handleInputChange('ingredients')}
          />
          <TextField
            label='description'
            rows='10'
            error={description}
            multiline
            value={recipe.description}
            helperText={description ? helperText.description : null}
            onBlur={this.handleOnBlur('description')}
            handleInputChange={this.handleInputChange('description')}
          />
          <CookingTimeField
            error={cookingTime}
            value={recipe.cookingTime}
            helperText={cookingTime ? helperText.cookingTime : null}
            onBlur={this.handleOnBlur('cookingTime')}
            handleInputChange={this.handleInputChange('cookingTime')}
          />
          <TextField
            label='img URL'
            error={imgUrl}
            value={recipe.imgUrl}
            helperText={imgUrl ? helperText.imgUrl : null}
            onBlur={this.handleOnBlur('imgUrl')}
            handleInputChange={this.handleInputChange('imgUrl')}
          />
          <Button
            handleOnClick={this.handleOnClick}
            noError={noError}
          />
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
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
