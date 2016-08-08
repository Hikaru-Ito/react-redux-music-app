import {Router} from 'express'
import cookie from 'cookie'
import mongoose from 'mongoose'
const User = mongoose.model('User')
const Track = mongoose.model('Track')

const router = Router()

/*
  Favorite API
*/
export default new class FavoriteController {

  route() {
    router.get('/', this.index)
    router.post('/add', this.add)
    router.delete('/remove/:trackId', this.remove)
    return router
  }

  async index(req, res) {
    await User.findOneOrCreate(req.cookies.userID)
    res.json(await User.findOne({userId: req.cookies.userID}).populate('favs'))
  }

  async add(req, res){
    if(!req.body.trackId || Object.keys(req.body).length < 5) res.status(500).send('failed')
    let user = await User.findOneOrCreate(req.cookies.userID)
    let track = await Track.findOneOrCreate(req.body)
    let added = await user.addFavTrack(track)
    res.json({ result: added })
  }

  async remove(req, res) {
    console.log(req.params)
    if(!req.params.trackId) res.status(500).send('failed')
    let user = await User.findOneOrCreate(req.cookies.userID)
    let track = await Track.findOne({trackId: req.params.trackId})
    let removed = await user.removeFavTrack(track)
    res.json({ result: removed })
  }

}
