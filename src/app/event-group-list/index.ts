import {Factory} from '~app/types';
import {WcjEvent} from '../event/types';
import {WcjEventListCreator} from './types';

const makeWcjEventListCreator: Factory<WcjEventListCreator, "initFullerCalendar" | "$"> =
    (deps) => {
        const $ = deps.$;
        return allEvents => {
            const calendar = deps.initFullerCalendar($("#calendar").get(0));
            let selectedEvents: WcjEvent[] = [];
            const select = (id: string) => {
                const foundEvent = allEvents[id];
                foundEvent.showInCalendar = true;
                selectedEvents.push(foundEvent);
                calendar.setEvents(selectedEvents);
                return foundEvent;
            }
            const deselect = (id: string) => {
                const foundEvent = allEvents[id];
                foundEvent.showInCalendar = false;
                selectedEvents = selectedEvents.filter(x => x.id !== id);
                calendar.setEvents(selectedEvents);
                return foundEvent;
            }

            const courseSelectionChange = event => function () {
                const liStyle = this.closest("li").style;
                if ((this as HTMLInputElement).checked) {
                    select(event.id);
                    liStyle.borderLeftColor = event.bgColor;
                } else {
                    deselect(event.id);
                    liStyle.borderLeftColor = null;
                }
            }

            // Create all checkboxes out of the unique events
            for (const event of Object.values(allEvents)) {
                const checkboxEl = $(
                    `<input type="checkbox" class="courseCheckbox" id="course-${event.id}">`
                ).on("change", courseSelectionChange);
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
            return {
                getSelected: () => selectedEvents,
                select,
                deselect
            }
        }
    }

export {makeWcjEventListCreator}