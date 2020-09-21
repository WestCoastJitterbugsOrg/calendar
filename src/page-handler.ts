import { MyEvent } from "./types";
import FCSetupFactory from './fullcalendar-setup';

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
                const label = $(this.parentElement).children("label")[0];
                if ((this as HTMLInputElement).checked) {
                    // Checkbox has been set to "checked", so we add it to selectedEvents
                    const foundEvents = gcEvents.filter(x => x.summary === el.summary)
                    selectedEvents.push(...foundEvents.map(x => x));
                    label.style.backgroundColor = el.bgColor;
                    label.style.color = el.textColor;
                } else {
                    // Checkbox has been set to "unchecked", so we remove it from selectedEvents
                    selectedEvents = selectedEvents.filter(x => x.summary !== el.summary);
                    label.style.backgroundColor = "inherit";
                    label.style.color = "inherit";
                }
                fcHandler.setEvents(selectedEvents);
            });
        const liContent = checkboxEl.add(`<label for="course-${el.id}" class="courseCheckboxLabel">${el.summary}</label>`);
        const li = $(`<li></li>`).append(liContent);
        $("#courseList").append(li);
    }

    // Setup events for "select all" button
    $("#selectAllCourses").on("click", () => {
        $(".courseCheckbox").prop("checked", true);
        for (const event of uniqueEvents) {
            const liEl = $(`#course-${event.id}`)[0]?.parentElement;
            const labelEl = liEl && $(liEl).children("label")[0];
            if (!labelEl) { continue; }
            labelEl.style.backgroundColor = event.bgColor;
            labelEl.style.color = event.textColor;
        }
        selectedEvents = [...gcEvents];
        fcHandler.setEvents(selectedEvents);
    });
    // Setup events for "deselect all" button
    $("#deselectAllCourses").on("click", () => {
        $(".courseCheckbox").prop("checked", false);
        for (const event of uniqueEvents) {
            const liEl = $(`#course-${event.id}`)[0]?.parentElement;
            const labelEl = liEl && $(liEl).children("label")[0];
            if (!labelEl) { continue; }
            labelEl.style.backgroundColor = "inherit";
            labelEl.style.color = "inherit";
        }

        selectedEvents = [];
        fcHandler.setEvents(selectedEvents);
    });
}