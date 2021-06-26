import dayjs from "dayjs";

export async function loadDansseData(timeMin = dayjs(new Date()).subtract(6, "month").toDate(),
    timeMax = dayjs(new Date()).add(1, "year").toDate()
):
    Promise<{ [id: string]: Wcj.WcjEvent }> {
    const response = await fetch(`${API_URL}/gcal?from=${timeMin.toISOString()}&to=${timeMax.toISOString()}`);

    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject("Could not load data");
    }
}
