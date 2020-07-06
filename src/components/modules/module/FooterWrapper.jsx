import React, { Component } from "react";
import * as ExceptionsHandler from "../../utils/exceptionsAndHandler";
import * as validator from "../../utils/inputValidators";
import PropTypes from "prop-types";
import AppContext from "../../contexts/AppContextProvider";
import { ValidatorError, ErrorHandler } from "../../utils/exceptionsAndHandler";

import { sendToBackground } from "../../../services/webextension/APIBridge";

require("../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css");

export default class FooterWrapper extends Component {
  render() {
    const { containerProperties, Contents } = this.props;
    const { minimized } = containerProperties;
    const footerWrapperInitialClassName = "row tabeon-module-footer";

    return (
      <div
        className={
          minimized === true
            ? footerWrapperInitialClassName + " tabeon-hidden"
            : footerWrapperInitialClassName + " tabeon-inline-block"
        }
      >
        <div className="col-12">{Contents()}</div>
      </div>
    );
  }
}
