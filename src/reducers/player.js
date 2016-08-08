export default function player(state = {
  playing: false,
  duration:0,
  position:0,
  tracks: [],
  message: null,
  nowPlayIndex: 0
}, action = {}){
  switch( action.type ){
    case 'PLAY_MUSIC':
      return Object.assign({}, state, {
        playing: true
      })

    case 'PAUSE_MUSIC':
      return Object.assign({}, state, {
        playing: false
      })

    case 'NEXT_MUSIC':
      return Object.assign({}, state, {
        playing: true,
        nowPlayIndex:state.tracks.length-2 < state.nowPlayIndex ? state.nowPlayIndex : state.nowPlayIndex + 1
      })

    case 'PREV_MUSIC':
      return Object.assign({}, state, {
        duration:0,
        position:0,
        nowPlayIndex:state.nowPlayIndex < 1 ? state.nowPlayIndex : state.nowPlayIndex - 1
      })

    case 'SET_MUSIC':
      return Object.assign({}, state, {
        playing: true,
        nowPlayIndex: action.nowPlayIndex,
        tracks: action.tracks,
        duration:0,
        position:0
      })

    case 'SET_DURATION':
      return Object.assign({}, state, {
        duration: action.duration
      })

    case 'CHANGE_POSITION':
      return Object.assign({}, state, {
        position: action.position
      })
    case 'CLEAR_MESSAGE':
      return Object.assign({}, state, {
        message: null
      })
    default:
      return state
  }
}
