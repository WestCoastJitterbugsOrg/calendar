import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import React from "react";
import EventContainer from "./event-selection";
import { loadCogworkData } from "./services/cogwork";
import { Wcj } from "./types";
import Button from "./shared/Button";
import './fullcalendar-custom.scss'

interface AppState {
  error: any;
  isLoaded: boolean;
  data: Wcj.EventCategory[];
}

export default class App extends React.Component {
  state: AppState = {
    error: null,
    isLoaded: false,
    data: [],
  };

  async componentDidMount() {
    try {
      const data = await loadCogworkData();
      this.setState({
        isLoaded: true,
        data,
      });
    } catch (error) {
      this.setState({
        isLoaded: true,
        error,
      });
    }
  }

  render() {
    return (
      <div className="flex flex-row">
        <div className="h-screen relative overflow-y-hidden">
          <div className="bg-wcj-black flex flex-row h-20 justify-center items-center">
            <Button title="Select all" className="mx-2"></Button>
            <Button title="Deselect all" className="mx-2"></Button>
          </div>
          <EventContainer eventCategories={this.state.data}></EventContainer>
        </div>
        <div className="flex-grow">
          <FullCalendar
            plugins={[dayGridPlugin, listPlugin, timeGridPlugin]}
            initialView="dayGridMonth"
            height='100vh'
          ></FullCalendar>
        </div>
      </div>
    );
  }
}
