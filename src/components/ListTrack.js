import React, { PropTypes } from 'react'
import { FlatButton, IconButton, List, ListItem, Avatar } from 'material-ui'
import FavoriteIcon from 'material-ui/svg-icons/action/favorite'

class ListTrack extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { favorite, tracks, playerActionBind, favoriteActionBind } = this.props
    return (
      <List>
        {tracks.map((track, i) =>
          <ListItem
            className="font"
            key={i}
            onTouchTap={playerActionBind.set.bind(null, tracks, i)}
            primaryText={track.title}
            secondaryText={track.artist}
            leftAvatar={<Avatar style={{borderRadius: 4}} size={40} src={track.image} />}
            rightIconButton={
              <FlatButton
                icon={<FavoriteIcon color={favorite.favs.find((f) => f.trackId == track.trackId) ? 'red' : 'gray'}/>}
                onTouchTap={(e) => {
                  e.preventDefault()
                  if(favorite.favs.find((f) => f.trackId == track.trackId) ? true : false) {
                    favoriteActionBind.remove(track)
                  } else {
                    favoriteActionBind.add(track)
                  }
                }}
              ></FlatButton>
            }
          />
        )}
      </List>
    );
  }
}
export default ListTrack;
