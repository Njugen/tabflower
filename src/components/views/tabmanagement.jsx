import React, { Fragment } from "react";
import View from "./view";

import CurrentlyOpenedTabsModule from "../modules/currentlyOpenedTabs";
import ExistingTabGroupsModule from "../modules/existingTabGroups";
import * as ExceptionsHandler from "../utils/exceptionsAndHandler";
import * as validator from "../utils/inputValidators";

require("../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css");

class TabManagementView extends View {
  handleRaiseToView = (data) => {
    try {
      const { isString } = validator;

      if (!isString(data))
        throw ExceptionsHandler.ValidatorError("tabManagement-view-101");

      if (data !== "refresh")
        throw ExceptionsHandler.ValidatorError("tabManagement-view-102");

      if (data === "refresh") this.refreshView();
    } catch (err) {
      ExceptionsHandler.ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  render = () => {
    return (
      <Fragment>
        <div className="row d-flex justify-content-center">
          <div className="col-6">
            <CurrentlyOpenedTabsModule
              title="Currently Opened Tabs"
              onRaiseToView={(data) => this.handleRaiseToView(data)}
              id="active-tabs-module"
            ></CurrentlyOpenedTabsModule>
            <ExistingTabGroupsModule
              title="Existing Tab Groups"
              id="existing-tab-groups-module"
              refresh={this.state.refreshFactor}
              onRaiseToView={(data) => this.handleRaiseToView(data)}
            ></ExistingTabGroupsModule>
          </div>
        </div>
      </Fragment>
    );
  };
}

export default TabManagementView;
