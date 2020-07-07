import React, { Component } from "react";
import * as validator from "../../../utils/inputValidators";

export default class FooterContents extends Component {
  confirmButtonLabel = (type) => {
    if (type === "currently-opened" || type === "new-group") {
      return "Create";
    } else if (type === "existing-group") {
      return "Save Changes";
    }
  };

  render() {
    const { data, onConfirm, onDismiss } = this.props;
    const { params } = data;

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
  }
}
