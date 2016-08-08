export default function favorite(state = {
  isProcessing: false,
  favs: [],
  message: null,
  isAddMode: false
}, action = {}){
  switch( action.type ){
    case 'REQUEST_FAV_GET_PROCESS':
      return Object.assign({}, state, {
        isProcessing: true
      })
    case 'SUCCESS_FAV_GET':
      return Object.assign({}, state, {
        isProcessing: false,
        favs: action.favs
      })
    case 'FAILED_FAV_GET':
      return Object.assign({}, state, {
        isProcessing: false
      })
    case 'SUCCESS_FAV_ADDED':
      let f = [].concat(state.favs)
      f.push(action.track)
      return Object.assign({}, state, {
        favs: f,
        message: "お気に入りに追加しました"
      })
    case 'FAILED_FAV_ADDED':
      return Object.assign({}, state, {
        favs: []
      })
    case 'SUCCESS_FAV_REMOVED':
      var f = [].concat(state.favs)
      f = f.filter(t => t.trackId != action.track.trackId)
      return Object.assign({}, state, {
        favs: f,
        message: "お気に入りから削除しました"
      })
    case 'FAILED_FAV_REMOVED':
      return Object.assign({}, state, {
        favs: []
      })
    case 'ALREADY_FAV_ADDED':
      return Object.assign({}, state, {
        isProcessing: false,
        message: 'すでにプレイリストに追加されています'
      })
    case 'CLEAR_MESSAGE':
      return Object.assign({}, state, {
        message: null
      })
    default:
      return state
  }
}
