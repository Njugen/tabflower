import React from "react";

import View from "./view";

import CalendarModule from "../modules/calendarModule/main";
import Moduleon from "../utils/moduleon/moduleon";
import ModuleColumn from "../utils/moduleon/moduleColumn";
import { ReactDOM } from "react-dom";
import PropTypes from "prop-types";

class CalendarView extends View {
  state = {
    viewData: {
      title: "Calendar",
    },
    currentDate: {
      date: "",
      month: "",
      year: "",
    },
  };

  setCurrentDate = (date, month, year) => {
    // If any parameter is missing, use the month of today
    if (!date || !month || !year) {
      const tempDate = new Date();

      date = tempDate.getDate().toString();
      month = (tempDate.getMonth() + 1).toString();
      year = tempDate.getFullYear().toString();
    }

    const currentDate = {
      date: date,
      month: month,
      year: year,
    };
    this.setState({ currentDate });
  };

  childComponentDidMount = () => {
    let { date, month, year } = this.props.match.params;

    this.setCurrentDate(date, parseInt(month), year);
  };

  render = () => {
    return (
      <div className="row d-flex justify-content-center">
        <div className="col-8">
          <Moduleon>
            <ModuleColumn colspan="12">
              <CalendarModule
                id="tabscheduler"
                urlPath={this.props.match.path}
                currentDate={this.state.currentDate}
                onRaiseToModal={(data) => this.raiseToModal(data)}
                onRaiseToErrorOverlay={(data) => this.sendToErrorOverlay(data)}
              ></CalendarModule>
            </ModuleColumn>
          </Moduleon>
        </div>
      </div>
    );
  };
}

CalendarView.PropTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }),
};

export default CalendarView;
