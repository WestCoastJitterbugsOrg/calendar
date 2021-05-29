import fs from 'fs'
import path from 'path'
import express from 'express'
import { google } from 'googleapis'
import gcal2wcj from './gcal'
import cors from 'cors'
import handleDanSeData from './dansse'

// #region setup
const isDev = process.env.NODE_ENV === 'development'

const app = express()

if (isDev) {
  console.log('Running in development mode')
  app.use(cors())
}

const PORT = isDev ? 8081 : 80
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
})

// #endregion

// #region dans.se endpoints
app.get('/api/ma-events', handleDanSeData('https://dans.se/xml/?type=events&org=ma'))

const pw = fs.readFileSync(path.resolve(__dirname, 'wcjpassword'), 'utf8')
app.get('/api/wcj-events', handleDanSeData(`https://dans.se/xml/?type=events&org=wcj&pw=${pw}`))
// #endregion

// #region Google calendar endpoints
app.get('/api/gcal', async function (req, res) {
  try {
    const events = await google.calendar({
      version: 'v3',
      auth: 'AIzaSyCMeXBPWfEvrxH4-U8y3VpWhDPZnwYqRMc'
    }).events.list(
      {
        calendarId: 'wcj.se_57n2cj034c49cirl0rl20t3io4@group.calendar.google.com',
        alwaysIncludeEmail: false,
        timeMin: req.query.from?.toString() || new Date(2019, 8, 1).toISOString(),
        timeMax: req.query.to?.toString() || new Date(2019, 11, 1).toISOString()
      })
    if (events.data.items) {
      const ret = gcal2wcj(events.data.items)
      res.json(ret)
    } else {
      throw Error('Google Calendar API returned items as undefined')
    }
  } catch (x) {
    res.status(500).send(x); throw x
  }
})
// #endregion
