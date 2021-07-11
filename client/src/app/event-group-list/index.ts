import { WcjEventListCreator } from "./types";
import "jquery";
import "jquery-modal";

export const getAllEventsFromGroups = (groups: Wcj.WcjEventCategory[]) => {
  const events: Wcj.WcjEvent[] = [];
  for (const group of groups) {
    events.push(...group.events);
  }
  return events;
};

const initEventList: WcjEventListCreator = (eventGroups, calendar) => {
  let selectedEvents: Wcj.WcjEvent[] = [];
  const select = (id: string) => {
    const allEvents = getAllEventsFromGroups(eventGroups);
    const foundEvent = allEvents.find((event) => event.id === id);
    foundEvent.showInCalendar = true;
    selectedEvents.push(foundEvent);
    return foundEvent;
  };

  const deselect = (id: string) => {
    const allEvents = getAllEventsFromGroups(eventGroups);
    const foundEvent = allEvents.find((event) => event.id === id);
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
  for (const group of eventGroups) {
    const groupEl = $(`<div class="accordion active">${group.category}</div>`).on("click", function() {
      /* Toggle between adding and removing the "active" class,
      to highlight the button that controls the panel */
      
      /* Toggle between hiding and showing the active panel */
      const panel = this.nextElementSibling as HTMLElement;
      if (panel.style.display === "block") {
        panel.style.display = "none";
        this.classList.remove("active");
      } else {
        panel.style.display = "block";
        this.classList.add("active");
      }
    });
    const panelEl = $('<div class="panel" style="display: block"></div>');
    $("#courseList").append(groupEl).append(panelEl);
    for (const event of group.events) {
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
      const eventEl = $(`<div class="event"></event>`)
        .append(labelEl)
        .on("click", () => {
          checkboxEl.trigger("custom", [true]);
        });

      const infoButton = $('<div class="info-button">🛈</div>').on(
        "click",
        () => {
          (
            $('<div class="modal"></div>')
              .append(`<h2 style="margin-top: 0">${event.title}</h2>`)
              .append(event.description.includes('\\<p\\>') ? event.description : `<p>${event.description}</p>`)
              .append(`<div><strong>Where:</strong> ${event.place}</div>`)
              .append(`<div><strong>Price:</strong> ${event.price}</div>`)
              .append(`<div><strong>Instructors:</strong> ${event.instructors}</div>`)
              .append(
                `<div><strong>Registration:</strong> <a href="${event.registrationUrl}"> link</a></div>`
              )
              .appendTo("body") as any
          ).modal({});
          return false;
        }
      );
      panelEl.append(eventEl.prepend(infoButton));
      $("#courseList").append(panelEl);
    }
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
  // $("#selectAllCourses").trigger("click");

  return {
    getSelected: () => selectedEvents,
    select,
    deselect,
  };
};

export default initEventList;
