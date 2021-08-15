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

    res.send(categories);
  };
}

function dansse2wcjEvent(event: DansSe.Event): Wcj.WcjEvent {
  const pricing = event.pricing?.[0].base[0];
  return {
    id: event.$.eventId,
    title: event.title?.[0],
    occasions: event.schedule?.[0].occasions?.[0].occasion.map(getWcjOccasion),
    bgColor: getBgColor(
      event.primaryEventGroup?.[0]._,
      event.requirements?.[0].level?.[0].$.minValue
    ),
    textColor: "white",
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

function getBgColor(primaryEventGroup: string, level: number) {
  const baseColors = {
    "Lindy Hop": [178, 0.49, 0.4],
    "Boogie Woogie": [299, 0.49, 0.4],
    "Stepp": [8, 0.79, 0.4],
    "Autentisk Jazz": [71, 0.51, 0.4]
  } as {[key: string]: [number, number, number]};
  
  const baseColor = baseColors[primaryEventGroup] ?? [18, 0.16, 0.4];

  baseColor[2] *= 1 + level / 40;

    return hslToHex(...baseColor);
}

function hslToHex(h: number, s: number, l: number) {
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}