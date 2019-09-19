import React from 'react'

import CookingTimeField from './CookingTimeField'
import TextField from './TextField'
import Paper from '@material-ui/core/Paper'

import Button from '../../components/buttons/Button'
import { addRecipe } from '../../services/fetchService'

const styles = {
  formContainer: {
    margin: '5px auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '500px'
  },
  paper: {
    padding: 15,
    textAlign: 'center'
  }
}

const initialState = {
  recipe: {
    author: '',
    cookingTime: 0,
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
      recipe: initialState.recipe
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

  formValidation = () => {
    const { cookingTime, description, imgUrl, ingredients, title } = this.state.recipe

    switch (true) {
      case cookingTime < 10:
        this.setState({
          errors: {
            ...this.state.errors,
            cookingTime: true
          }
        })
        break

      default:
        return this.state.recipe
    }
  }

  handleOnClick = () => {
    this.formValidation()
    const date = Date().substring(0, 24)
    this.setState({
      recipe: {
        ...this.state.recipe,
        date: date
      }
    }, () => {
      addRecipe(this.state.recipe)
      this.clearInputs()
    })
  }

  render() {

    const { cookingTime, description, imgUrl, ingredients, title } = this.state.recipe
    return (
      // bug with cooking time field clearing to fix
      <div style={styles.formContainer}>
        <Paper style={styles.paper}>
          <TextField
            autoFocus
            label='title'
            value={title}
            handleInputChange={this.handleInputChange('title')}
          />
          <TextField
            label='ingredients'
            multiline
            value={ingredients}
            handleInputChange={this.handleInputChange('ingredients')}
          />
          <TextField
            label='description'
            rows='10'
            multiline
            value={description}
            handleInputChange={this.handleInputChange('description')}
          />
          <CookingTimeField
            error={this.state.errors.cookingTime}
            value={cookingTime}
            handleInputChange={this.handleInputChange('cookingTime')}
          />
          <TextField
            label='img URL'
            value={imgUrl}
            handleInputChange={this.handleInputChange('imgUrl')}
          />
          <Button handleOnClick={this.handleOnClick} />
        </Paper>
      </div>
    )
  }
}

export default CreateRecipe
