import React, { Component } from "react";
import * as validator from "../../utils/inputValidators";
import { ValidatorError } from "../../utils/exceptionsAndHandler";

require("../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css");

export default class BodyWrapper extends Component {
  verifyProps = () => {
    const { containerProperties, Contents } = this.props;
    const { isObject, isFunction } = validator;

    if (!isObject(containerProperties)) throw ValidatorError("module-body-101");
    if (!isFunction(Contents)) throw ValidatorError("module-body-102");
  };

  componentDidMount = () => {
    this.verifyProps();
  };

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
