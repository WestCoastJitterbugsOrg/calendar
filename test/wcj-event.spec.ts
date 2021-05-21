import dayjs from "dayjs";
import makeWcjEventCreator from "../src/app/event/wcj";
import { Dependencies } from "../src/app/types";

type GCalEvent = gapi.client.calendar.Event;


type TestData = { events: GCalEvent[] }

function generateUniqueData(time: Date): TestData {
    const now = dayjs(time);
    const start = now.subtract(1, 'hour').toDate();
    const end = now.add(1, 'hour').toDate();

    const events: GCalEvent[] = [<GCalEvent>{
        summary: "Event 1",
        id: "event_1",
        start: {
            dateTime: start.toISOString()
        },
        end: {
            dateTime: end.toISOString()
        },

    }
    ]

    return { events }
}
describe('WcjEvent', () => {
    let data: TestData;
    let dependencies: Dependencies;


    beforeEach(() => {
        const testTime = new Date(2020, 1, 1);
        data = generateUniqueData(testTime);
        dependencies = <Dependencies>{
            initWcjColorHash: (_ => ({
                hex: _ => '#000000',
                hsl: _ => [0, 0, 0],
                rgb: _ => [0, 0, 0]
            }))
        }
    });

    test('createFromGoogleCal', () => {
        // init page handler
        const wcjEventDict = makeWcjEventCreator(dependencies).createFromGoogleCal(data.events);
        expect(Object.keys(wcjEventDict).length).toEqual(data.events.length);
    });
})
