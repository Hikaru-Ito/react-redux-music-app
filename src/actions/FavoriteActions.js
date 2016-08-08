import request from "axios"

function requestProcess() {
  return {
    type: 'REQUEST_FAV_GET_PROCESS'
  }
}
export function add(track){
  return dispatch => {
    return request.post('/api/favorite/add', track)
        .then(res => {
          console.log(res)
          if(!res.data.result) return dispatch({ type: 'ALREADY_FAV_ADDED' })
          dispatch({ type: 'SUCCESS_FAV_ADDED', track: track })
        })
        .catch(res => dispatch({ type: 'FAILED_FAV_ADDED' }))
  }
}
export function remove(track) {
  return dispatch => {
    return request.delete(`/api/favorite/remove/${track.trackId}`)
        .then(res => {
          console.log(res)
          if(!res.data.result) return
          dispatch({ type: 'SUCCESS_FAV_REMOVED', track: track})
        })
        .catch(res => dispatch({ type: 'FAILED_FAV_REMOVED' }))
  }
}
export function get(){
  return dispatch => {
    dispatch( requestProcess() )
    return request.get('/api/favorite')
        .then(res => {
          console.log(res)
          dispatch({
            type: 'SUCCESS_FAV_GET',
            favs: res.data.favs
          })
        })
        .catch(res => dispatch({ type: 'FAILED_FAV_GET' }))
  }
}
export function clearMessage() {
  return {
    type: 'CLEAR_MESSAGE'
  }
}
