export default function ranking(state = {
  isProcessing: false,
  list: [],
  message: null
}, action = {}){
  switch( action.type ){
    case 'REQUEST_RANKING_PROCESS':
      return Object.assign({}, state, {
        isProcessing: true,
        message: "ランキング取得中"
      })
    case 'SUCCESS_GET_RANKING':
      return Object.assign({}, state, {
        isProcessing: false,
        list: action.list,
        message: null
      })
    case 'FAILED_GET_RANKING':
      return Object.assign({}, state, {
        isProcessing: false,
        list: [],
        message: "ランキング取得に失敗しました"
      })
    default:
      return state
  }
}
