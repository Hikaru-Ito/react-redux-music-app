import mongoose from 'mongoose'

const schema = mongoose.Schema({
    userId: String,
    favs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }]
},{ timestamps: true })

const User = mongoose.model('User', schema)

User.findOneOrCreate = async function (user_id) {
  return await this.findOne({userId: user_id}) || this.create({userId: user_id})
}

User.prototype.addFavTrack = function (track) {
  if(this.favs.indexOf(track._id) >= 0) return false
  this.favs.push(mongoose.Types.ObjectId(track._id))
  return this.save()
}

User.prototype.removeFavTrack = function(track) {
  if(this.favs.indexOf(track._id) < 0) return false
  this.favs = this.favs.filter(f => {
      return String(f) != track._id
  })
  return this.save()
}
