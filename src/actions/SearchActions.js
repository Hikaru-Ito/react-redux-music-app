import request from "axios"

function requestProcess(searchWord) {
  return {
    type: 'REQUEST_SEARCH_PROCESS',
    searchWord: searchWord
  }
}
export function search(searchWord){
  return dispatch => {
    dispatch( requestProcess(searchWord) )
    return request.get('/api/search/music',{ params: { q: searchWord }})
          .then(res => {
            dispatch({
              type: 'SUCCESS_SEARCH',
              searchedList: res.data.tracks
            })
          })
          .catch(res => dispatch({ type: 'FAILED_SEARCH' }))
  };
}
export function clearMessage() {
  return {
    type: 'CLEAR_MESSAGE'
  }
}
