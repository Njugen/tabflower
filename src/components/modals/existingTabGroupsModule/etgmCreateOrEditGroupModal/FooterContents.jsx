import React, { Component } from "react";
import * as validator from "../../../utils/inputValidators";
import { ValidatorError } from "./../../../utils/exceptionsAndHandler";

export default class FooterContents extends Component {
  confirmButtonLabel = (type) => {
    if (type === "currently-opened" || type === "new-group") {
      return "Create";
    } else if (type === "existing-group") {
      return "Save Changes";
    } else {
      return "Try Save";
    }
  };

  verifyProps = () => {
    const { data, onConfirm, onDismiss } = this.props;
    const { isObject, isFunction } = validator;

    if (!isObject(data)) throw ValidatorError("ETGMCreateNewGroupModal-f1");
    if (!isFunction(onConfirm))
      throw ValidatorError("ETGMCreateNewGroupModal-f2");
    if (!isFunction(onDismiss))
      throw ValidatorError("ETGMCreateNewGroupModal-f3");

    if (isObject(data) && !isObject(data.params))
      throw ValidatorError("ETGMCreateNewGroupModal-f6");
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
                {this.confirmButtonLabel(params.type)}
              </button>
            )}
          </>
        );
      } else {
        return ValidatorError("ETGMCreateNewGroupModal-f4");
      }
    } else {
      return ValidatorError("ETGMCreateNewGroupModal-f5");
    }
  }
}
