import axios from 'axios'
import ColorHash from 'color-hash'
import { RequestHandler } from 'express'
import { convertableToString, parseStringPromise } from 'xml2js'
import dayjs from 'dayjs'

const colorHash = new ColorHash({
  saturation: [0.35, 0.5, 0.65],
  lightness: [0.35, 0.5, 0.65]
})

export default function handleDanSeData (url: string): RequestHandler {
  return async function (_, res) {
    const resp = await axios.post<convertableToString>(url)
    const result = await parseStringPromise(resp.data) as DansSe.Response
    const events = result.cogwork.events.map(event => event.event)[0]
    .filter(event => event.schedule?.[0]?.occasions?.some?.(x => x.occasion))
      .map<Wcj.WcjEvent>(event => ({
        id: event.$.eventId,
        title: event.title[0],
        occasions: event.schedule[0].occasions[0].occasion.map(getWcjOccasion),
        showInCalendar: false,
        bgColor: colorHash.hex(event.title[0]),
        textColor: colorHash.hsl(event.title[0])[2] > 0.5 ? 'black' : 'white',
      })
      );
    const sortedEvents = 
      events.sort((a, b) => getStart(a) - getStart(b));

      const response = {};
      for(const event of sortedEvents) {
         response[event.id] = event; 
      }

    res.send(response)
  }
}

function getWcjOccasion(occasion: DansSe.Occasion) {
  const start = occasion.startDateTime[0]._;
  const end = occasion.endDateTime[0]._;

  return { start: dayjs(start, {utc: true}).toDate(), end: dayjs(end, {utc: true}).toDate()};
}
 
function getStart(dansEvent: Wcj.WcjEvent) {
  const start = dansEvent.occasions.sort((occ1, occ2) => occ1.start.getTime() - occ2.start.getTime())[0].start;
  return start.getTime() || Number.MIN_SAFE_INTEGER;
}

