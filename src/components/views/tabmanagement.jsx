import React, { Fragment } from "react";
import View from "./view";

import Moduleon from "../utils/moduleon/moduleon";
import ModuleColumn from "../utils/moduleon/moduleColumn";
import CurrentlyOpenedTabsModule from "../modules/currentlyOpenedTabs";
import ExistingTabGroupsModule from "../modules/existingTabGroups";
import * as ExceptionsHandler from "../utils/exceptionsAndHandler";
import * as validator from "../utils/inputValidators";
import AppContext from "../contexts/AppContextProvider";

require("../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css");

class TabManagementView extends View {
  static contextType = AppContext;

  handleRaisedData = (data) => {
    try {
      const { isString } = validator;

      if (isString(data)) {
        if (data === "refresh") {
          let refreshFactor = this.state.refreshFactor;
          refreshFactor++;

          this.setState({ refreshFactor }, () => {});
        } else {
          throw ExceptionsHandler.ValidatorError("tabManagement-view-102");
        }
      } else {
        throw ExceptionsHandler.ValidatorError("tabManagement-view-101");
      }
    } catch (err) {
      ExceptionsHandler.ErrorHandler(err, this.raiseToErrorOverlay);
    }
  };

  componentDidMount = () => {
    console.log("FFF", this.context);
  };

  render = () => {
    console.log(this.context);
    return (
      <Fragment>
        <div className="row d-flex justify-content-center">
          <div className="col-6">
            <Moduleon>
              <ModuleColumn colspan="12">
                <CurrentlyOpenedTabsModule
                  onRaiseToView={(data) => this.handleRaisedData(data)}
                  id="active-tabs-module"
                  onRaiseToModal={(data) => this.raiseToModal(data)}
                  onRaiseToErrorOverlay={(data) =>
                    this.raiseToErrorOverlay(data)
                  }
                ></CurrentlyOpenedTabsModule>
                <ExistingTabGroupsModule
                  id="existing-tab-groups-module"
                  refresh={this.state.refreshFactor}
                  onRaiseToView={(data) => this.handleRaisedData(data)}
                  onRaiseToModal={(data) => this.raiseToModal(data)}
                  onRaiseToErrorOverlay={(data) =>
                    this.raiseToErrorOverlay(data)
                  }
                ></ExistingTabGroupsModule>
              </ModuleColumn>
            </Moduleon>
          </div>
        </div>
      </Fragment>
    );
  };
}

export default TabManagementView;
