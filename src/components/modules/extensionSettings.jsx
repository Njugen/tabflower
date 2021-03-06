import React, { Fragment } from "react";
//import { Link } from 'react-router-dom';
import Module from "./module/index";
//import WindowsList from '../utils/windowsList';
//import { sendToBackground } from "../../services/webextension/APIBridge";
import * as validator from "../utils/inputValidators";
//import { ValidatorError, ErrorHandler } from '../utils/exceptionsAndHandler';
import { ValidatorError } from "../utils/exceptionsAndHandler";
require("../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css");

class ExtensionSettingsModule extends Module {
  /*
        Settings
        - moduleTitle: Title of the module (string)
   */
  staticPreset = {
    moduleTitle: "staticPreset",
    moduleId: "tabeon-module-container-id-" + this.props.id,
  };

  verifyChildProps = () => {
    const { isObject, isString } = validator;

    if (isObject(this.staticPreset)) {
      const { moduleTitle } = this.staticPreset;

      if (!isString(moduleTitle)) {
        throw ValidatorError("settings-module-102");
      }
    } else {
      throw ValidatorError("settings-module-102");
    }
  };

  renderBodyContents = () => {
    return (
      <Fragment>
        <div className="active-tabs-module">
          <p>Blablabla</p>
        </div>
      </Fragment>
    );
  };
}

export default ExtensionSettingsModule;
