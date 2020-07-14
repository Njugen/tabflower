import React from "react";
import View from "./view";

import ExtensionSettingsModule from "./../modules/extensionSettings";
import * as ExceptionsHandler from "../utils/exceptionsAndHandler";
import * as validator from "../utils/inputValidators";

class SettingsView extends View {
  handleRaiseToView = (data) => {
    try {
      const { isString } = validator;

      if (!isString(data))
        throw ExceptionsHandler.ValidatorError("settings-view-101");

      if (data !== "refresh")
        throw ExceptionsHandler.ValidatorError("settings-view-102");

      if (data === "refresh") this.refreshView();
    } catch (err) {
      ExceptionsHandler.ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  render = () => {
    return (
      <ExtensionSettingsModule
        title="Settings"
        onRaiseToView={(data) => this.handleRaiseToView(data)}
        id="settings-module"
      ></ExtensionSettingsModule>
    );
  };
}

export default SettingsView;
