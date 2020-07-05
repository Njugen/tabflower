import React, { Fragment } from "react";
import Module from "../utils/moduleon/module";
import { sendToBackground } from "./../../services/webextension/APIBridge";
import { ValidatorError, ErrorHandler } from "../utils/exceptionsAndHandler";
import * as validator from "../utils/inputValidators";
import PropTypes from "prop-types";
import AppContext from "../contexts/AppContextProvider";
require("../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css");

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

  renderTabGroups = () => {
    const tabGroups = this.state.loadedTabGroups || [];
    const { isPositiveNumber } = validator;
    console.log("FAIR", tabGroups);
    if (isPositiveNumber(tabGroups.length)) {
      return tabGroups.map((group, i) => {
        return (
          <div className="list-item-block col-12 my-2 p-3" key={"tg-" + i}>
            <div className="list-item-block-header mb-3">
              <h6 className="list-item-block-headline float-left pr-2">
                {group.groupName}
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
                      action: this.createOrEditTabGroup.bind(this),
                    })
                  }
                ></button>
                <button
                  className="fas fa-times options-button"
                  onClick={() => {
                    const { groupId, groupName } = group;
                    this.sendToModal({
                      id: "etgmremovegroupsmodal",
                      params: {
                        groupId,
                        groupName,
                      },
                      action: this.removeTabGroups.bind(this),
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
                    this.launchTabGroup(group);
                  } else {
                    this.sendToModal({
                      id: "etgmlaunchgroupmodal",
                      params: {
                        windowCollection: group.windowCollection,
                        groupName: group.groupName,
                        groupDescription: group.groupDescription,
                        groupId: group.groupId,
                        groupCloseAll: group.groupCloseAll || false,
                        groupCloseInactiveTabs:
                          group.groupCloseInactiveTabs || false,
                        groupDontAskAgain: group.groupDontAskAgain || false,
                      },
                      action: this.launchTabGroup.bind(this),
                    });
                  }
                }}
              >
                <span className="fas fa-play mr-2"></span> Launch
              </button>
            </div>
          </div>
        );
      });
    } else {
      return (
        <div className="no-tab-groups-msg">
          There are no saved tab groups at the moment. You may add a new tab
          group by clicking the "Create a new group" button below
        </div>
      );
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
    return (
      <Fragment>
        <div className="existing-tab-groups-module">
          <p>
            To keep the browser's tab bar from overflowing, Tab Flower lets you
            group windows and tabs together. You may create new tab groups at
            any time, and launch their tabs in a categorized manner later.
          </p>
          <div className="existing-tab-groups-list">
            {this.renderTabGroups()}
          </div>
        </div>
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
              id: "etgmremovegroupsmodal",
              params: { removeAll: true },
              action: this.removeTabGroups.bind(this),
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
              action: this.createOrEditTabGroup.bind(this),
            })
          }
        >
          <span className="fas fa-plus mr-2"></span> Add New Group
        </button>
      </Fragment>
    );
  };
}

ExistingTabGroupsModule.propTypes = {
  ...Module.propTypes,
  onRaiseToView: PropTypes.func.isRequired,
  refresh: PropTypes.number.isRequired,
};

export default ExistingTabGroupsModule;
