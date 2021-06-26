import dayjs from "dayjs";

export async function loadDansseData():
    Promise<{ [id: string]: Wcj.WcjEvent }> {
    const response = await fetch(`${API_URL}/wcj-courses`);

    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject("Could not load data");
    }
}
