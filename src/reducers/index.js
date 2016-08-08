import { combineReducers } from 'redux'
import search from './search'
import player from './player'
import favorite from './favorite'
import ranking from './ranking'

import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  search,
  player,
  favorite,
  ranking,
  routing: routerReducer
})

export default rootReducer
