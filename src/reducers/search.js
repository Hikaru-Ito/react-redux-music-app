export default function search(state = {
  searchWord: "",
  isProcessing: false,
  searchedList: [],
  message: null
}, action = {}){
  switch( action.type ){
    case 'REQUEST_SEARCH_PROCESS':
      return Object.assign({}, state, {
        searchWord: action.searchWord,
        searchedList: [],
        isProcessing: true,
        message: "検索中・・・"
      })
    case 'SUCCESS_SEARCH':
      return Object.assign({}, state, {
        isProcessing: false,
        searchedList: action.searchedList,
        message: null
      })
    case 'FAILED_SEARCH':
      return Object.assign({}, state, {
        isProcessing: false,
        searchedList: [],
        message: null
      })
    case 'CLEAR_MESSAGE':
      return Object.assign({}, state, {
        message: null
      })
    default:
      return state
  }
}
