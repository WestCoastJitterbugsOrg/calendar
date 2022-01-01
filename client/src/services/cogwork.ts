export default async function loadCogworkData(): Promise<Wcj.EventCategory[]> {
  const apiUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8081/calendar-api"
      : "https://wcj.hemsida.eu/calendar-api";

  const response = await fetch(`${apiUrl}/cogwork/`);

  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(response.text());
  }
}
