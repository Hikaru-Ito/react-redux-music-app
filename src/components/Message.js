import React, { PropTypes } from 'react'
import Snackbar from 'material-ui/Snackbar'

class Message extends React.Component {

  handleRequestClose({ search, player, favorite }) {
    const { searchActionBind } = this.props
    searchActionBind.clearMessage()
  }

  render() {
    const { search, player, favorite, ranking } = this.props
    const isOpen = search.message || player.message || favorite.message || ranking.message ? true : false
    return (
      <Snackbar
        open={isOpen}
        message={search.message || player.message || favorite.message || ranking.message || ""}
        autoHideDuration={4000}
        onRequestClose={this.handleRequestClose.bind(this)}
      />
    );
  }
}
export default Message;
