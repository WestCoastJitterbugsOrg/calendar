import axios from "axios";
import ColorHash from "color-hash";
import { RequestHandler } from "express";
import { convertableToString, parseStringPromise } from "xml2js";
import dayjs from "dayjs";

const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

const colorHash = new ColorHash({
  lightness: range(0.3, 0.7, 0.1),
});

export default function handleDanSeData(url: string): RequestHandler {
  return async function (_, res) {
    const resp = await axios.post<convertableToString>(url);
    const result = (await parseStringPromise(resp.data)) as DansSe.Response;
    res.send(convertCogworkData(result));
  };
}

function convertCogworkData(result: DansSe.Response): Wcj.WcjEventCategory[] {
  const dansseEvents = result.cogwork.events
      .map((event) => event.event)[0]
      .filter((event) =>
        event.schedule?.[0]?.occasions?.some?.((x) => x.occasion)
      );

    const categories: Wcj.WcjEventCategory[] = [];
    for (const event of dansseEvents) {
      const category = categories.find(
        (x) => x.category === event.primaryEventGroup[0]._
      );
      if (category === undefined) {
        categories.push({
          category: event.primaryEventGroup[0]._,
          events: [dansse2wcjEvent(event)],
        });
      } else {
        category.events.push(dansse2wcjEvent(event));
      }
    }
    return categories;
}

function dansse2wcjEvent(event: DansSe.Event): Wcj.WcjEvent {
  const pricing = event.pricing?.[0].base[0];
  return {
    id: event.$.eventId,
    title: event.title?.[0],
    occasions: event.schedule?.[0].occasions?.[0].occasion.map(getWcjOccasion),
    color: colorHash.hex(event.$.eventId),
    description: event.longdescription?.[0],
    registrationUrl: event.registration?.[0]?.url[0],
    place: event.place?.[0] || "Unknown",
    price: pricing ? pricing._ + " " + pricing.$.currency : "Unknown",
    instructors: event.instructors?.[0].combinedTitle?.[0] || "Unknown",
  };
}

function getWcjOccasion(occasion: DansSe.Occasion) {
  const start = occasion.startDateTime[0]._;
  const end = occasion.endDateTime[0]._;

  return {
    start: dayjs(start, { utc: true }).toDate(),
    end: dayjs(end, { utc: true }).toDate(),
  };
}