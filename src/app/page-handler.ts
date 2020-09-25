import { MyEvent } from "./types.d";
import FCSetupFactory from './fullcalendar-setup';
import '../style/main.scss';

const fcHandler = FCSetupFactory();
let uniqueEvents: MyEvent[] = [];
let selectedEvents: MyEvent[] = [];


/**
 * Sets up the view and event listeners. Basically the main logic of the whole page/plugin.
 * @param gcEvents Array of all events that exist
 */
export default function pageHandler(gcEvents: MyEvent[]): void {

    fcHandler.setup($('#calendar').get(0));
    // Courses that have the same summary (name) are the same courses on different time slots. 
    // Let's find the unique ones by filtering by summary
    // (Yes, there are more efficient ways to do this, deal with it! 😎)
    uniqueEvents = [];
    for (const el of gcEvents) {
        if (!uniqueEvents.find(e => e.summary === el.summary)) {
            el.id = el.summary.replace(/[^A-Za-z0-9-_]/g, ''); // Create id valid for HTML
            uniqueEvents.push(el);
        }
    }

    // Create all checkboxes out of the unique events
    for (const el of uniqueEvents) {
        const checkboxEl = $(`<input type="checkbox" class="courseCheckbox" id="course-${el.id}">`)
            .on("change", function () {
                const liElement = this.parentElement.parentElement;
                if ((this as HTMLInputElement).checked) {
                    // Checkbox has been set to "checked", so we add it to selectedEvents
                    const foundEvents = gcEvents.filter(x => x.summary === el.summary)
                    selectedEvents.push(...foundEvents.map(x => x));
                    liElement.style.borderLeftColor = el.bgColor;
                } else {
                    // Checkbox has been set to "unchecked", so we remove it from selectedEvents
                    selectedEvents = selectedEvents.filter(x => x.summary !== el.summary);
                    liElement.style.borderLeftColor = null;
                }
                fcHandler.setEvents(selectedEvents);
            });
        const labelEl = $(`<label for="course-${el.id}" class="courseCheckboxLabel">${el.summary}</label>`);
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
        selectedEvents = [...gcEvents];
        fcHandler.setEvents(selectedEvents);
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
        fcHandler.setEvents(selectedEvents);
    });
}