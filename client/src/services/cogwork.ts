export default async function loadCogworkData(): Promise<Wcj.EventCategory[]> {
  const apiUrl = process.env.API_URL

  const response = await fetch(`${apiUrl}/cogwork/`);

  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(response.text());
  }
}
