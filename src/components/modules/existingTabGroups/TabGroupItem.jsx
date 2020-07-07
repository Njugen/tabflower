import React, { Component } from "react";
import AppContext from "./../../contexts/AppContextProvider";
import { ValidatorError, ErrorHandler } from "../../utils/exceptionsAndHandler";
import * as validator from "../../utils/inputValidators";
import { sendToBackground } from "../../../services/webextension/APIBridge";
require("../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css");

export default class TabGroupItem extends Component {
  static contextType = AppContext;

  sendToModal = this.context.sendToModal;

  render() {
    const {
      info: group,
      onEditGroup,
      onRemoveGroup,
      onLaunchGroup,
    } = this.props;
    const { groupName, groupId } = group;

    return (
      <div className="list-item-block col-12 my-2 p-3">
        <div className="list-item-block-header mb-3">
          <h6 className="list-item-block-headline float-left pr-2">
            {groupName}
          </h6>
          <div className="list-item-block-options float-right">
            <button
              className="fas fa-cog options-button"
              onClick={() =>
                this.sendToModal({
                  id: "etgmcreateoreditgroupmodal",
                  params: {
                    ...group,
                    type: "existing-group",
                  },
                  action: onEditGroup.bind(this),
                })
              }
            ></button>
            <button
              className="fas fa-times options-button"
              onClick={() => {
                this.sendToModal({
                  id: "etgmremovegroupsmodal",
                  params: {
                    groupId,
                    groupName,
                  },
                  action: onRemoveGroup.bind(this),
                });
              }}
            ></button>
          </div>
          <div className="clearfix"></div>
        </div>
        <div className="list-item-block-body small pb-3">
          <p>{group.groupDescription}</p>
        </div>
        <div className="list-item-block-footer">
          <button
            className="btn btn-tabeon-reverse d-inline-block"
            onClick={() => {
              if (group && group.groupDontAskAgain === true) {
                onLaunchGroup(group);
              } else {
                this.sendToModal({
                  id: "etgmlaunchgroupmodal",
                  params: {
                    ...group,
                  },
                  action: onLaunchGroup.bind(this),
                });
              }
            }}
          >
            <span className="fas fa-play mr-2"></span> Launch
          </button>
        </div>
      </div>
    );
  }
}
