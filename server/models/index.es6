import mongoose from 'mongoose'
import user from './user'
import track from './track'

const url = process.env.MONGODB_URI || 'mongodb://localhost/musicm'

export default {
  connect () {
    return mongoose.connect(url)
  }
}
