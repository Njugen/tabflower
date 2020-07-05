import React, { Fragment } from "react";
import Module from "../utils/moduleon/module";
import WindowsList from "./../utils/windowsList";
import { sendToBackground } from "../../services/webextension/APIBridge";
import * as validator from "./../utils/inputValidators";
import { ValidatorError, ErrorHandler } from "../utils/exceptionsAndHandler";
import PropTypes from "prop-types";

import AppContext from "./../contexts/AppContextProvider";

require("../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css");

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
    const { isFunction } = validator;

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
      sendToBackground(
        "delete-unresponsive-tabs",
        {
          windowsAndTabs: this.state.openedWindowsAndTabs,
        },
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

  renderBody = () => {
    console.log("CURRENTLY OPENED SETTINGS", this.state.uiSettings);
    return (
      <Fragment>
        <p>
          Tab Flower offers you an oversight over all opened tabs, making it
          easier to remove tabs and windows you seldom use. You may also scan
          for unresponsive websites and remove them.
        </p>
        <WindowsList
          windows={this.state.openedWindowsAndTabs}
          onRaiseToModal={(data) => this.sendToModal(data)}
          onRaiseToErrorOverlay={(data) => this.sendToErrorOverlay(data)}
          onSaveUISettings={this.saveUISettingsToStorage}
          uiSettings={this.state.uiSettings}
          canCloseItems={true}
          initialShowTabs={true}
          initialTabStyle="horizontal"
          refreshList={() => this.getOpenedWindowsAndTabs()}
        />
      </Fragment>
    );
  };

  renderFooter = () => {
    return (
      <Fragment>
        <button
          className="btn btn-secondary d-inline-block"
          onClick={() =>
            this.sendToModal({
              id: "cotmremoveunresponsivetabsmodal",
              params: {},
              action: this.closeUnresponsiveTabs.bind(this),
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
                windowCollection: this.state.openedWindowsAndTabs,
                type: "currently-opened",
              },
              action: this.createTabGroup.bind(this),
            })
          }
        >
          <span className="fas fa-plus mr-2"></span> Create Group
        </button>
      </Fragment>
    );
  };
}

CurrentlyOpenedTabsModule.propTypes = {
  ...Module.propTypes,
  onRaiseToView: PropTypes.func.isRequired,
};

export default CurrentlyOpenedTabsModule;
