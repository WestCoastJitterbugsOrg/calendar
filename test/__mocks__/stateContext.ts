import { EventStore } from "@app/store";
import { StateContext } from "@app/store/StateWrapper";

export const mockStore: EventStore = {
  categories: {
    byId: {
      "Lindy Hop": {
        events: ["1"],
        id: "Lindy Hop",
      },
    },
    allIds: ["Lindy Hop"],
  },
  eventModal: false,
  events: {
    byId: {
      "1": {
        id: "1",
        instructors: "",
        occasions: [
          {
            start: new Date("2022-01-01 18:00"),
            end: new Date("2022-01-01 20:00"),
          },
        ],
        place: "Forum",
        price: "1337",
        color: "green",
        registrationUrl: "https://example.com/registration",
        title: "Grundkurs Lindy Hop",
        description: "",
        showInCalendar: true,
      },
    },
    allIds: ["1"],
  },
}

export const mockStateContext: StateContext = {
  dispatch: (e) => console.log(e.type.toString()),
  state: mockStore,
};
