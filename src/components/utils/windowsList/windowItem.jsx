import React, { Component } from "react";
import { ValidatorError, ErrorHandler } from "../exceptionsAndHandler";
import { sendToBackground } from "../../../services/webextension/APIBridge";
import * as validator from "../inputValidators";
import AppContext from "./../../contexts/AppContextProvider";
import TabItem from "./tabItem";

export default class WindowItem extends Component {
  static contextType = AppContext;
  /* 

        toggleTabListVisibility()

        Event handler which toggles the visibility of a tab list located in a certain window component. This function
        may also be triggered outside an icon-click event, if preferred.

        Parameters:
        - event (Event object provided by an icon-click event triggering this function. If available, otherwise set to null if run outside an event)
        - windowId (string, mandatory): the id of the window container where the targetted tab list is located
        - forceVisible (boolean, optional): Force the targetted tab list to be visible regardless of circumstances 
    */

  sendToErrorOverlay = this.context.sendToErrorOverlay;
  sendToModal = this.context.sendToModal;

  toggleTabListVisibility = (event, windowId, forceVisible) => {
    try {
      const { isString, isUndefined, isBoolean } = validator;
      const { onCancelNewTab, onSaveUISettings } = this.props;

      if (isString(windowId)) {
        const windowElement = document.getElementById(windowId);
        const tabList = windowElement.getElementsByClassName("tab-listing")[0];
        const iconElement = windowElement.getElementsByClassName(
          "list-item-options"
        )[0].children[1].children[0];

        if (forceVisible && forceVisible === true) {
          tabList.style.display = "block";
          tabList.classList.remove("tab-listing-hide");

          onSaveUISettings("windowslist", windowId, {
            isExpanded: true,
          });
        } else {
          if (!isUndefined(forceVisible) && !isBoolean(forceVisible)) {
            throw ValidatorError("windowsList-102");
          }

          if (
            tabList.style.display === "none" ||
            tabList.classList.contains("tab-listing-hide")
          ) {
            tabList.style.display = "block";
            tabList.classList.remove("tab-listing-hide");
          } else {
            tabList.style.display = "none";
            onCancelNewTab(windowId);
          }

          if (iconElement) {
            if (iconElement.className.includes("fa-chevron-up")) {
              onSaveUISettings("windowslist", windowId, {
                isExpanded: false,
              });
            } else {
              onSaveUISettings("windowslist", windowId, {
                isExpanded: true,
              });
            }
          }
        }

        if (
          (forceVisible === true &&
            event === null &&
            iconElement.className.includes("fa-chevron-down")) ||
          event !== null
        ) {
          if (iconElement.className.includes("fa-chevron-up")) {
            iconElement.className = "fas fa-chevron-down";
          } else {
            iconElement.className = "fas fa-chevron-up";
          }
        }
      } else {
        throw ValidatorError("windowsList-101");
      }
    } catch (err) {
      ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  /* 

        toggleTabListStyle()

        Event handler which toggles a window's tab list in the following manner:
        List the tabs horizontally or vertically. Change the col- class of the tab list items
        to accomplish this (no need for css display, as we do want the items to be wider when listed vertically)
        
        Unlike toggleTabListVisibility(), this function should only be used in icon-click events until further notice... 

        Parameters:
        - event (Event object provided by an icon-click event triggering this function. Mandatory)
        - windowId (string, mandatory): the id of the window container where the targetted tab list is located
    */
  toggleTabListStyle = (event, windowId) => {
    try {
      const { isObject, isString } = validator;

      if (!isObject(event) || (isObject(event) && !isObject(event.target))) {
        throw ValidatorError("windowsList-103");
      }

      if (!isString(windowId)) {
        throw ValidatorError("windowsList-104");
      }

      const { onSaveUISettings } = this.props;
      const windowElement = document.getElementById(windowId);
      const tabList = windowElement.getElementsByClassName("tab-listing")[0];

      const tabListItems = tabList.getElementsByTagName("li");

      const forceTabListVisible = () => {
        /* 
            If the tab list is invisible when changing style, then make it visible at style change. 
            The user needs to observe the changes for the best user experience
        */
        console.log("FORCE VISIBLE SAVE MODE");
        this.toggleTabListVisibility(null, windowId, true);
      };

      for (let i = 0; i < tabListItems.length; i++) {
        const isChildOfTabListing = tabListItems[
          i
        ].parentNode.className.includes("tab-listing");

        if (isChildOfTabListing) {
          if (tabListItems[i].classList.contains("col-3")) {
            tabListItems[i].className = "col-12";
          } else {
            tabListItems[i].className = "col-3";
          }
        }
      }

      /* Toggle tab style icon of window bar */
      const iconElement = event.target;
      let saveModeEnabled;

      if (iconElement.className.includes("fas fa-align-justify")) {
        console.log("ATOM");
        iconElement.className = "fas fa-grip-horizontal";
        saveModeEnabled = onSaveUISettings(
          "windowslist",
          windowId,
          {
            isTabsCrowded: false,
          },
          forceTabListVisible
        );
      } else {
        console.log("NEUTRON");
        iconElement.className = "fas fa-align-justify";
        saveModeEnabled = onSaveUISettings(
          "windowslist",
          windowId,
          {
            isTabsCrowded: true,
          },
          forceTabListVisible
        );
      }

      if (saveModeEnabled === false) {
        forceTabListVisible();
      }
    } catch (err) {
      ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  closeWindow = (window) => {
    try {
      const { isObject, isNumber } = validator;
      const { refreshList } = this.props;

      if (isObject(window.data)) {
        if (isNumber(window.data.id)) {
          sendToBackground(
            "delete-window",
            { windowId: window.data.id },
            (response) => {
              refreshList();
            }
          );
        } else {
          throw ValidatorError("windowsList-106");
        }
      } else {
        throw ValidatorError("windowsList-105");
      }
    } catch (err) {
      ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  determineTabStyle = (windowId, defaultTabStyle) => {
    const { uiSettings } = this.props;
    let tabStyle;

    console.log("UIS", uiSettings);
    if (
      uiSettings &&
      uiSettings["windowslist"] &&
      uiSettings["windowslist"][windowId]
    ) {
      if (uiSettings["windowslist"][windowId].isTabsCrowded === true) {
        tabStyle = "horizontal";
      } else {
        tabStyle = "vertical";
      }
    } else {
      tabStyle = defaultTabStyle;
    }

    return tabStyle;
  };

  determineTabsVisibility = (windowId, defaultVisibility) => {
    const { uiSettings } = this.props;
    let tabsVisibility;

    if (
      uiSettings &&
      uiSettings["windowslist"] &&
      uiSettings["windowslist"][windowId]
    ) {
      if (uiSettings["windowslist"][windowId].isExpanded === true) {
        tabsVisibility = true;
      } else {
        tabsVisibility = false;
      }
    } else {
      tabsVisibility = defaultVisibility;
    }

    return tabsVisibility;
  };

  render() {
    const {
      window,
      isAddingNewTabs,
      isAddingNewWindow,
      initialShowTabs,
      initialTabStyle,
      canCloseItems,
      type,
      windowItemIndex,
      windowArray,
      onRaiseDeleteTabToModal,
      onRaiseDeleteWindowToModal,
      onRenderAddNewTabForm,
      onRenderAddNewWindowForm,
      onAddNewWindow,
      onAddNewTab,
    } = this.props;
    const { isFunction } = validator;

    const { tabs } = window;
    console.log("MEW", windowItemIndex);
    const windowContainerId = "window-container-id-" + windowItemIndex;
    const windowName = "Window " + (windowItemIndex + 1);

    const isAddingNewTab =
      isAddingNewTabs !== false &&
      isAddingNewTabs.find((item) => item === windowContainerId);

    const tabStyle = this.determineTabStyle(windowContainerId, initialTabStyle);

    const tabsVisibility = this.determineTabsVisibility(
      windowContainerId,
      initialShowTabs
    );

    const tabList = tabs.map((tab, tabIndex) => {
      return (
        <TabItem
          windowItemIndex={windowItemIndex}
          tabIndex={tabIndex}
          tab={tab}
          tabStyle={tabStyle}
          canCloseItems={canCloseItems}
          onRaiseDeleteTabToModal={onRaiseDeleteTabToModal}
          type={type}
        />
      );
    });

    return (
      <div className="active-tabs-module" key={"window-" + windowItemIndex}>
        <ul className="window-listing col-12">
          <li className="mt-2" id={windowContainerId}>
            <div className="window-header">
              {windowName}
              <ul className="list-item-options">
                <li>
                  <button
                    className={
                      typeof tabStyle === "string" && tabStyle === "horizontal"
                        ? "fas fa-align-justify"
                        : "fas fa-grip-horizontal"
                    }
                    onClick={(e) =>
                      this.toggleTabListStyle(e, windowContainerId)
                    }
                  ></button>
                </li>
                <li>
                  <button
                    disabled={isAddingNewTab ? true : false}
                    className={
                      typeof tabsVisibility === "boolean" &&
                      tabsVisibility === false
                        ? "fas fa-chevron-down toggle-window"
                        : "fas fa-chevron-up toggle-window"
                    }
                    onClick={(e) =>
                      this.toggleTabListVisibility(e, windowContainerId)
                    }
                  ></button>
                </li>
                {canCloseItems &&
                  canCloseItems === true &&
                  isFunction(onRaiseDeleteWindowToModal) && (
                    <li>
                      <button
                        className="fas fa-times"
                        onClick={() => {
                          if (
                            type === "existing-group" ||
                            type === "new-group"
                          ) {
                            onRaiseDeleteWindowToModal(
                              windowItemIndex,
                              () => {}
                            );
                          } else {
                            this.sendToModal({
                              id: "cotmremovewindowmodal",
                              params: { windowInfo: window, windowName },
                              action: this.closeWindow.bind(this),
                            });
                          }
                        }}
                      ></button>
                    </li>
                  )}
              </ul>
            </div>
            <ul
              className={
                typeof tabsVisibility === "boolean" && tabsVisibility === false
                  ? "tab-listing-hide tab-listing horizontal"
                  : "tab-listing horizontal"
              }
            >
              {tabList}
              {type &&
                (type === "existing-group" || type === "new-group") &&
                !isAddingNewTab && (
                  <button
                    className="btn-tabeon-reverse btn add-new-tab-button"
                    onClick={() => onAddNewTab(windowContainerId)}
                  >
                    Add new Tab
                  </button>
                )}
            </ul>
            {isAddingNewTab &&
              onRenderAddNewTabForm(windowContainerId, windowItemIndex)}
          </li>
        </ul>
        {isAddingNewWindow &&
          isAddingNewWindow === true &&
          windowArray.length - 1 === windowItemIndex &&
          onRenderAddNewWindowForm()}
        {((isAddingNewWindow && isAddingNewWindow === false) ||
          !isAddingNewWindow) &&
          windowArray.length - 1 === windowItemIndex &&
          (type === "existing-group" || type === "new-group") && (
            <button
              className="btn-tabeon-as-only-child btn add-new-window-button"
              onClick={() => onAddNewWindow(true)}
            >
              Add new window
            </button>
          )}
      </div>
    );
  }
}
