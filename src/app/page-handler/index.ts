import {Factory} from "../types";
import {WcjEvent} from "../event/types";
import {PageHandlerCreator} from "./types";

/**
 * Sets up the view and event listeners. Basically the main logic of the whole page/plugin.
 * @param gcEvents Array of all events that exist
 */
const makeInitPageHandler: Factory<
  PageHandlerCreator,
  "$" | "eventGroupList" | "initFullerCalendar" | "getUniqueEvents"
> = (deps) => (events: WcjEvent[]) => {
  const $ = deps.$;
  const eventGroupList = deps.eventGroupList(events);
  const calendar = deps.initFullerCalendar($("#calendar").get(0));

  const uniqueEvents = deps.getUniqueEvents(events);
  // Create all checkboxes out of the unique events
  for (const event of uniqueEvents) {
    const checkboxEl = $(
      `<input type="checkbox" class="courseCheckbox" id="course-${event.id}">`
    ).on("change", function () {
      const liElement = this.closest("li");
      if ((this as HTMLInputElement).checked) {
        eventGroupList.select(event.title);
        liElement.style.borderLeftColor = event.bgColor;
      } else {
        eventGroupList.deselect(event.title);
        liElement.style.borderLeftColor = null;
      }
      calendar.setEvents(eventGroupList.getSelected());
    });
    const labelEl = $(
      `<label for="course-${event.id}" class="courseCheckboxLabel">${event.title}</label>`
    );
    labelEl.append(checkboxEl);
    const li = $(`<li></li>`).append(labelEl);
    $("#courseList").append(li);
  }

  // Setup events for "select all" button
  $("#selectAllCourses").on("click", () => {
    $(".courseCheckbox").prop("checked", true);
  });
  // Setup events for "deselect all" button
  $("#deselectAllCourses").on("click", () => {
    $(".courseCheckbox").prop("checked", false);
  });

  calendar.render();
};

export default makeInitPageHandler;
