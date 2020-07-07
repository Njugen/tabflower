import React, { Component } from "react";
import * as validator from "../../../utils/inputValidators";

export default class FooterContents extends Component {
  render() {
    const { data, onConfirm, onDismiss } = this.props;

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
  }
}
