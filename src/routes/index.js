import React from 'react'
import { Route, IndexRoute } from 'react-router'
import AppContainer from '../containers/AppContainer'
import SearchContainer from '../containers/SearchContainer'
import FavoriteContainer from '../containers/FavoriteContainer'
import RankingContainer from '../containers/RankingContainer'

export default () => {
  return (
      <Route path="/" component={AppContainer}>
        <IndexRoute component={RankingContainer} />
        <Route path="search" component={SearchContainer} />
        <Route path="favorite" component={FavoriteContainer} />
        <Route path="*" component={RankingContainer} />
      </Route>
  )
}
