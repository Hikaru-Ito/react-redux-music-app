import request from "axios"
import { MUSIC_SEARCH_API, MUSIC_IMAGE_URL, MUSIC_MP3_URL } from './constants'

export async function SearchMusic({query = '', num = 30, page = 1}) {

  var obj = await getData(query, num, page)
  let data = {
    tracks: [],
    more: false
  }
  data.tracks = obj.song.list.filter((t) => {
    let f = t.f.split('|')
    if(f.length < 2) return false
    return true
  }).map((t)=> {
    let f = t.f.split('|')
    return {
      trackId: f[0] || null,
      title: t.fsong,
      artist: t.fsinger,
      album: f[5] || null,
      image: convertImageURL(f[f.length-3] || null),
      mp3: MUSIC_MP3_URL.replace(/{MUSIC_ID}/g ,f[0] || null)
    }
  })
  return data
}

function getData(query, num, page) {
  const url = MUSIC_SEARCH_API
                .replace(/{NUM}/g ,num)
                .replace(/{PAGE}/g ,page)
                .replace(/{QUERY}/g ,encodeURIComponent(query))
  return new Promise((resolve, reject) => {
    request
      .get(url)
      .then(function (response) {
        resolve(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
        reject(err);
      });
  })
}

function convertImageURL(image_id, size=150) {
  return MUSIC_IMAGE_URL
          .replace(/{SIZE}/g, size)
          .replace(/{SUB1}/g, image_id.slice(image_id.length-2, image_id.length-1))
          .replace(/{SUB2}/g, image_id.slice(-1))
          .replace(/{IMAGE_ID}/g, image_id)
}
