import axios from 'axios'
import { RequestHandler } from 'express'
import { convertableToString, parseStringPromise } from 'xml2js'

/**
 * @param {string} url sadasd
 * @return {RequestHandler} reqHandler
 */
export default function handleDanSeData (url: string): RequestHandler {
  return async function (_, res) {
    const resp = await axios.post<convertableToString>(url)
    const result = await parseStringPromise(resp) as DansSeReponse
    const events = result.cogwork.events.map(event => event.event)
    res.send(events)
  }
}
