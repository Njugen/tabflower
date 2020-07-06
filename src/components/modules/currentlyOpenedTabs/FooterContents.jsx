import React, { Component } from "react";
import AppContext from "../../contexts/AppContextProvider";
import { ValidatorError, ErrorHandler } from "../../utils/exceptionsAndHandler";
import * as validator from "../../utils/inputValidators";
import { sendToBackground } from "../../../services/webextension/APIBridge";
require("../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css");

export default class FooterContents extends Component {
  static contextType = AppContext;

  sendToModal = this.context.sendToModal;

  render() {
    const {
      onCreateGroup,
      onCloseUnresponsiveTabs,
      windowCollection,
    } = this.props;
    return (
      <>
        <button
          className="btn btn-secondary d-inline-block"
          onClick={() =>
            this.sendToModal({
              id: "cotmremoveunresponsivetabsmodal",
              params: {},
              action: onCloseUnresponsiveTabs.bind(this),
            })
          }
        >
          <span className="fas fa-times mr-2"></span> Close Unresponsive
        </button>
        <button
          className="btn btn-tabeon d-inline-block"
          onClick={() =>
            this.sendToModal({
              id: "etgmcreateoreditgroupmodal",
              params: {
                windowCollection,
                type: "currently-opened",
              },
              action: onCreateGroup.bind(this),
            })
          }
        >
          <span className="fas fa-plus mr-2"></span> Create Group
        </button>
      </>
    );
  }
}
