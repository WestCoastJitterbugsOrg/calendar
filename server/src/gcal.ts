
/* eslint camelcase: ["error", {allow: ["calendar_v3"]}] */
import ColorHash from 'color-hash'
import { calendar_v3 } from 'googleapis'
export type GCalEvent = calendar_v3.Schema$Event

const colorHash = new ColorHash({
  saturation: [0.35, 0.5, 0.65],
  lightness: [0.35, 0.5, 0.65]
})

const gc2wcjEvent = (gcEvent: any, id: string) => ({
  id,
  title: gcEvent.summary,
  occasions: [],
  showInCalendar: false,
  bgColor: colorHash.hex(gcEvent.summary),
  textColor: colorHash.hsl(gcEvent.summary)[2] > 0.5 ? 'black' : 'white'
})

export default function gc2wcjEvents (gcEvents: GCalEvent []) {
  const wcjEvents: { [id: string]: any } = {}

  for (const gcEvent of gcEvents) {
    // Create id valid for HTML
    // Id needs to be same for all events with the same summaries so they are gouped together
    const id = gcEvent.summary?.replace(/[^A-Za-z0-9-_]/g, '')
    if (!id) {
      throw Error(`Couldn't create id for one of the events: ${JSON.stringify(gcEvent)}`)
    } else if (!gcEvent.start?.dateTime || !gcEvent.end?.dateTime) {
      throw Error(`One event didn't have a start or end date: ${JSON.stringify(gcEvent)}`)
    }

    if (!wcjEvents[id]) {
      wcjEvents[id] = gc2wcjEvent(gcEvent, id)
    }
    wcjEvents[id].occasions.push({
      start: new Date(gcEvent.start.dateTime),
      end: new Date(gcEvent.end.dateTime)
    })
  }

  return wcjEvents
}
