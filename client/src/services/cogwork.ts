export default async function loadCogworkData(): Promise<Wcj.EventCategory[]> {
  

  const response = await fetch(API_URL + "/cogwork/");

  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(response.text());
  }
}
