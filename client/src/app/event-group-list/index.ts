import { WcjEventListCreator } from "./types";
import "jquery";
import "jquery-modal";
import { messageNewSize } from "../..";

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
      const checkmark = $(this).parent().next(".checkmark")?.get(0);
      const checkmarkStyle = checkmark?.style;
      if (!checkmarkStyle) {
        throw "checkmarkStyle undefined";
      }

      if ((this as HTMLInputElement).checked) {
        checkmark.classList.add("checked");
        select(event.id);
        checkmarkStyle.backgroundColor = event.color;
      } else {
        checkmark.classList.remove("checked");
        deselect(event.id);
        checkmarkStyle.backgroundColor = null;
      }
      if (updateCalendar) {
        calendar.setEvents(selectedEvents);
      }
    };

  $(".courseList-container")
    .removeClass("loading")
    .append(
      `<div class="courseList-actions">
                    <button id="selectAllCourses">Select all</button>
                    <button id="deselectAllCourses">Deselect all</button>
                </div>
                <ul id="courseList"></ul>
            `
    );

  // Create all checkboxes out of the unique events
  for (const group of eventGroups) {
    const groupEl = $(
      `<div class="accordion active">
        <span class="accordion-name">${group.category}</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="accordion-icon accordion-close" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" class="accordion-icon accordion-open" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
    </svg>
      </div>`
    ).on("click", function () {
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
      messageNewSize();
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
      labelEl.append(checkboxEl);
      const eventEl = $(`<div class="event"></event>`)
        .append(labelEl)
        .append(
          `<span class="checkmark"></span>`
        )
        .on("click", () => {
          checkboxEl.trigger("custom", [true]);
        });

      const infoButton = $(
        `<svg xmlns="http://www.w3.org/2000/svg" class="info-button" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>`
      ).on("click", () => {
        (
          $('<div class="modal"></div>')
            .append(`<h2 style="margin-top: 0">${event.title}</h2>`)
            .append(
              event.description.includes("\\<p\\>")
                ? event.description
                : `<p>${event.description}</p>`
            )
            .append(`<div><strong>Where:</strong> ${event.place}</div>`)
            .append(`<div><strong>Price:</strong> ${event.price}</div>`)
            .append(
              `<div><strong>Instructors:</strong> ${event.instructors}</div>`
            )
            .append(
              `<div><strong>Registration:</strong> <a href="${event.registrationUrl}" target="_blank"> link</a></div>`
            )
            .appendTo("body") as any
        ).modal({});
        return false;
      });
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
  $("#selectAllCourses").trigger("click");

  return {
    getSelected: () => selectedEvents,
    select,
    deselect,
  };
};

export default initEventList;
