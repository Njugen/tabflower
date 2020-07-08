import React, { Component, Fragment } from "react";
import { ValidatorError, ErrorHandler } from "../exceptionsAndHandler";
import * as validator from "../inputValidators";
import PropTypes from "prop-types";
import AppContext from "../../contexts/AppContextProvider";
import WindowItem from "./windowItem";
import UrlForm from "./urlForm";

class WindowsList extends Component {
  static contextType = AppContext;

  sendToErrorOverlay = this.context.sendToErrorOverlay;

  state = {
    isAddingNewWindow: false,
    isAddingNewTabs: false,
  };

  raiseToSaveUISettings = (
    area,
    windowId,
    settings,
    handleSuccess,
    handleFail
  ) => {
    const { onSaveUISettings } = this.props;
    console.log("VVVV", settings);
    const { isFunction } = validator;

    if (isFunction(onSaveUISettings)) {
      console.log("MIX", area, windowId, settings);
      onSaveUISettings(area, windowId, settings, handleSuccess, handleFail);
      return true;
    } else {
      return false;
    }
  };

  addNewWindow = (boolInput) => {
    try {
      const { isBoolean } = validator;

      if (isBoolean(boolInput)) {
        const isAddingNewWindow = boolInput;

        this.setState({
          isAddingNewWindow,
        });
      } else {
        throw ValidatorError("windowsList-109");
      }
    } catch (err) {
      ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  addNewTab = (containerId) => {
    try {
      const { isString, isBoolean } = validator;

      if (isString(containerId)) {
        let isAddingNewTabs = this.state.isAddingNewTabs;

        if (isAddingNewTabs === false) {
          isAddingNewTabs = [];
        } else {
          isAddingNewTabs = this.state.isAddingNewTabs;
        }

        isAddingNewTabs.push(containerId);

        this.setState({
          isAddingNewTabs,
        });
      } else {
        if (isBoolean(containerId)) {
          const isAddingNewTabs = containerId;

          this.setState({
            isAddingNewTabs,
          });
        } else {
          throw ValidatorError("windowsList-110");
        }
      }
    } catch (err) {
      ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  cancelNewTab = (containerId) => {
    try {
      const { isString } = validator;

      if (isString(containerId)) {
        let isAddingNewTabs = this.state.isAddingNewTabs;

        if (isAddingNewTabs !== false) {
          if (containerId === "all") {
            isAddingNewTabs = [];
          } else {
            const index = isAddingNewTabs.findIndex(
              (item) => item === containerId
            );
            isAddingNewTabs.splice(index, 1);
          }

          this.setState({
            isAddingNewTabs,
          });
        }
      } else {
        throw ValidatorError("windowsList-111");
      }
    } catch (err) {
      ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  raiseNewWindowToModal = (url) => {
    const { onAddNewWindow } = this.props;

    onAddNewWindow(url);
    this.addNewWindow(false);
  };

  raiseNewTabToModal = (url, index, callback) => {
    const { onAddNewTab } = this.props;

    onAddNewTab(url, index);
    this.addNewTab(false);
    callback();
  };

  raiseDeleteTabToModal = (windowIndex, tabIndex, callback) => {
    const { onDeleteTab } = this.props;
    if (typeof onDeleteTab === "function") {
      onDeleteTab(windowIndex, tabIndex);
    }
    callback();
  };

  raiseDeleteWindowToModal = (windowIndex, callback) => {
    const { onDeleteWindow } = this.props;

    if (typeof onDeleteWindow === "function") {
      onDeleteWindow(windowIndex);
    }

    callback();
  };

  renderAddNewWindowForm = () => {
    return (
      <UrlForm
        type="window"
        onRaiseNewUrl={this.raiseNewWindowToModal}
        onCancel={this.hideAddNewWindowForm}
      />
    );
  };

  renderAddNewTabForm = (containerId, windowIndex) => {
    //this.toggleTabListVisibility(null, containerId, true);

    return (
      <UrlForm
        windowId={windowIndex}
        containerId={containerId}
        type="tab"
        onRaiseNewUrl={this.raiseNewTabToModal}
        onCancel={this.cancelNewTab}
      />
    );
  };

  hideAddNewWindowForm = () => {
    const isAddingNewWindow = false;
    this.setState({
      isAddingNewWindow,
    });
  };

  render = () => {
    const { windows, type } = this.props;

    console.log("EEEEEE", this.props);
    const { isAddingNewWindow, isAddingNewTabs } = this.state;

    if (windows && windows.length > 0) {
      return (
        <div className="windows-list">
          {windows.map((window, windowIndex, windowArray) => {
            return (
              <WindowItem
                {...this.props}
                isAddingNewWindow={isAddingNewWindow}
                isAddingNewTabs={isAddingNewTabs}
                window={window}
                windowArray={windowArray}
                key={windowIndex}
                windowItemIndex={windowIndex}
                onCancelNewTab={this.cancelNewTab}
                onSaveUISettings={this.raiseToSaveUISettings}
                onRaiseDeleteTabToModal={this.raiseDeleteTabToModal}
                onRaiseDeleteWindowToModal={this.raiseDeleteWindowToModal}
                onRenderAddNewTabForm={this.renderAddNewTabForm}
                onRenderAddNewWindowForm={this.renderAddNewWindowForm}
                onAddNewWindow={this.addNewWindow}
                onAddNewTab={this.addNewTab}
              />
            );
          })}
        </div>
      );
    } else {
      return (
        <Fragment>
          {isAddingNewWindow &&
            isAddingNewWindow === true &&
            this.renderAddNewWindowForm()}
          {((isAddingNewWindow && isAddingNewWindow === false) ||
            !isAddingNewWindow) &&
            type &&
            (type === "new-group" || "existing-group") && (
              <button
                className="btn-tabeon-as-only-child btn add-new-window-button"
                onClick={() => this.addNewWindow(true)}
              >
                Add new window
              </button>
            )}
        </Fragment>
      );
    }
  };
}

WindowsList.propTypes = {
  windows: PropTypes.array.isRequired,
  onAddNewWindow: PropTypes.func,
  onAddNewTab: PropTypes.func,
  onDeleteTab: PropTypes.func,
  OnDeleteWindow: PropTypes.func,
  onRaiseToModal: PropTypes.func,
  canCloseItems: PropTypes.bool.isRequired,
  initialShowTabs: PropTypes.bool.isRequired,
  initialTabStyle: PropTypes.string.isRequired,
  refreshList: PropTypes.func,
  type: PropTypes.string.isRequired,
  onSaveUISettings: PropTypes.func,
  uiSettings: PropTypes.object,
};

WindowsList.defaultProps = {
  type: "",
};

export default WindowsList;
