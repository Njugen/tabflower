import React, { Component } from "react";

export default class FooterContents extends Component {
  render() {
    const { onConfirm, onDismiss } = this.props;

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
            Close Window
          </button>
        )}
      </>
    );
  }
}
