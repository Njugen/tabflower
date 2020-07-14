import React, { Component } from "react";
import * as validator from "../inputValidators";
import { ValidatorError, ErrorHandler } from "../exceptionsAndHandler";
import { sendToBackground } from "../../../services/webextension/APIBridge";
import AppContext from "./../../contexts/AppContextProvider";

export default class TabItem extends Component {
  static contextType = AppContext;

  sendToErrorOverlay = this.context.sendToErrorOverlay;
  sendToModal = this.context.sendToModal;

  closeTab = (tab) => {
    try {
      const { isObject, isNumber } = validator;
      const { refreshList } = this.props;
      if (isObject(tab.data)) {
        if (isNumber(tab.data.id)) {
          sendToBackground("delete-tab", { tabId: tab.data.id }, (response) => {
            refreshList();
            //setTimeout(() => this.getOpenedWindowsAndTabs(), 1500)
          });
        } else {
          throw ValidatorError("windowsList-108");
        }
      } else {
        throw ValidatorError("windowsList-107");
      }
    } catch (err) {
      ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  render() {
    const {
      windowItemIndex,
      tabIndex,
      tab,
      tabStyle,
      canCloseItems,
      onRaiseDeleteTabToModal,
      type,
    } = this.props;
    const { isFunction } = validator;

    return (
      <li
        key={"tabindex-" + windowItemIndex + "-" + tabIndex}
        className={
          typeof tabStyle === "string" && tabStyle === "horizontal"
            ? "col-3"
            : "col-12"
        }
      >
        <img src={tab.favIconUrl} alt={""} className="list-item-favicon" />
        <span>{tab.title}</span>
        <ul className="list-item-options">
          {canCloseItems &&
            canCloseItems === true &&
            isFunction(onRaiseDeleteTabToModal) && (
              <li>
                <button
                  className="fas fa-times"
                  onClick={() => {
                    if (type === "existing-group" || type === "new-group") {
                      onRaiseDeleteTabToModal(
                        windowItemIndex,
                        tabIndex,
                        () => {}
                      );
                    } else {
                      this.sendToModal({
                        id: "cotmremovetabmodal",
                        params: { tabInfo: tab },
                        action: this.closeTab.bind(this),
                      });
                    }
                  }}
                ></button>
              </li>
            )}
        </ul>
      </li>
    );
  }
}
