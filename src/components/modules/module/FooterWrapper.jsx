import React, { Component } from "react";
import * as validator from "../../utils/inputValidators";
import { ValidatorError } from "../../utils/exceptionsAndHandler";

require("../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css");

export default class FooterWrapper extends Component {
  verifyProps = () => {
    const { containerProperties, Contents } = this.props;
    const { isObject, isFunction } = validator;

    if (!isObject(containerProperties))
      throw ValidatorError("module-footer-101");
    if (!isFunction(Contents)) throw ValidatorError("module-footer-102");
  };

  componentDidMount = () => {
    this.verifyProps();
  };

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
