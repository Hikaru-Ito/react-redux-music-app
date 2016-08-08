import {Router} from 'express'
import { SearchMusic } from '../../util/search-music'
const router = Router()

/*
  音楽を検索するAPI
*/
export default new class SearchController {

  route() {
    router.get('/', this.index)
    router.get('/music', this.music)
    return router
  }

  index(req, res) {
    res.send(404)
  }

  async music (req, res){
    var data = await SearchMusic({query: req.query.q || '宇多田ヒカル'})
    res.json(data)
  }

}
