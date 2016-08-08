import mongoose from 'mongoose'

const schema = mongoose.Schema({
    trackId: Number,
    title: String,
    artist: String,
    album: String,
    image: String,
    mp3: String
},{ timestamps: true })

const Track = mongoose.model('Track', schema)

Track.findOneOrCreate = async function (track) {
  return await this.findOne({trackId: track.trackId}) || this.create(track)
}
