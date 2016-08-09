import React, { PropTypes } from 'react'
import { FlatButton, ListItem, IconButton } from 'material-ui'
import PlayIcon from 'material-ui/svg-icons/av/play-arrow'
import PauseIcon from 'material-ui/svg-icons/av/pause'
import NextIcon from 'material-ui/svg-icons/av/skip-next'
import PrevIcon from 'material-ui/svg-icons/av/skip-previous'
import MuteIcon from 'material-ui/svg-icons/av/volume-off'
import UnMuteIcon from 'material-ui/svg-icons/av/volume-up'
import FavoriteIcon from 'material-ui/svg-icons/action/favorite'
import DownloadIcon from 'material-ui/svg-icons/file/file-download'
import {grey50, red500} from 'material-ui/styles/colors';
import { Media, controls, withMediaProps } from 'react-media-player'
const { CurrentTime, Progress, SeekBar, Duration } = controls
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'

class Player extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { player, favorite, action, favoriteActionBind, media } = this.props
    const track = player.tracks.length == 0 ? {} : player.tracks[player.nowPlayIndex]
    const isPlayerSet = player.tracks.length > 0
    const isFaved = favorite.favs.find((f) => f.trackId == track.trackId) ? true : false
    var element = null
    element = (
      <Media
        src={track.mp3 || 'http://tsmusic24.tc.qq.com/4902613.m4a'}
        vendor="audio"
        onPlay={(e) => action.play()}
        onPause={(e) => action.pause()}
        onError={null}
        autoPlay={player.playing}
        onEnded={(e)=> action.next()}>
        {Player =>
          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <div className="media player-wrapper">
            <div className="media-player">
              {Player}
            </div>
            <div className="media-controls">
              <IconButton
                onClick={action.prev.bind(null)}
                disabled={player.nowPlayIndex < 1 || !isPlayerSet}
              ><PrevIcon /></IconButton>
              <PlayPause />
              <IconButton
                onClick={action.next.bind(null)}
                disabled={player.nowPlayIndex > player.tracks.length-2 || !isPlayerSet}
                ><NextIcon /></IconButton>
              <CurrentTime className="media-control media-control--current-time"/>
              <SeekBar className="media-control media-control--seekbar"/>
              <Duration className="media-control media-control--duration"/>
              <MuteUnmute className="media-control media-control--mute-unmute"/>
              <div className="song-info">
                <img className="thum" src={track.image} />
                <p className="title">{track.title}</p>
                <p className="artist">{track.artist}</p>
              </div>
              <a href={track.mp3} download={`${track.title}.m4a`} target="_blank"><IconButton><DownloadIcon /></IconButton></a>
              <IconButton
                disabled={!isPlayerSet}
                iconStyle={{color:isFaved ? red500 : grey50 }}
                onClick={(e) => {
                  if(isFaved) {
                    favoriteActionBind.remove(track)
                  } else {
                    favoriteActionBind.add(track)
                  }
                }}
              ><FavoriteIcon /></IconButton>
            </div>
          </div>
          </MuiThemeProvider>
        }
      </Media>
    )
    return (
      <div>{isPlayerSet ? element : null}</div>
    )
  }
}
export default withMediaProps(Player)

class PlayPause extends React.Component {
  static contextTypes = {
    isPlaying: PropTypes.bool,
    playPause: PropTypes.func
  }

  _handlePlayPause = () => {
    this.context.playPause()
  }

  render() {
    return (
      <IconButton
        onClick={this._handlePlayPause}>
        {this.context.isPlaying ? <PauseIcon /> : <PlayIcon />}
      </IconButton>
    )
  }
}

class MuteUnmute extends React.Component {
  static contextTypes = {
    muteUnmute: PropTypes.func,
    isMuted: PropTypes.bool
  }

  _handleMuteUnmute = () => {
    this.context.muteUnmute()
  }

  render() {
    return (
      <IconButton
        onClick={this._handleMuteUnmute}>
        {this.context.isMuted ? <MuteIcon /> : <UnMuteIcon />}
      </IconButton>
    )
  }
}
