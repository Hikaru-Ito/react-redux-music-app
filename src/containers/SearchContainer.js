import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';

import CircularProgress from 'material-ui/CircularProgress'
import Paper from 'material-ui/Paper'

import { ListTrack } from '../components';

class SearchContainer extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
  }

  componentWillReceiveProps (nextProps) {
    // queryParamsが変更されたら再度検索をかける
    const { searchActionBind, location } = this.props
    if(nextProps.location.query.q && location.query.q != nextProps.location.query.q) {
      searchActionBind.search(nextProps.location.query.q)
    }
  }

  componentDidMount () {
    const { searchActionBind } = this.props
    let query = this.props.location.query.q || '宇多田ヒカル'
    searchActionBind.search(query)
  }

  render() {
    const { favorite, search, playerActionBind, favoriteActionBind } = this.props
    let loading = search.isProcessing ? <CircularProgress size={1.5} /> : null
    return (
      <div>
        <h2>Search results for "{search.searchWord}"</h2>
        {loading}
        <ListTrack
          favorite={favorite}
          tracks={search.searchedList}
          playerActionBind={playerActionBind}
          favoriteActionBind={favoriteActionBind} />
      </div>
    )
  }
}

export default SearchContainer
