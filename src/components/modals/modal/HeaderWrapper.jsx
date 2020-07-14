import React, { Component } from "react";
import * as validator from "../../utils/inputValidators";

export default class HeaderWrapper extends Component {
  render() {
    const { Contents, onDismiss, data } = this.props;
    const { isFunction } = validator;

    return (
      <div className="modal-header">
        <h5 className="modal-title" id="tabeonModalLabel">
          {isFunction(Contents) && Contents(data)}
        </h5>
        {isFunction(onDismiss) && (
          <button type="button" className="close" onClick={() => onDismiss()}>
            &times;
          </button>
        )}
      </div>
    );
  }
}
