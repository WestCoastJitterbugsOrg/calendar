import defaultJQuery from "jquery";
import { WcjEvent } from "../event/types";
import FullerCalendarFactory from '../fullercalendar';
import { setEvents } from "../fullercalendar/helpers";
import { getUniqueEvents } from "./helpers";
import { PageHandlerCreator } from "./types";

/**
 * Sets up the view and event listeners. Basically the main logic of the whole page/plugin.
 * @param gcEvents Array of all events that exist
 */
export default function PageHandlerFactory($: JQueryStatic = defaultJQuery, fcHandlerFactory = FullerCalendarFactory()): PageHandlerCreator {

    return {
        createPageHandler: (events: WcjEvent[]) => {
            const calendar = fcHandlerFactory.createCalendar($('#calendar').get(0));
            const uniqueEvents = getUniqueEvents(events)
            let selectedEvents: WcjEvent[] = [];

            // Create all checkboxes out of the unique events
            for (const el of uniqueEvents) {
                const checkboxEl = $(`<input type="checkbox" class="courseCheckbox" id="course-${el.id}">`)
                    .on("change", function () {
                        const liElement = this.parentElement.parentElement;
                        if ((this as HTMLInputElement).checked) {
                            // Checkbox has been set to "checked", so we add it to selectedEvents
                            const foundEvents = events.filter(x => x.title === el.title)
                            selectedEvents.push(...foundEvents.map(x => x));
                            liElement.style.borderLeftColor = el.bgColor;
                        } else {
                            // Checkbox has been set to "unchecked", so we remove it from selectedEvents
                            selectedEvents = selectedEvents.filter(x => x.title !== el.title);
                            liElement.style.borderLeftColor = null;
                        }
                        setEvents(calendar, selectedEvents);
                    });
                const labelEl = $(`<label for="course-${el.id}" class="courseCheckboxLabel">${el.title}</label>`);
                labelEl.append(checkboxEl);
                const li = $(`<li></li>`).append(labelEl);
                $("#courseList").append(li);
            }

            // Setup events for "select all" button
            $("#selectAllCourses").on("click", () => {
                $(".courseCheckbox").prop("checked", true);
                for (const event of uniqueEvents) {
                    const liEl = $(`#course-${event.id}`)[0]?.parentElement.parentElement;
                    if (liEl) {
                        liEl.style.borderLeftColor = event.bgColor;
                    }
                }
                selectedEvents = [...events];
                setEvents(calendar, selectedEvents);
            });
            // Setup events for "deselect all" button
            $("#deselectAllCourses").on("click", () => {
                $(".courseCheckbox").prop("checked", false);
                for (const event of uniqueEvents) {
                    const liEl = $(`#course-${event.id}`)[0]?.parentElement.parentElement;
                    if (liEl) {
                        liEl.style.borderLeftColor = null;
                    }
                }

                selectedEvents = [];
                setEvents(calendar, selectedEvents);
            });
        }
    }
}