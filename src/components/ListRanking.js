import React, { PropTypes } from 'react'
import { List, ListItem, Avatar } from 'material-ui'

class ListRanking extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { ranking_tracks } = this.props
    const { router } = this.context
    return (
      <List>
        {ranking_tracks.map((track, i) =>
          <ListItem
            className="font"
            key={i}
            leftAvatar={<Avatar style={{borderRadius: 4}} size={40} src={track['im:image'][track['im:image'].length-1].label} />}
            onTouchTap={() => router.push({ pathname:'/search', query: { q: `${track['im:name'].label} ${track['im:artist'].label}` } })}
            primaryText={track['im:name'].label}
            secondaryText={track['im:artist'].label}
          />
        )}
      </List>
    );
  }
}
ListRanking.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default ListRanking;
