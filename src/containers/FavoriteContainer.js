import React, { Component, PropTypes } from 'react'

import CircularProgress from 'material-ui/CircularProgress'

import { ListTrack } from '../components';

class FavoriteContainer extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { favorite, favoriteActionBind, playerActionBind } = this.props
    let loading = favorite.isProcessing ? <CircularProgress size={1} /> : null
    return (
      <div>
        <h2>{favorite.favs.length} favorite tracks</h2>
        {loading}
        <ListTrack
          favorite={favorite}
          tracks={favorite.favs}
          playerActionBind={playerActionBind}
          favoriteActionBind={favoriteActionBind} />
      </div>
    )
  }
}

export default FavoriteContainer
