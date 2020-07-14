import React, { Component } from "react";
import * as validator from "../../utils/inputValidators";
import { ValidatorError } from "../../utils/exceptionsAndHandler";

require("../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css");

export default class HeaderWrapper extends Component {
  verifyProps = () => {
    const { containerProperties, title, onToggleModuleExpansion } = this.props;
    const { isObject, isFunction, isString } = validator;

    if (!isObject(containerProperties))
      throw ValidatorError("module-header-101");
    if (!isString(title)) throw ValidatorError("module-header-102");
    if (!isFunction(onToggleModuleExpansion))
      throw ValidatorError("module-header-103");
  };

  componentDidMount = () => {
    this.verifyProps();
  };

  render() {
    const { containerProperties, title, onToggleModuleExpansion } = this.props;
    const { minimized } = containerProperties;
    const headerWrapperInitialClassName =
      "row tabeon-module-header-column-wrapper";

    return (
      <div className="row tabeon-module-header" draggable="true">
        <div className="col-12">
          <div
            className={
              minimized === true
                ? headerWrapperInitialClassName + " tabeon-no-border"
                : headerWrapperInitialClassName
            }
          >
            <div className="col-8">
              <div className="float-left">
                <h5>{title}</h5>
              </div>
            </div>
            <div className="col-4 tabeon-module-header-control">
              <button
                onClick={(e) =>
                  minimized === true
                    ? onToggleModuleExpansion(false)
                    : onToggleModuleExpansion(true)
                }
                className="btn shadow-none tabeon-module-header-control-button"
              >
                <span
                  className={
                    minimized === true
                      ? "fas fa-chevron-down"
                      : "fas fa-chevron-up"
                  }
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
