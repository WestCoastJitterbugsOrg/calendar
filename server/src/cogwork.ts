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

enum RegStatus {
  ALL = 0, // Alla. Gamla, aktuella och kommande aktiviteter
  OPEN_FOR_REG = "OPEN_FOR_REG", // Alla aktiviteter som är öppna för anmälan
  PUBLIC = "PUBLIC", // Alla aktiviteter som just nu visas publikt (default*)
  NONE_EXPIRED = "NONE_EXPIRED", // Publikt synliga, dolda och framtida aktiviteter
  NOT_YET_SHOWN = "NOT_YET_SHOWN", // Endast framtida ännu ej visade aktiviteter
}

class CwObjDateInterval {
  timeFrame: "next" | "last";
  periodNumber: number;
  periodUnit: "m" | "y";

  toString() {
    return this.timeFrame + this.periodNumber + this.periodUnit;
  }
}
type CwSeasonDateInterval = `${"spring" | "summer" | "autumn" | "winter"}Term`;
type CwDateInterval = CwObjDateInterval | CwSeasonDateInterval;

interface CogworkOpts {
  onlyCourses?: boolean;
  regStatus?: RegStatus;
  dateInterval?: CwDateInterval;
}

const defaultCogworkOpts: CogworkOpts = {
  onlyCourses: false,
  regStatus: RegStatus.ALL,
  dateInterval: null,
};

export default function fetchCogworkEvents(
  organization: string,
  password: string,
  opts?: CogworkOpts
): RequestHandler<
  void,
  Wcj.WcjEventCategory[] | { name: string; message: string; stack: string[] },
  void,
  void,
  null
> {
  opts = {
    onlyCourses: opts.onlyCourses ?? defaultCogworkOpts.onlyCourses,
    regStatus: opts.regStatus ?? defaultCogworkOpts.regStatus,
    dateInterval: opts.dateInterval ?? defaultCogworkOpts.dateInterval,
  };

  const type = opts.onlyCourses ? "courses" : "events";
  const dateInterval = opts.dateInterval?.toString();

  return async function (_, res) {
    const url = `https://minaaktiviteter.se/xml/`;
    try {
      const resp = await axios.post<convertableToString>(url, {
        type: type,
        org: organization,
        pw: password,
        regStatus: opts.regStatus,
        dateInterval: dateInterval,
      });
      const result = (await parseStringPromise(resp.data)) as Cogwork.Response;
      res.send(convertCogworkData(result));
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({
          name: error.name,
          message: error.message,
          stack: error.stack.split("\n"),
        });
      } else {
        res.status(500).send(error);
      }
    }
  };
}

function convertCogworkData(result: Cogwork.Response): Wcj.WcjEventCategory[] {
  const cogworkEvents = result.cogwork.events
    .map((event) => event.event)[0]
    .filter((event) =>
      event.schedule?.[0]?.occasions?.some?.((x) => x.occasion)
    );

  const categories: Wcj.WcjEventCategory[] = [];
  for (const event of cogworkEvents) {
    const categoryName =
      event.primaryEventGroup?.[0]._ || event.category?.[0]._ || "Övrigt";
    const category = categories.find((x) => x.category === categoryName);
    if (category === undefined) {
      categories.push({
        category: categoryName,
        events: [cogwork2wcjEvent(event)],
      });
    } else {
      category.events.push(cogwork2wcjEvent(event));
    }
  }
  return categories;
}

function cogwork2wcjEvent(event: Cogwork.Event): Wcj.WcjEvent {
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
    showInCalendar: true,
  };
}

function getWcjOccasion(occasion: Cogwork.Occasion) {
  const start = occasion.startDateTime[0]._;
  const end = occasion.endDateTime[0]._;

  return {
    start: dayjs(start, { utc: true }).toDate(),
    end: dayjs(end, { utc: true }).toDate(),
  };
}
