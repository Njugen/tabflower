import React, { Fragment } from "react";
import Module from "../../utils/moduleon/module";
import { sendToBackground } from "../../../services/webextension/APIBridge";
import { ValidatorError, ErrorHandler } from "../../utils/exceptionsAndHandler";
import * as validator from "../../utils/inputValidators";
import PropTypes from "prop-types";
import AppContext from "../../contexts/AppContextProvider";

import Footer from "./Footer";
import Body from "./Body";
require("../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css");

class ExistingTabGroupsModule extends Module {
  static contextType = AppContext;

  verifyChildProps = () => {
    const { id, title, refresh, onRaiseToView } = this.props;
    const { isString, isNumber, isFunction, isUndefined } = validator;

    if (!isString(id)) throw ValidatorError("etgm-module-101");
    if (!isString(title)) throw ValidatorError("etgm-module-102");
    if (!isNumber(refresh) && !isUndefined(refresh))
      throw ValidatorError("etgm-module-111");
    if (!isFunction(onRaiseToView) && !isUndefined(onRaiseToView))
      throw ValidatorError("etgm-module-112");
  };

  setLoadedTabGroupsToState = (groups, callback) => {
    try {
      const { isFunction, isArray } = validator;

      if (!isArray(groups)) throw ValidatorError("etgm-module-113");

      this.setState(
        {
          loadedTabGroups: groups,
        },
        () => isFunction(callback) && callback()
      );
    } catch (err) {
      ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  removeTabGroups = (tabGroup) => {
    try {
      const { isString } = validator;

      let groupId = "";

      if (tabGroup && tabGroup.groupId) {
        if (!isString(tabGroup.groupId))
          throw ValidatorError("etgm-module-104");

        groupId = tabGroup.groupId;
      } else {
        groupId = "all";
      }

      sendToBackground("delete-tab-groups", { id: groupId }, () => {
        this.getAllTabGroups();
      });
    } catch (err) {
      ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  createOrEditTabGroup = (details) => {
    try {
      const { isObject, isString, isArray, isFunction } = validator;
      const {
        groupId,
        windowCollection,
        groupName,
        groupDescription,
      } = details;

      if (!isObject(details)) throw ValidatorError("etgm-module-105");
      if (
        !isArray(windowCollection) ||
        (isArray(windowCollection) && windowCollection.length < 1)
      )
        throw ValidatorError("etgm-module-106");

      if (!isString(groupId)) throw ValidatorError("etgm-module-107");
      if (!isString(groupName)) throw ValidatorError("etgm-module-108");
      if (!isString(groupDescription)) throw ValidatorError("etgm-module-109");

      sendToBackground(
        "save-tab-group",
        details,
        (successResponse) => {
          const { onRaiseToView } = this.props;

          if (isFunction(onRaiseToView)) onRaiseToView("refresh");
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

  launchTabGroup = (tabGroup) => {
    try {
      const { isObject, isFunction } = validator;

      if (!isObject(tabGroup)) throw ValidatorError("etgm-module-103");

      sendToBackground("launch-tab-group", tabGroup, (response) => {
        const { onRaiseToView } = this.props;

        if (isFunction(onRaiseToView)) {
          onRaiseToView("refresh");
        }
      });
    } catch (err) {
      ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  getAllTabGroups = () => {
    try {
      sendToBackground(
        "get-all-tab-groups",
        {},
        (response) => {
          try {
            const { isUndefined, isArray } = validator;

            let tabGroups = [];

            if (!isUndefined(response) && isArray(response.data)) {
              tabGroups = response.data;
            } else {
              throw ValidatorError("etgm-module-110");
            }

            this.setLoadedTabGroupsToState(tabGroups);
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

  childComponentDidMount = () => {
    this.getUISettingsFromStorage(this.props.id);
    this.getAllTabGroups();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.refresh !== this.props.refresh) {
      this.getAllTabGroups();
    }
  };

  renderBody = () => {
    const { loadedTabGroups } = this.state;
    return (
      <Body
        tabgroups={loadedTabGroups}
        onEditGroup={this.createOrEditTabGroup}
        onRemoveGroup={this.removeTabGroups}
        onLaunchGroup={this.launchTabGroup}
      />
    );
  };

  renderFooter = () => {
    return (
      <Footer
        onCreateGroup={this.createOrEditTabGroup}
        onRemoveGroup={this.removeTabGroups}
      />
    );
  };
}

ExistingTabGroupsModule.propTypes = {
  ...Module.propTypes,
  onRaiseToView: PropTypes.func.isRequired,
  refresh: PropTypes.number.isRequired,
};

export default ExistingTabGroupsModule;
