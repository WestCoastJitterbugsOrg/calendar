import { WcjEventListCreator } from './types';

const initEventList: WcjEventListCreator =
    (allEvents, calendar) => {
        let selectedEvents: Wcj.WcjEvent[] = [];
        const select = (id: string) => {
            const foundEvent = allEvents[id];
            foundEvent.showInCalendar = true;
            selectedEvents.push(foundEvent);
            return foundEvent;
        }
        const deselect = (id: string) => {
            const foundEvent = allEvents[id];
            foundEvent.showInCalendar = false;
            selectedEvents = selectedEvents.filter(x => x.id !== id);
            return foundEvent;
        }

        const courseSelectionChange: (e: Wcj.WcjEvent) => JQuery.TypeEventHandler<HTMLElement, undefined, HTMLElement, HTMLElement, "custom">
            = (event: Wcj.WcjEvent) => function (_, updateCalendar = true) {
                const liStyle = this.closest("li")?.style;
                if (!liStyle) {
                    throw "liStyle undefined";
                }
                if ((this as HTMLInputElement).checked) {
                    select(event.id);
                    liStyle.borderLeftColor = event.bgColor;
                } else {
                    deselect(event.id);
                    liStyle.borderLeftColor = null;
                }
                if (updateCalendar) {
                    calendar.setEvents(selectedEvents);
                }
            }


        $('.courseList-container').append(
            `<div class="courseList-actions">
                    <button id="selectAllCourses">Select all</button>
                    <button id="deselectAllCourses">Deselect all</button>
                </div>
                <ul id="courseList"></ul>
            `);

        // Create all checkboxes out of the unique events
        for (const event of Object.values(allEvents)) {
            const checkboxEl = $(
                `<input type="checkbox" class="courseCheckbox" id="course-${event.id}">`
            ).on("custom", courseSelectionChange(event));
            const labelEl = $(
                `<label for="course-${event.id}" class="courseCheckboxLabel">${event.title}</label>`
            );
            labelEl.append(checkboxEl);
            const li = $(`<li></li>`).append(labelEl).on("click", () => {
                checkboxEl.trigger("custom", [true]);
            });
            $("#courseList").append(li);
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
        return {
            getSelected: () => selectedEvents,
            select,
            deselect
        }
    }


export default initEventList;