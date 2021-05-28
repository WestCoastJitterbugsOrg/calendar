import dayjs from "dayjs";
import { Dependencies } from '../types';

export function loadGCalData(deps: Dependencies,
    timeMin = dayjs(new Date()).subtract(6, "month").toDate(),
    timeMax = dayjs(new Date()).add(1, "year").toDate(),
):
    Promise<{ [id: string]: Wcj.WcjEvent }> {
    return new Promise((resolve, reject) => {
        $.ajax({
            
            url: `${API_URL}/gcal?from=${timeMin.toISOString()}&to=${timeMax.toISOString()}`,
            success: response => resolve(response),
            error: reject,
            async: true
        });

    });
}
