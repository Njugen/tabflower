import React, { Component, Fragment } from "react";
import * as validator from "../../../utils/inputValidators";

import TBCheckBox from "../../../utils/form/tbCheckbox";
import * as ExceptionsHandler from "../../../utils/exceptionsAndHandler";

export default class BodyContents extends Component {
  verifyProps = () => {
    const { data, onChange } = this.props;
    const { isObject, isFunction } = validator;

    if (!isObject(data))
      throw ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-113");

    if (!isFunction(onChange))
      throw ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-114");
  };

  getWindowCollection = () => {
    const { data } = this.props;
    const { isObject, isArray } = validator;
    const emptyCollection = [];

    if (!isObject(data)) return emptyCollection;

    const { params } = data;

    if (!isObject(params)) return emptyCollection;
    const { windowCollection } = params;

    if (
      !isArray(windowCollection) ||
      (isArray(windowCollection) && windowCollection.length === 0)
    )
      return emptyCollection;

    return windowCollection;
  };

  numberOfWindows = () => {
    const windows = this.getWindowCollection();

    return windows.length;
  };

  numberOfTabs = () => {
    const windows = this.getWindowCollection();
    let numberOfTabs = 0;

    if (windows.length === 0) return 0;

    windows.map((window) => {
      numberOfTabs += window.tabs.length;

      return null;
    });
    console.log(numberOfTabs);

    return numberOfTabs;
  };
  /*
        renderWarningMessage()

        Render a warning message to the user, if the number of windows and/or tabs to be opened exceeds the recommended number.
        The recommended number is up to the app developer to decide. 

        Parameters:
        - numberOfWindows (optional, number)
        - numberOfTabs (optional, number)
    */
  renderWarningMessage = (numberOfWindows, numberOfTabs) => {
    const { isNumber } = validator;

    numberOfWindows = isNumber(numberOfWindows)
      ? numberOfWindows
      : "an undefined number of";
    numberOfTabs = isNumber(numberOfTabs)
      ? numberOfTabs
      : "an undefined number of";

    return (
      <p>
        Warning: You are about to launch a group consisting of{" "}
        <strong>{numberOfWindows} windows</strong> and{" "}
        <strong>{numberOfTabs} tabs</strong>. This might stress your computer
        down in the long run, or cause confusion in your work. Are you sure you
        want to launch this group?
      </p>
    );
  };

  /*
        renderLaunchOptions()

        Render a list of checkbox elements, offering the user the possibility to change 
        the behaviour of the launching tab group.
    */
  renderLaunchOptions = () => {
    const { data, onChange } = this.props;
    const { isObject } = validator;

    if (!isObject(data))
      return "Information about the requested tab group was not provided to this modal. Please, contact the developer.";

    const { params } = data;

    if (!isObject(params))
      return "The options could not be loaded because the relevant parameters were not provided with the group data. Please, contact the developer.";

    const { groupCloseAll, groupCloseInactiveTabs, groupDontAskAgain } = params;

    return (
      <Fragment>
        <TBCheckBox
          id="groupCloseAll"
          label="Close all currently opened tabs and windows"
          value={groupCloseAll && groupCloseAll === true ? "true" : "false"}
          onToggle={(id, value) => onChange(id, value, "tabGroupDetails")}
        />
        <TBCheckBox
          id="groupCloseInactiveTabs"
          label="Automatically close all unresponsive tabs opened by this tab group"
          value={
            groupCloseInactiveTabs && groupCloseInactiveTabs === true
              ? "true"
              : "false"
          }
          onToggle={(id, value) => onChange(id, value, "tabGroupDetails")}
        />
        <TBCheckBox
          id="groupDontAskAgain"
          label="Save all selected options and do not show this message again (All settings offered in this popup can still be changed for any tab group. Just click the cog wheel for the tab group you want to change)."
          value={
            groupDontAskAgain && groupDontAskAgain === true ? "true" : "false"
          }
          onToggle={(id, value) => onChange(id, value, "tabGroupDetails")}
        />
      </Fragment>
    );
  };

  render() {
    const numberOfWindows = this.numberOfWindows();
    const numberOfTabs = this.numberOfTabs();

    return (
      <Fragment>
        {this.renderLaunchOptions()}
        {(numberOfWindows > 5 || numberOfTabs > 15) &&
          this.renderWarningMessage(numberOfWindows, numberOfTabs)}
      </Fragment>
    );
  }
}
