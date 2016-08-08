export function play() {
  return {
    type: 'PLAY_MUSIC'
  }
}
export function pause() {
  return {
    type: 'PAUSE_MUSIC'
  }
}
export function next() {
  return {
    type: 'NEXT_MUSIC'
  }
}
export function prev() {
  return {
    type: 'PREV_MUSIC'
  }
}
export function set(tracks, nowPlayIndex = 0) {
  return {
    type: 'SET_MUSIC',
    nowPlayIndex: nowPlayIndex,
    tracks: tracks
  }
}
export function setDuration(duration = 0) {
  return {
    type: 'SET_DURATION',
    duration: duration
  }
}
export function changePosition(position = 0) {
  return {
    type: 'CHANGE_POSITION',
    position: position
  }
}
export function clearMessage() {
  return {
    type: 'CLEAR_MESSAGE'
  }
}
