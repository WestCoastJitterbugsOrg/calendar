export default async function loadCogworkData(): Promise<Wcj.EventCategory[]> {
  const response = await fetch(API_URL + "/cogwork/");

  if (response.ok) {
    const json: Wcj.EventCategory[] = await response.json();

    for (const cat of json) {
      for (const event of cat.events) {
        for (const occ of event.occasions) {
          // Although typed as "Date", the json response contains strings with dates.
          // Using the Date constructor we can make sure they're Dates.
          occ.start = new Date(occ.start);
          occ.end = new Date(occ.end);
        }
      }
    }

    return json;
  } else {
    return Promise.reject(response.text());
  }
}
