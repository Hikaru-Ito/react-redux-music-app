import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Header, Footer, Player, Message } from '../components'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Paper from 'material-ui/Paper'
import * as searchActions from '../actions/SearchActions'
import * as playerActions from '../actions/PlayerActions'
import * as favoriteActions from '../actions/FavoriteActions'
import * as rankingActions from '../actions/RankingActions'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

export default class AppContainer extends Component {

  constructor(props) {
    super(props)
    this.handleEnterSearchEdit = this.handleEnterSearchEdit.bind(this)
  }

  componentDidMount () {
    const { rankingActionBind, favoriteActionBind } = this.props
    rankingActionBind.get()
    favoriteActionBind.get()
  }
  handleEnterSearchEdit(e, value){
    const ENTER_KEY_CODE = 13
    if(e.keyCode == ENTER_KEY_CODE){
      const { router } = this.context
      router.push({ pathname:'/search', query: { q: value } })
    }
  }

  render() {
    const { search, player, favorite, ranking, searchActionBind, playerActionBind, favoriteActionBind, rankingActionBind, children } = this.props
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <Header
            searchWord={search.searchWord}
            enterSearchEdit={this.handleEnterSearchEdit}
            onChangeSearchWord={this.handleChangeSearchWord}
             />
            <main>
              <Paper className="main-wrapper" zDepth={1} rounded={false}>
              {React.Children.map(children, (child) => {
                return React.cloneElement(child, { search, favorite, ranking, playerActionBind, searchActionBind, favoriteActionBind, rankingActionBind });
              })}
            </Paper>
            </main>
          <Footer />
          <Player
            player={player}
            favorite={favorite}
            action={playerActionBind}
            favoriteActionBind={favoriteActionBind}/>
          <Message {...this.props}/>
        </div>
      </MuiThemeProvider>
    );
  }
}
AppContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}
function mapStateToProps(state) {
  return {
    search: state.search,
    player: state.player,
    favorite: state.favorite,
    ranking: state.ranking
  };
}
function mapDispatchToProps( dispatch ) {
  return {
    searchActionBind: bindActionCreators(searchActions, dispatch),
    playerActionBind: bindActionCreators(playerActions, dispatch),
    favoriteActionBind: bindActionCreators(favoriteActions, dispatch),
    rankingActionBind: bindActionCreators(rankingActions, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
