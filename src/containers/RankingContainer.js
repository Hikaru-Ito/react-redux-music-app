import React, { Component, PropTypes } from 'react'

import CircularProgress from 'material-ui/CircularProgress'

import { ListRanking } from '../components';

class RankingContainer extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { ranking } = this.props
    let loading = ranking.isProcessing ? <CircularProgress size={1.5} /> : null
    return (
      <div>
        <h2>JPOP Ranking</h2>
        {loading}
        <ListRanking
          ranking_tracks={ranking.list} />
      </div>
    )
  }
}

export default RankingContainer
