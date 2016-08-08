import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import webpack from 'webpack'
import config from '../webpack.config.dev'
const compiler = webpack(config)

// connect mongodb
import models from './models'
models.connect().catch(console.error)

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())



if (process.env.NODE_ENV === 'development') {
  // development
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
  app.use(require('webpack-hot-middleware')(compiler))
}

// Routes
import APIRouterController from './controllers/api/routes-controller'
import { CheckCookie } from './middlewares/cookie-config'
app.use('/api', CheckCookie, APIRouterController.route())

if (process.env.NODE_ENV === 'development') {
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../index.html'))
  })
} else {
  app.use('/static', express.static(path.join(__dirname, '../static')))
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../index.html'))
  })
}

export { app }
