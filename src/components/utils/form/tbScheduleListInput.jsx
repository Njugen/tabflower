import React, { Component } from "react";
import TBDropdown from "./tbDropdown";
import TBTextInput from "./tbTextInput";
import TBCheckBox from "./tbCheckbox";
import TimeForm from "../scheduleList/timeForm";
import { isFunction } from "../inputValidators";

export default class TBScheduleListInput extends Component {
  state = { scheduleCollection: [], error: "" };

  handleTimeFormOutput = (schedule) => {
    const { scheduleCollection } = this.state;
    const { id, onModifyList } = this.props;
    let error = "";
    console.log("LOSANGELES", schedule, scheduleCollection);

    const stringifiedTemp = JSON.stringify(scheduleCollection);

    let currentData = JSON.parse(stringifiedTemp);
    console.log("CURRENTDATA", currentData);
    const exists = this.checkForExistingSchedule(schedule, currentData);
    console.log("VEGA", schedule, currentData);
    if (exists === false) {
      console.log("IS RUNNING");
      currentData.push(schedule);

      this.saveSchedulesToState(currentData, () => {
        onModifyList(id, currentData, "tabGroupDetails");
      });
    } else {
      error = "The schedule you attempted to add does already exist.";
    }
    console.log("ERR", error, exists);
    this.setState({ error });
  };

  checkForExistingSchedule = (schedule, collection) => {
    // Return true, if the schedule already exists in the collection
    console.log("SCHCHECK", schedule, collection);

    const result = collection.filter(
      (item) =>
        item.currentDayDropDownValue === schedule.currentDayDropDownValue &&
        item.currentTimeInputValues.hour ===
          schedule.currentTimeInputValues.hour &&
        item.currentTimeInputValues.minute ===
          schedule.currentTimeInputValues.minute &&
        item.currentRegularLaunchValue === schedule.currentRegularLaunchValue
    );
    console.log("RES", result);
    if (result.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    /* if (this.props !== prevProps) {
      const { scheduleCollection } = this.props;
      this.saveSchedulesToState(scheduleCollection);
    } */
  };

  componentDidMount = () => {
    const { scheduleCollection } = this.props;
    console.log("VOIDA", this.props);
    this.saveSchedulesToState(scheduleCollection);
  };

  saveSchedulesToState = (collection, callback) => {
    this.setState({ scheduleCollection: collection }, () => {
      if (isFunction(callback)) {
        callback();
      }
    });
  };

  removeScheduleItem = (id) => {
    const { scheduleCollection } = this.state;

    const tempScheduleCollection = JSON.stringify(scheduleCollection);
    const parsedScheduleCollection = JSON.parse(tempScheduleCollection);

    const updatedCollection = parsedScheduleCollection.filter(
      (item) => item.scheduleId !== id
    );

    this.saveSchedulesToState(updatedCollection, () => {
      const { id: scheduleListInputId, onModifyList } = this.props;

      onModifyList(
        scheduleListInputId,
        this.state.scheduleCollection,
        "tabGroupDetails"
      );
    });
  };

  render() {
    const { weekdays } = this.props;
    const { scheduleCollection, error } = this.state;
    console.log("SCHEDULE", scheduleCollection);
    return (
      <>
        <div className="col-md-12 schedule-list-container">
          <div className="row">
            {scheduleCollection.length > 0 ? (
              <ul className="schedule-list">
                {scheduleCollection.map((schedule, index) => {
                  console.log("SCHEDULE ITEM", schedule);
                  return (
                    <li
                      className="schedule-list-item"
                      key={"schedule-" + index}
                    >
                      <div className="left-sector sector">
                        <span className="schedule-list-item-day">
                          {schedule.currentDayDropDownValue}
                        </span>
                      </div>
                      <div className="right-sector">
                        <span className="schedule-list-item-time">
                          <strong>Time:</strong>{" "}
                          {schedule.currentTimeInputValues["hour"]}:
                          {schedule.currentTimeInputValues["minute"]}
                        </span>
                        <span className="schedule-list-item-onrepeat">
                          <strong>Weekly:</strong>{" "}
                          {schedule.currentRegularLaunchValue === true
                            ? "Yes"
                            : "No"}
                        </span>
                        <button
                          className="fas fa-times btn"
                          onClick={() =>
                            this.removeScheduleItem(schedule.scheduleId)
                          }
                        ></button>
                      </div>
                      <div className="clearfix"></div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="no-schedule">
                <span className="small">
                  This tab group is not scheduled to launch automatically.
                </span>
              </div>
            )}
          </div>
        </div>

        <TimeForm
          error={error}
          weekdays={weekdays}
          onAdd={(data) => this.handleTimeFormOutput(data)}
        />
        <div>
          <button className="btn-tabeon-as-only-child btn">
            Manage Schedule
          </button>
        </div>
      </>
    );
  }
}
