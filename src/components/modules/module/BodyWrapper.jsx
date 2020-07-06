import React, { Component } from "react";
import * as ExceptionsHandler from "../../utils/exceptionsAndHandler";
import * as validator from "../../utils/inputValidators";
import PropTypes from "prop-types";
import AppContext from "../../contexts/AppContextProvider";
import { ValidatorError, ErrorHandler } from "../../utils/exceptionsAndHandler";

import { sendToBackground } from "../../../services/webextension/APIBridge";

require("../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css");

export default class BodyWrapper extends Component {
  render() {
    const { containerProperties, Contents } = this.props;
    const { minimized } = containerProperties;
    const bodyWrapperInitialClassName = "row tabeon-module-body";

    return (
      <div
        className={
          minimized === true
            ? bodyWrapperInitialClassName + " tabeon-hidden"
            : bodyWrapperInitialClassName + " tabeon-inline-block"
        }
      >
        <div className="col-12">{Contents()}</div>
      </div>
    );
  }
}
