import StateContext from "@app/store/model";

export function initContext() {
  const response = asArray(cw_data.events.event);

  const cogworkEvents = response.filter(
    (event) => event.schedule?.occasions?.occasion != null
  );

  const uncheckedEventsStr = localStorage.getItem("uncheckedEvents");
  const uncheckedEvents: string[] = uncheckedEventsStr
    ? JSON.parse(uncheckedEventsStr)
    : [];

  const categories: StateContext["categories"] = {};
  const events: StateContext["events"] = {};

  for (const cogworkEvent of cogworkEvents) {
    const event = cogwork2wcjEvent(cogworkEvent);
    event.showInCalendar = !uncheckedEvents.includes(event.id);

    // Add event to store
    events[event.id] = event;

    // Add category if it hasn't been seen before,
    // and in any case make sure the event id is
    // added to the category
    if (!Object.keys(categories).includes(event.category)) {
      categories[event.category] = {
        id: event.category,
        events: [event.id],
      };
    } else {
      categories[event.category].events.push(event.id);
    }
  }

  return {
    categories: categories,
    events: events,
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
    registrationUrl: asArray(event.registration)[0]?.url,
    place: event.place,
    price: event.pricing?.base,
    instructors: event.instructors?.combinedTitle,
  };
}

function cogwork2WcjOccasions(
  occasions: Cogwork.Occasion
): Wcj.Occasion | null {
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

function asArray<T>(objOrArr: MaybeArray<T>) {
  if (Array.isArray(objOrArr)) {
    return objOrArr;
  } else {
    return [objOrArr];
  }
}
