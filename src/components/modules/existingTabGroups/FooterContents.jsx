import React, { Component } from "react";
import AppContext from "../../contexts/AppContextProvider";
import { ValidatorError, ErrorHandler } from "../../utils/exceptionsAndHandler";
import * as validator from "../../utils/inputValidators";
import { sendToBackground } from "../../../services/webextension/APIBridge";
require("../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css");

export default class Footer extends Component {
  static contextType = AppContext;

  sendToModal = this.context.sendToModal;

  render() {
    const { onCreateGroup, onRemoveGroup } = this.props;
    return (
      <>
        <button
          className="btn btn-secondary d-inline-block"
          onClick={() =>
            this.sendToModal({
              id: "etgmremovegroupsmodal",
              params: { removeAll: true },
              action: onRemoveGroup.bind(this),
            })
          }
        >
          <span className="fas fa-trash mr-2"></span> Remove All
        </button>
        <button
          className="btn btn-tabeon d-inline-block"
          onClick={() =>
            this.sendToModal({
              id: "etgmcreateoreditgroupmodal",
              params: { windowCollection: [], type: "new-group" },
              action: onCreateGroup.bind(this),
            })
          }
        >
          <span className="fas fa-plus mr-2"></span> Add New Group
        </button>
      </>
    );
  }
}
