import dayjs from 'dayjs'
import gcal2wcj, { GCalEvent } from '../src/gcal'

type TestData = { events: GCalEvent[] }

function generateUniqueData (time: Date): TestData {
  const now = dayjs(time)
  const start = now.subtract(1, 'hour').toDate()
  const end = now.add(1, 'hour').toDate()

  const events: GCalEvent[] = [<GCalEvent>{
    summary: 'Event 1',
    id: 'event_1',
    start: {
      dateTime: start.toISOString()
    },
    end: {
      dateTime: end.toISOString()
    }

  }
  ]

  return { events }
}
describe('WcjEvent', () => {
  let data: TestData
  let dependencies: any

  beforeEach(() => {
    const testTime = new Date(2020, 1, 1)
    data = generateUniqueData(testTime)
    dependencies = {
      initWcjColorHash: (_: any) => ({
        hex: (_: any) => '#000000',
        hsl: (_: any) => [0, 0, 0],
        rgb: (_: any) => [0, 0, 0]
      })
    }
  })

  it('createFromGoogleCal', () => {
    // init page handler
    const wcjEventDict = gcal2wcj(data.events)
    expect(Object.keys(wcjEventDict).length).toEqual(data.events.length )
  })
})
