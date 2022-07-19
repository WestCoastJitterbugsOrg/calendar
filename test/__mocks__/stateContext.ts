import { EventStore } from "@app/store/model";

export const mockStore: EventStore = {
  categories: {
    "Lindy Hop": {
      events: ["1"],
      id: "Lindy Hop",
    },
  },
  eventModal: false,
  events: {
    "1": {
      id: "1",
      category: "Lindy Hop",
      instructors: undefined,
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
};
