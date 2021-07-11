export async function loadDansseData(): Promise<Wcj.WcjEventCategory[]> {
  const response = await fetch(`${API_URL}/wcj-courses`);

  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject("Could not load data");
  }
}
