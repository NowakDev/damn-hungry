import React from 'react'

import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import CircularProgress from '@material-ui/core/CircularProgress'
import AccessTimeIcon from '@material-ui/icons/AccessTime'

import { getRecipes } from '../../services/fetchService'

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
  },
  div: {
    display: 'flex',
    alignItems: 'center',
    margin: '6px 0px',
  },
  progress: {
    marginTop: 50
  }
}

class ListOfRecipes extends React.Component {
  state = {
    recipes: [],
    isFetching: true
  }

  componentDidMount() {
    getRecipes()
      .then((recipes) => this.setState({
        recipes: recipes,
        isFetching: false
      }))
  }

  render() {
    return (
      <div style={styles.root}>
        {this.state.isFetching ?
          <CircularProgress style={styles.progress} size={100} color='secondary' />
          :
          <GridList cellHeight={180} style={styles.gridList}>
            {this.state.recipes.map(recipe => (
              <GridListTile key={recipe.key} style={styles.recipe} onClick={() => { }}>
                <img src={recipe.img} alt={recipe.title} />
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
                        {recipe.cookingTime} hr
                      </div>
                    </div>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        }
      </div>
    )
  }
}

export default ListOfRecipes
