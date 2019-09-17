import React from 'react'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    marginTop: 5,
    cursor: 'pointer'
  },
  gridList: {
    maxWidth: 1000,
    height: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  }
}

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */

class ListOfRecipes extends React.Component {
  state = {

  }

  render() {
    return (
      <div style={styles.root}>
        <GridList cellHeight={180} style={styles.gridList} onClick={(e) => console.log(e.target)}>
          {['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'].map(recipe => (
            <GridListTile key={recipe}>
              <img src='https://assets3.thrillist.com/v1/image/2797371/size/tmg-article_default_mobile.jpg' alt={recipe} />
              <GridListTileBar
                title={recipe}
                subtitle={<span>by: {recipe}</span>}
                actionIcon={
                  <IconButton aria-label={`info about ${recipe}`} style={styles.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    )
  }
}

export default ListOfRecipes
