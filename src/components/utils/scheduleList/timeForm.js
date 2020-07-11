import React, { Component, createRef } from "react";
import TBCheckBox from "./../form/tbCheckbox";
import TBDropdown from "./../form/tbDropdown";
import TBTextInput from "./../form/tbTextInput";
import * as validator from "../../utils/inputValidators";
import * as timeUtils from "./utils";

export default class TimeForm extends Component {
  createDefaultFormValues = () => {
    const defaultFormValues = {
      scheduleId: Math.random().toString(36).slice(2),
      currentDayDropDownValue: "Select a Day",
      currentTimeInputValues: {
        hour: "",
        minute: "",
      },
      currentRegularLaunchValue: false,
      launchAtTimestamp: 0,
    };

    return defaultFormValues;
  };

  state = {
    data: this.createDefaultFormValues(),
    errors: {},
    refreshFactor: 0,
  };

  forceDoubleDigits = (number) => {
    const { isString } = validator;
    number = isString(number) ? parseInt(number) : number;

    return (
      (number < 10 && JSON.stringify(number).length === 1 ? "0" : "") + number
    );
  };

  handleChangeWeekDay = (value) => {
    const data = this.state.data;
    data["currentDayDropDownValue"] = value.toLowerCase();

    this.setState({ data });
  };

  handleChangeHour = (value) => {
    const data = this.state.data;
    data["currentTimeInputValues"]["hour"] = value;

    this.setState({ data });
  };

  handleChangeMinute = (value) => {
    const data = this.state.data;
    data["currentTimeInputValues"]["minute"] = value;

    this.setState({ data });
  };

  handleChangeRegularLaunch = (value) => {
    const data = this.state.data;
    data["currentRegularLaunchValue"] = value;

    this.setState({ data });
  };

  buildAutomaticLaunchTimestamp = (selectedDay, hour, minute) => {
    const {
      getTodayObj,
      getUpcomingDayObj,
      determineDayDifference,
      determineFutureDate,
      convertTimeToMS,
    } = timeUtils;

    const today = getTodayObj().order;
    const upcomingDay = getUpcomingDayObj(selectedDay).order;

    // The number of days from today to the selected upcoming day.
    const diff = determineDayDifference(today, upcomingDay);

    const launchDateAsMS = determineFutureDate(diff).startOfDateTimeInMS;
    const clockTimeAsMS = convertTimeToMS(hour, minute);

    const launchTimeAsMS = launchDateAsMS + clockTimeAsMS;

    return launchTimeAsMS;
  };

  handlePrimaryButtonClick = (data) => {
    const { onAdd } = this.props;

    this.validateForm((errors) => {
      this.setState({ errors }, () => {
        if (Object.keys(errors).length === 0) {
          const { hour, minute } = data.currentTimeInputValues;
          const selectedDay = data.currentDayDropDownValue;
          /*
          data.launchAtTimestamp = this.buildAutomaticLaunchTimestamp(
            selectedDay,
            hour,
            minute
          ); */

          data.launchAtTimestamp = Date.now() + 60 * 1000;

          data.currentTimeInputValues = {
            hour: this.forceDoubleDigits(hour),
            minute: this.forceDoubleDigits(minute),
          };

          onAdd(data);
          this.setState({
            data: this.createDefaultFormValues(),
            refreshFactor: this.state.refreshFactor + 1,
          });
        }
      });
    });
  };

  validateForm = (callback) => {
    const { currentDayDropDownValue, currentTimeInputValues } = this.state.data;
    const { isString, isNumber } = validator;
    const { weekdays } = this.props;

    let hourValue = parseInt(currentTimeInputValues["hour"]);
    let minuteValue = parseInt(currentTimeInputValues["minute"]);
    const errors = {};

    const weekdaySelected = weekdays.filter(
      (day) => day.toLowerCase() === currentDayDropDownValue
    );

    if (!isString(currentDayDropDownValue) || weekdaySelected.length === 0) {
      errors["weekdayfield"] = "A value offered by the list was not selected";
    }

    if (
      !isNumber(hourValue) ||
      (isNumber(hourValue) && !this.isInRange(hourValue, 0, 23))
    ) {
      errors["hourfield"] =
        "This field needs to be a number ranging inbetween 0-23";
    }

    if (
      !isNumber(minuteValue) ||
      (isNumber(minuteValue) && !this.isInRange(minuteValue, 0, 59))
    ) {
      errors["minutefield"] =
        "This field needs to be a number ranging inbetween 0-59";
    }

    callback(errors);
  };

  isInRange = (value, start, end) => {
    // Every parameter needs to be an input
    if (isNaN(value) || isNaN(start) || isNaN(end)) return false;

    if (value >= start && value <= end) return true;
  };

  render() {
    const { weekdays, error: formError } = this.props;
    const { errors, refreshFactor } = this.state;
    const {
      currentDayDropDownValue,
      currentTimeInputValues,
      currentRegularLaunchValue,
    } = this.state.data;

    return (
      <>
        {formError && (
          <div class="timeform-error-message">
            <span>{formError}</span>
          </div>
        )}
        <div className="timeform d-flex">
          <TBDropdown
            id="weekdayDropDown"
            label="Set Launch Schedule (Optional)"
            selectables={weekdays}
            warning={errors["weekdayfield"] || null}
            maxWidth={false}
            value={currentDayDropDownValue}
            onChange={(id, value) => this.handleChangeWeekDay(value)}
            clear={refreshFactor}
          />
          <TBTextInput
            id="hourInput"
            warning={errors["hourfield"] || null}
            label="Hour"
            maxWidth={false}
            maxlength="2"
            value={currentTimeInputValues.hour}
            onChange={(id, value) => this.handleChangeHour(value)}
            clear={refreshFactor}
          />
          <TBTextInput
            id="minuteInput"
            warning={errors["minutefield"] || null}
            label="Minute"
            maxWidth={false}
            maxlength="2"
            value={currentTimeInputValues.minute}
            onChange={(id, value) => this.handleChangeMinute(value)}
            clear={refreshFactor}
          />
          {this.state.data.currentDayDropDownValue !== "every day" && (
            <TBCheckBox
              id="regularLaunchcheckbox"
              warning={"" || null}
              label="Launch every week"
              value={currentRegularLaunchValue}
              maxWidth={false}
              onToggle={(id, value) => this.handleChangeRegularLaunch(value)}
              clear={refreshFactor}
            />
          )}
          <div className="timeform-button-container">
            <button
              className="btn btn-tabeon"
              onClick={() => this.handlePrimaryButtonClick(this.state.data)}
            >
              Add
            </button>
          </div>
        </div>
      </>
    );
  }
}
