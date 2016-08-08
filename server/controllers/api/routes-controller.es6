import {Router} from 'express'
const router = Router()
import SearchController from './search-controller'
import FavoriteController from './favorite-controller'


export default new class APIRouterController {
  route() {
    router.get('/', this.index)
    router.use('/search', SearchController.route())
    router.use('/favorite', FavoriteController.route())
    return router
  }

  index(req, res) {
    let data = {
      api: true,
      date: new Date().getTime()
    }
    res.json(data)
  }

}
