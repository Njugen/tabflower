import React from "react";
import View from "./view";

import ExtensionSettingsModule from "./../modules/extensionSettings";
import * as ExceptionsHandler from "../utils/exceptionsAndHandler";
import * as validator from "../utils/inputValidators";

class SettingsView extends View {
  handleRaisedData = (data) => {
    try {
      const { isString } = validator;

      if (isString(data)) {
        if (data === "refresh") {
          let refreshFactor = this.state.refreshFactor;
          refreshFactor++;

          this.setState({ refreshFactor }, () => {});
        } else {
          throw ExceptionsHandler.ValidatorError("settings-view-102");
        }
      } else {
        throw ExceptionsHandler.ValidatorError("settings-view-101");
      }
    } catch (err) {
      ExceptionsHandler.ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  render = () => {
    return (
      <ExtensionSettingsModule
        title="Settings"
        onRaiseToView={(data) => this.handleRaisedData(data)}
        id="settings-module"
        onRaiseToModal={(data) => this.raiseToModal(data)}
        onRaiseToErrorOverlay={(data) => this.sendToErrorOverlay(data)}
      ></ExtensionSettingsModule>
    );
  };
}

export default SettingsView;
