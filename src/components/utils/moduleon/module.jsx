import React, { Component } from "react";
import * as ExceptionsHandler from "../exceptionsAndHandler";
import * as validator from "./../../utils/inputValidators";
import PropTypes from "prop-types";
import AppContext from "./../../contexts/AppContextProvider";
import { ValidatorError, ErrorHandler } from "./../exceptionsAndHandler";

import { sendToBackground } from "./../../../services/webextension/APIBridge";

require("../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css");

class Module extends Component {
  static contextType = AppContext;
  /*
        State:
        - uiSettings (object, the section where the ui settings are located)
            - [area]: The component which this setting affects. (Can be the current component or a child component)
                - [id]: The id of the element located in this area. Can be any HTML component.abs
                    - [key]: The name of the setting.
    */
  state = {
    uiSettings: {
      modulecontainer: {
        properties: {
          minimized: false,
        },
      },
    },
  };

  // Set a possibility to call the error overlay located in the addon's context, if an error occurs
  sendToErrorOverlay = this.context.sendToErrorOverlay;

  // Set a possibility to call a modal located in the addon's context
  sendToModal = this.context.sendToModal;

  /*
    saveUISettingsToState

    Change/set the UI settings to this component state

    Props:
    - area (string, mandatory). The component or section where the targetted element is located
    - id (string, mandatory). The id of the targetted element
    - settings (object, mandatory). the collection of settings affecting this element
    - handleSuccess (function, optional). Called when the settings are successfully set to the state.
    - handleFail (function, optional). Called when this.setState() is not called.
  */
  saveUISettingsToState = (area, id, settings, handleSuccess, handleFail) => {
    const { isString, isObject, isFunction } = validator;

    const { uiSettings: uiSettingsState } = this.state;

    let existingUISettings = {};
    let uiSettings = null;

    if (isString(area) && isString(id) && isObject(settings)) {
      //Check for earlier settings and merge the objects
      if (
        uiSettingsState &&
        uiSettingsState[area] &&
        uiSettingsState[area][id]
      ) {
        existingUISettings = uiSettingsState[area][id];

        uiSettings = uiSettingsState;
        uiSettings[area][id] = {
          ...existingUISettings,
          ...settings,
        };
      }
    } else if (isObject(area)) {
      uiSettings = area;
    }

    if (isObject(uiSettings) && uiSettings !== null) {
      this.setState(
        {
          uiSettings,
        },
        () => {
          console.log("NELSON", this.state);
          if (isFunction(handleSuccess)) {
            handleSuccess();
          }
        }
      );
    } else {
      if (isFunction(handleFail)) {
        handleFail();
      }
    }
  };

  getUISettingsFromStorage = (moduleId, handleSuccess, handleFail) => {
    const { isFunction } = validator;

    sendToBackground(
      "get-module-ui-settings",
      { moduleId },
      (successResponse) => {
        try {
          const { isObject } = validator;

          if (!isObject(successResponse)) {
            // throw ValidatorError("cotm-module-108");
          }

          this.saveUISettingsToState(successResponse.data);

          if (isFunction(handleSuccess)) {
            handleSuccess();
          }
        } catch (err) {
          ErrorHandler(err, this.sendToErrorOverlay);
        }
      },
      (failResponse) => {
        if (isFunction(handleFail)) {
          handleFail();
        }
      }
    );
  };

  saveUISettingsToStorage = (area, id, settings, handleSuccess, handleFail) => {
    /*
      Parameters:
      - area (string): the category/section of the module
      - id (string): the id which identifies the element this settings belongs to
      - settings (object): an object containing settings for the targetted element
    */
    const { isString, isObject, isFunction } = validator;

    if (isString(area) && isString(id) && isObject(settings)) {
      //const { isExpanded, isTabsCrowded } = settings;
      let newSettings = {
        meta: {
          moduleId: this.staticPreset.moduleId,
          area: area,
          id: id,
        },
        options: {
          ...settings,
        },
      };

      sendToBackground(
        "save-module-ui-settings",
        newSettings,
        (successResponse) => {
          isFunction(handleSuccess) && handleSuccess(successResponse);
        },
        (failResponse) => {
          isFunction(handleFail) && handleSuccess(failResponse);
        }
      );
    } else {
      console.log("HAISTA MANSIKKA. VIRHE ON TAPAHTUNUT");
    }
  };

  toggleModuleExpansion = (setMinimized) => {
    /*
      props:

      - setMinimized (bool, mandatory): if true, the module will minimize. If false, the module will expand
    */

    const settingsArea = "modulecontainer";
    const settingsId = "properties";
    const updatedSettings = {
      minimized: setMinimized || false,
    };

    this.saveUISettingsToStorage(
      settingsArea,
      settingsId,
      updatedSettings,
      () => {
        this.saveUISettingsToState(settingsArea, settingsId, updatedSettings);
      }
    );
  };

  handleModuleMinimize = () => {
    try {
      this.toggleModuleExpansion(true);
    } catch (err) {
      ExceptionsHandler.ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  handleModuleExpand = () => {
    try {
      this.toggleModuleExpansion(false);
    } catch (err) {
      ExceptionsHandler.ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  componentDidMount = () => {
    const { isFunction, isObject } = validator;

    if (isFunction(this.verifyChildProps)) {
      this.verifyChildProps();
    }

    /*
            Every module can set their own settings independent from other modules. E.g. Module A may be minimized
            while Module B is not, and so forth.

            This can be done by inserting a settings object into the modules. If the settings object
            is found, it will be added to the module's state (doing it this way keeps us from constantly verifying
            the other variables in the state).
        */

    /*
            A module may also need to run its own special tasks immediately after mount. To do this, add
            childComponentDidMount() into the module, which will be executed if it exists
        */

    if (isFunction(this.childComponentDidMount)) {
      this.childComponentDidMount();
    }

    this.verifyProps();
    this.verifyState();
  };

  renderHeader = () => {};

  renderBody = () => {};

  verifyProps = () => {
    const { id } = this.props;

    const { isString, isObject } = validator;

    if (!isString(id)) {
      throw ExceptionsHandler.ValidatorError("module-verifyProps-107");
    }

    if (!isObject(this.staticPreset)) {
      throw ExceptionsHandler.ValidatorError("module-verifyProps-108");
    }
  };

  verifyState = () => {
    // Check state
    const { isObject } = validator;

    if (isObject(this.state)) {
    } else {
      throw ExceptionsHandler.ValidatorError("module-verifyProps-109");
    }
  };

  constructor(props, context) {
    super(props, context);
    /*
            A module may need to run its own special tasks before being mounted. To do this, add
            childComponentWillMount() into the module, which will be executed if it exists
        */
    const { isFunction } = validator;

    if (isFunction(this.childComponentWillMount)) {
      this.childComponentWillMount();
    }
  }

  determineContainerProperties = () => {
    const { uiSettings } = this.state;
    const { isBoolean } = validator;

    let determinedProperties = {};

    if (
      uiSettings &&
      uiSettings["modulecontainer"] &&
      uiSettings["modulecontainer"]["properties"]
    ) {
      // Preset various properties, or let them be inherited from current state.abs
      if (!isBoolean(uiSettings["modulecontainer"]["properties"].minimized)) {
        determinedProperties.minimized = true;
      } else {
        determinedProperties.minimized =
          uiSettings["modulecontainer"]["properties"].minimized;
      }
    } else {
      determinedProperties.minimized = false;
    }

    return determinedProperties;
  };

  render = () => {
    const containerProperties = this.determineContainerProperties();

    return (
      <div
        id={this.staticPreset.moduleId}
        droppable="true"
        className={"tabeon-module-container col-12"}
      >
        <div
          id={"tabeon-module-id-" + this.props.id}
          className={"tabeon-module"}
        >
          <div className="row tabeon-module-header" draggable="true">
            <div className="col-12">
              <div
                className={
                  containerProperties.minimized === true
                    ? "row tabeon-module-header-column-wrapper tabeon-no-border"
                    : "row tabeon-module-header-column-wrapper"
                }
              >
                <div className="col-8">
                  <div className="float-left">
                    <h5>{this.staticPreset.moduleTitle}</h5>
                  </div>
                </div>
                <div className="col-4 tabeon-module-header-control">
                  <button
                    onClick={(e) =>
                      containerProperties.minimized === true
                        ? this.handleModuleExpand(e)
                        : this.handleModuleMinimize(e)
                    }
                    className="btn shadow-none tabeon-module-header-control-button"
                  >
                    <span
                      className={
                        containerProperties.minimized === true
                          ? "fas fa-chevron-down"
                          : "fas fa-chevron-up"
                      }
                    ></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              containerProperties.minimized === true
                ? "row tabeon-module-body tabeon-hidden"
                : "row tabeon-module-body tabeon-inline-block"
            }
            draggable="false"
          >
            <div className="col-12">{this.renderBody()}</div>
          </div>
          {typeof this.renderFooter === "function" &&
            this.renderFooter() !== null && (
              <div
                className={
                  containerProperties.minimized === true
                    ? "row tabeon-module-footer tabeon-hidden"
                    : "row tabeon-module-footer  tabeon-inline-block"
                }
                draggable="false"
              >
                <div className="col-12">{this.renderFooter()}</div>
              </div>
            )}
        </div>
      </div>
    );
  };
}

Module.propTypes = {
  onDragOver: PropTypes.func,
  onDrop: PropTypes.func,
  onDragStart: PropTypes.func,
  //  onRaiseToModal: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default Module;
