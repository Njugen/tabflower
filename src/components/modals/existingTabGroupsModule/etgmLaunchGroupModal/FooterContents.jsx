import React, { Component } from "react";
import * as validator from "../../../utils/inputValidators";
import { ValidatorError } from "./../../../utils/exceptionsAndHandler";

export default class FooterContents extends Component {
  verifyProps = () => {
    const { data, onConfirm, onDismiss } = this.props;
    const { isObject, isFunction } = validator;

    if (!isObject(data)) throw ValidatorError("ETGMLaunchGroupsModal-f1");
    if (!isFunction(onConfirm))
      throw ValidatorError("ETGMLaunchGroupsModal-f2");
    if (!isFunction(onDismiss))
      throw ValidatorError("ETGMLaunchGroupsModal-f3");

    if (isObject(data) && !isObject(data.params))
      throw ValidatorError("ETGMLaunchGroupsModal-f6");
  };

  componentDidUpdate = () => {
    this.verifyProps();
  };

  componentDidMount = () => {
    this.verifyProps();
  };

  render() {
    const { data, onConfirm, onDismiss } = this.props;
    const { isObject } = validator;

    if (isObject(data)) {
      const { params } = data;

      if (isObject(params)) {
        return (
          <>
            {typeof onDismiss === "function" && (
              <button
                type="button"
                id="modal-dismiss"
                className="btn btn-secondary"
                onClick={() => onDismiss()}
              >
                Cancel
              </button>
            )}
            {typeof onConfirm === "function" && (
              <button
                type="button"
                id="modal-save"
                className="btn btn-tabeon"
                onClick={() => onConfirm()}
              >
                Launch
              </button>
            )}
          </>
        );
      } else {
        return ValidatorError("ETGMLaunchGroupsModal-f4");
      }
    } else {
      ValidatorError("ETGMLaunchGroupsModal-f5");
    }
  }
}
