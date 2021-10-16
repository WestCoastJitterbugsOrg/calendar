import { WcjEventListCreator } from "./types";
import "jquery";
import "jquery-modal";
import { messageNewSize } from "../..";
import { Calendar as FullCalendar } from "@fullcalendar/core";
import { wcj2fcEvent } from "../fullercalendar/helpers";

export const getAllEventsFromGroups = (
  groups: Wcj.WcjEventCategory[]
): Wcj.WcjEvent[] => {
  const events: Wcj.WcjEvent[] = [];
  for (const group of groups) {
    events.push(...group.events);
  }
  return events;
};

const initEventList: WcjEventListCreator = (
  eventGroups: Wcj.WcjEventCategory[],
  calendar: FullCalendar
) => {
  const courseSelectionChange: (
    e: Wcj.WcjEvent
  ) => JQuery.TypeEventHandler<
    HTMLElement,
    undefined,
    HTMLElement,
    HTMLElement,
    "selectionChange"
  > = (event: Wcj.WcjEvent) =>
    function () {
      const checkmark = $(this).next(".checkmark")?.get(0);
      const checkmarkStyle = checkmark?.style;
      if (!checkmarkStyle) {
        throw "checkmarkStyle undefined";
      }

      if ((this as HTMLInputElement).checked) {
        checkmark.classList.add("checked");
        checkmarkStyle.backgroundColor = event.color;
      } else {
        checkmark.classList.remove("checked");
        checkmarkStyle.backgroundColor = null;
      }
    };

  const allEvents = getAllEventsFromGroups(eventGroups)

  $(".courseList-container")
    .removeClass("loading")
    .append(
      $(`<div class="courseList-actions"></div>`)
        .append(
          $(`<button id="selectAllCourses">Select all</button>`).on(
            "click",
            function() {
              $(".courseCheckbox").prop("checked", true).trigger("selectionChange");
              const existingSources = calendar.getEventSources().map(x => x.id);
              const nonExistingSources = allEvents.filter(event => !existingSources.some(x => x === event.id));
              calendar.pauseRendering();
              for (const fcEvent of nonExistingSources) {
                calendar.addEventSource(wcj2fcEvent(fcEvent));
              }
              calendar.resumeRendering();
            }
          )
        )
        .append(
          $(`<button id="deselectAllCourses">Deselect all</button>`).on(
            "click",
            () => {
              $(".courseCheckbox").prop("checked", false).trigger("selectionChange");
              calendar.removeAllEventSources();
            }
          )
        )
    )
    .append(`<ul id="courseList"></ul>`);

  // Create all checkboxes out of the unique events
  for (const group of eventGroups) {
    const groupEl = $(
      `<div class="accordion active">
        <svg xmlns="http://www.w3.org/2000/svg" class="accordion-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="square" stroke-width="4" d="M12 4v16m8-8H4" />
        </svg>
        <span class="accordion-name">${group.category}</span>
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
      )
        .on("selectionChange", courseSelectionChange(event))
        .on("click", function (t) {
          courseSelectionChange(event).apply(this, t);
          if (calendar.getEventSourceById(event.id)) {
            calendar.getEventSourceById(event.id).remove();
          } else {
            calendar.addEventSource(wcj2fcEvent(event));
          }
        });
      const labelEl = $(
        `<label for="course-${event.id}" class="courseCheckboxLabel"><span class="courseCheckboxLabelText">${event.title}</span></label>`
      ).append(checkboxEl)
      .append(`<span class="checkmark"></span>`);
      const eventEl = $(`<div class="event"></event>`)
        .append(labelEl);

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
  // Select all at init
  $("#selectAllCourses").trigger("click");
};

export default initEventList;
