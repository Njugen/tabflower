import React from "react";
import View from "./view";
import AboutTabflowerModule from "./../modules/aboutTabflower";

import * as validator from "./../utils/inputValidators";
import * as ExceptionsHandler from "../utils/exceptionsAndHandler";

class AboutTabFlowerView extends View {
  handleRaiseToView = (data) => {
    try {
      const { isString } = validator;

      if (!isString(data))
        throw ExceptionsHandler.ValidatorError("aboutTabflower-view-101");

      if (data !== "refresh")
        throw ExceptionsHandler.ValidatorError("aboutTabflower-view-102");

      if (data === "refresh") this.refreshView();
    } catch (err) {
      ExceptionsHandler.ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  render = () => {
    return (
      <AboutTabflowerModule
        title="About Tabflower"
        onRaiseToView={(data) => this.handleRaiseToView(data)}
        id="about-tabflower-module"
        onRaiseToModal={(data) => this.raiseToModal(data)}
        onRaiseToErrorOverlay={(data) => this.sendToErrorOverlay(data)}
      ></AboutTabflowerModule>
    );
  };
}

export default AboutTabFlowerView;
