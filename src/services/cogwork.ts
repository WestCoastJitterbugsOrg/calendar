import EventStore from "@app/store/model";

export default function initContext(): EventStore {
  const response: Cogwork.Event[] = wcjcal_ajax_obj.data.events.event;
  const cogworkEvents = response.filter(
    (event) => event.schedule?.occasions?.occasion != null
  );
  const categories: EventStore["categories"] = { byId: {}, allIds: [] };
  const events: EventStore["events"] = { byId: {}, allIds: [] };

  for (const cogworkEvent of cogworkEvents) {
    const event = cogwork2wcjEvent(cogworkEvent);

    // Add event to store
    events.allIds.push(event.id);
    events.byId[event.id] = event;

    // Add category if it hasn't been seen before,
    // and in any case make sure the event id is 
    // added to the category
    if (!categories.allIds.includes(event.category)) {
      categories.allIds.push(event.category);
      categories.byId[event.category] = {
        id: event.category,
        events: [event.id],
      };
    } else {
      categories.byId[event.category].events.push(event.id);
    }
  }

  return {
    categories: categories,
    events: events,
    eventModal: false as const,
  };
}

function cogwork2wcjEvent(event: Cogwork.Event): Wcj.Event {
  return {
    id: event["@attributes"].eventId,
    category: event.primaryEventGroup ?? event.category ?? "Övrigt",
    title: event.title,
    occasions: asArray(event.schedule.occasions.occasion)
      .map(cogwork2WcjOccasions)
      .filter((x): x is Wcj.Occasion => x != null),
    color: "",
    description: event.longdescription,
    registrationUrl: event.registration.url,
    place: event.place ?? "Unknown",
    price: event.pricing?.base ?? "Unknown",
    instructors: event.instructors?.combinedTitle ?? "Unknown",
    showInCalendar: true,
  };
}

function cogwork2WcjOccasions(occasions: Cogwork.Occasion): Wcj.Occasion | null {
  const start = occasions.startDateTime;
  const end = occasions.endDateTime;

  if (start == null || end == null) {
    return null;
  }

  return {
    start: new Date(start),
    end: new Date(end),
  };
}

function asArray<T>(objOrArr: T | T[]) {
  if (Array.isArray(objOrArr)) {
    return objOrArr;
  } else {
    return [objOrArr];
  }
}
