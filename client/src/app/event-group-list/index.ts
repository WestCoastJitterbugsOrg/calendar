import { WcjEventListCreator } from "./types";
import "jquery";
import "jquery-modal";

const initEventList: WcjEventListCreator = (allEvents, calendar) => {
  let selectedEvents: Wcj.WcjEvent[] = [];
  const select = (id: string) => {
    const foundEvent = allEvents.find((x) => x.id === id);
    foundEvent.showInCalendar = true;
    selectedEvents.push(foundEvent);
    return foundEvent;
  };
  const deselect = (id: string) => {
    const foundEvent = allEvents.find((x) => x.id === id);
    foundEvent.showInCalendar = false;
    selectedEvents = selectedEvents.filter((x) => x.id !== id);
    return foundEvent;
  };

  const courseSelectionChange: (
    e: Wcj.WcjEvent
  ) => JQuery.TypeEventHandler<
    HTMLElement,
    undefined,
    HTMLElement,
    HTMLElement,
    "custom"
  > = (event: Wcj.WcjEvent) =>
    function (_, updateCalendar = true) {
      const checkmarkStyle = $(this).next(".checkmark")?.get(0)?.style;
      if (!checkmarkStyle) {
        throw "checkmarkStyle undefined";
      }
      if ((this as HTMLInputElement).checked) {
        select(event.id);

        checkmarkStyle.backgroundColor = event.bgColor;
      } else {
        deselect(event.id);
        checkmarkStyle.backgroundColor = null;
      }
      if (updateCalendar) {
        calendar.setEvents(selectedEvents);
      }
    };

  $(".courseList-container").append(
    `<div class="courseList-actions">
                    <button id="selectAllCourses">Select all</button>
                    <button id="deselectAllCourses">Deselect all</button>
                </div>
                <ul id="courseList"></ul>
            `
  );

  // Create all checkboxes out of the unique events
  for (const event of Object.values(allEvents)) {
    const checkboxEl = $(
      `<input type="checkbox" class="courseCheckbox" id="course-${event.id}">`
    ).on("custom", courseSelectionChange(event));

    const labelEl = $(
      `<label for="course-${event.id}" class="courseCheckboxLabel">${event.title}</label>`
    );
    labelEl.append(
      checkboxEl,
      `<span class="checkmark" style="border-color: ${event.bgColor}"></span>`
    );
    const li = $(`<li></li>`)
      .append(labelEl)
      .on("click", () => {
        checkboxEl.trigger("custom", [true]);
      });

    const infoButton = $('<div class="info-button">🛈</div>').on("click", () => {
        debugger;
      (
        $('<div class="modal"></div>')
          .append(`<h2>${event.title}</h2>`)
          .append(event.description)
          .append(`<div><strong>Where:</strong> ${event.place}</div>`)
          .append(`<div><strong>Registration:</strong> <a href="${event.registrationUrl}"> link</a></div>`)
          .appendTo("body") as any
      ).modal({});
      return false;
    });
    $("#courseList").append(li.prepend(infoButton));
  }

  // Setup events for "select all" button
  $("#selectAllCourses").on("click", () => {
    $(".courseCheckbox").prop("checked", true).trigger("custom", [false]);
    calendar.setEvents(selectedEvents);
  });
  // Setup events for "deselect all" button
  $("#deselectAllCourses").on("click", () => {
    $(".courseCheckbox").prop("checked", false).trigger("custom", [false]);
    calendar.setEvents(selectedEvents);
  });

  // Select all at init
  $("#selectAllCourses").trigger("click");

  return {
    getSelected: () => selectedEvents,
    select,
    deselect,
  };
};

export default initEventList;
