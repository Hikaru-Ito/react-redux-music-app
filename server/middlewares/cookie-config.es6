import cookie from 'cookie'
import crypto from 'crypto'

export function CheckCookie(req, res, next) {
  console.log(req.cookies.userID)
  if(!req.cookies.userID) {
    res.cookie('userID', generateUserID(), { maxAge:15 * 365 * 24 * 60 * 60 * 1000, httpOnly:false })
  }
  next()
}

function generateUserID() {
  return crypto.createHash('md5')
              .update(String(Math.random() * Date.now()), 'utf8')
              .digest('hex')
}
