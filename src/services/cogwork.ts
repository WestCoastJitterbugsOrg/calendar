export default function convertCogworkData(result: Cogwork.Response) {
  const cogworkEvents = result.events.event.filter(
    (event) => event.schedule?.occasions?.occasion != null
  );
  const categories: Wcj.EventCategory[] = [];
  for (const event of cogworkEvents) {
    const categoryName = event.primaryEventGroup ?? event.category ?? "Övrigt";
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

function cogwork2wcjEvent(event: Cogwork.Event): Wcj.Event {
  return {
    id: event["@attributes"].eventId,
    title: event.title,
    occasions: asArray(event.schedule.occasions.occasion)
      .map(getWcjOccasions)
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

function getWcjOccasions(occasions: Cogwork.Occasion): Wcj.Occasion | null {
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
