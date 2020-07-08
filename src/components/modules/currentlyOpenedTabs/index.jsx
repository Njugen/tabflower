import React from "react";
import Module from "../module/index";
import { sendToBackground } from "../../../services/webextension/APIBridge";
import * as validator from "../../utils/inputValidators";
import { ValidatorError, ErrorHandler } from "../../utils/exceptionsAndHandler";
import PropTypes from "prop-types";

import AppContext from "../../contexts/AppContextProvider";
import FooterContents from "./FooterContents";
import BodyContents from "./BodyContents";

require("../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css");

class CurrentlyOpenedTabsModule extends Module {
  static contextType = AppContext;

  verifyChildProps = () => {
    const { id, title, refresh, onRaiseToView } = this.props;
    const { isString, isNumber, isFunction, isUndefined } = validator;

    if (!isString(id)) throw ValidatorError("cotm-module-101");
    if (!isString(title)) throw ValidatorError("cotm-module-102");
    if (!isNumber(refresh) && !isUndefined(refresh))
      throw ValidatorError("cotm-module-110");
    if (!isFunction(onRaiseToView) && !isUndefined(onRaiseToView))
      throw ValidatorError("cotm-module-111");
  };

  setOpenedWindowsToState = (windows, callback) => {
    const { isFunction, isArray } = validator;

    if (!isArray(windows)) throw ValidatorError("cotm-module-112");

    this.setState(
      {
        openedWindowsAndTabs: windows,
      },
      () => isFunction(callback) && callback()
    );
  };

  /*
        createTabGroup

        Parameter
        - details (object), information about the tab group to create
    */
  createTabGroup = (details) => {
    try {
      const { isObject, isString, isArray } = validator;

      if (!isObject(details)) throw ValidatorError("cotm-module-103");

      const {
        groupId,
        windowCollection,
        groupName,
        groupDescription,
      } = details;

      if (
        !isArray(windowCollection) ||
        (isArray(windowCollection) && windowCollection.length < 1)
      )
        throw ValidatorError("cotm-module-104");

      if (!isString(groupId)) throw ValidatorError("cotm-module-105");
      if (!isString(groupName)) throw ValidatorError("cotm-module-106");
      if (!isString(groupDescription)) throw ValidatorError("cotm-module-107");

      sendToBackground(
        "save-tab-group",
        details,
        () => {
          try {
            const { onRaiseToView } = this.props;

            if (onRaiseToView) onRaiseToView("refresh");
          } catch (err) {
            ErrorHandler(err, this.sendToErrorOverlay);
          }
        },
        (failResponse) => {
          const err = ValidatorError(failResponse.data);
          ErrorHandler(err, this.sendToErrorOverlay);
        }
      );
    } catch (err) {
      ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  getOpenedWindowsAndTabs = () => {
    sendToBackground(
      "get-all-windows-and-tabs",
      {},
      (successResponse) => {
        try {
          const { isArray, isObject } = validator;

          if (
            !isObject(successResponse) ||
            (isObject(successResponse) && !isArray(successResponse.data))
          ) {
            throw ValidatorError("cotm-module-108");
          }

          this.setOpenedWindowsToState(successResponse.data);
        } catch (err) {
          ErrorHandler(err, this.sendToErrorOverlay);
        }
      },
      (failResponse) => {
        const err = ValidatorError(failResponse.data);
        ErrorHandler(err, this.sendToErrorOverlay);
      }
    );
  };

  closeUnresponsiveTabs = (data) => {
    try {
      const parameters = {
        windowCollection: this.state.openedWindowsAndTabs,
      };

      sendToBackground(
        "delete-unresponsive-tabs",
        parameters,
        () => {
          try {
            setTimeout(() => this.getOpenedWindowsAndTabs(), 1500);
          } catch (err) {
            ErrorHandler(err, this.sendToErrorOverlay);
          }
        },
        (failResponse) => {
          const err = ValidatorError(failResponse.data);
          ErrorHandler(err, this.sendToErrorOverlay);
        }
      );
    } catch (err) {
      ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  listenForWindowChanges = (event) => {
    try {
      if (event.messageId && event.messageId === "window-tabs-updated") {
        this.getOpenedWindowsAndTabs();
      }
    } catch (err) {
      ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  addWindowsTabsListener = () => {
    try {
      const chrome =
        typeof window.chrome === "undefined" ? null : window.chrome;

      if (chrome) {
        chrome.runtime.onMessage.addListener(this.listenForWindowChanges);
      } else {
        // If the webextension API does not exist, simply ignore listening for anything and just request dummy data
        this.getOpenedWindowsAndTabs();
      }
    } catch (err) {
      ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  removeWindowsTabsListener = () => {
    const chrome = typeof window.chrome === "undefined" ? null : window.chrome;

    if (chrome) {
      chrome.runtime.onMessage.removeListener(this.listenForWindowChanges);
    }
  };

  childComponentDidMount = () => {
    this.getUISettingsFromStorage(this.props.id);
    this.getOpenedWindowsAndTabs();
    this.addWindowsTabsListener();
  };

  componentWillUnmount = () => {
    this.removeWindowsTabsListener();
  };

  renderBodyContents = () => {
    const { openedWindowsAndTabs, uiSettings } = this.state;

    return (
      <BodyContents
        windows={openedWindowsAndTabs}
        onSaveUISettings={this.saveUISettingsToStorage}
        refreshList={() => this.getOpenedWindowsAndTabs()}
        uiSettings={uiSettings}
      />
    );
  };

  renderFooterContents = () => {
    const { openedWindowsAndTabs } = this.state;
    return (
      <FooterContents
        windowCollection={openedWindowsAndTabs}
        onCloseUnresponsiveTabs={this.closeUnresponsiveTabs}
        onCreateGroup={this.createTabGroup}
      />
    );
  };
}

CurrentlyOpenedTabsModule.propTypes = {
  ...Module.propTypes,
  onRaiseToView: PropTypes.func.isRequired,
};

export default CurrentlyOpenedTabsModule;
