import React, { Component } from "react";
import * as validator from "../../utils/inputValidators";
import PropTypes from "prop-types";
import AppContext from "../../contexts/AppContextProvider";
import { ValidatorError, ErrorHandler } from "../../utils/exceptionsAndHandler";

import { sendToBackground } from "../../../services/webextension/APIBridge";
import HeaderWrapper from "./headerWrapper";
import BodyWrapper from "./bodyWrapper";
import FooterWrapper from "./footerWrapper";

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
    - area (string or object, mandatory). The component or section where the targetted element is located
    - elementId (string, mandatory). The id of the targetted element
    - settings (object, mandatory). the collection of settings affecting this element
    - handleSuccess (function, optional). Called when the settings are successfully set to the state.
    - handleFail (function, optional). Called when this.setState() is not called.

    Note: If area is an object, then elementId and settings will not be used nor considered even if they are valid.
  */
  saveUISettingsToState = (
    area,
    elementId,
    settings,
    handleSuccess,
    handleFail
  ) => {
    const { isString, isObject, isFunction, isUndefined } = validator;

    const { uiSettings: uiSettingsState } = this.state;

    if (!isString(area) && !isObject(area))
      throw ValidatorError("module-verifyProps-109");
    if (!isFunction(handleSuccess) && !isUndefined(handleSuccess))
      throw ValidatorError("module-verifyProps-112");
    if (!isFunction(handleFail) && !isUndefined(handleFail))
      throw ValidatorError("module-verifyProps-113");

    let existingUISettings = {};
    let uiSettings = null;

    if (isString(area) && isString(elementId) && isObject(settings)) {
      if (!isString(elementId)) throw ValidatorError("module-verifyProps-110");
      if (!isObject(settings)) throw ValidatorError("module-verifyProps-111");

      uiSettings = uiSettingsState;

      if (isObject(uiSettingsState)) {
        if (isObject(uiSettingsState[area])) {
          if (isObject(uiSettingsState[area][elementId])) {
            existingUISettings = uiSettingsState[area][elementId];

            uiSettings[area][elementId] = {
              ...existingUISettings,
              ...settings,
            };
          } else {
            uiSettings[area][elementId] = settings;
          }
        } else {
          uiSettings[area] = {
            [elementId]: settings,
          };
        }
      } else {
        uiSettings = {
          [area]: {
            [elementId]: settings,
          },
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
          isFunction(handleSuccess) && handleSuccess();
        }
      );
    } else {
      isFunction(handleFail) && handleFail();
    }
  };

  getUISettingsFromStorage = (moduleId, handleSuccess, handleFail) => {
    const { isFunction, isObject, isString, isUndefined } = validator;

    if (!isString(moduleId)) throw ValidatorError("module-verifyProps-119");
    if (!isFunction(handleSuccess) && !isUndefined(handleSuccess))
      throw ValidatorError("module-verifyProps-120");
    if (!isFunction(handleFail) && !isUndefined(handleFail))
      throw ValidatorError("module-verifyProps-121");

    sendToBackground(
      "get-module-ui-settings",
      { moduleId },
      (successResponse) => {
        try {
          if (
            !isObject(successResponse) ||
            (isObject(successResponse) && isUndefined(successResponse.data))
          )
            throw ValidatorError("module-verifyProps-122");

          this.saveUISettingsToState(
            successResponse.data,
            undefined,
            undefined,
            () => {
              isFunction(handleSuccess) && handleSuccess(successResponse.data);
            }
          );
        } catch (err) {
          ErrorHandler(err, this.sendToErrorOverlay);
        }
      },
      (failResponse) => {
        isFunction(handleFail) && handleFail();
      }
    );
  };

  saveUISettingsToStorage = (
    area,
    elementId,
    settings,
    handleSuccess,
    handleFail
  ) => {
    try {
      /*
        Parameters:
        - area (string): the category/section of the module
        - elementId (string): the id which identifies the element this setup of settings belongs to
        - settings (object): an object containing settings for the targetted element
      */
      const { isString, isObject, isFunction, isUndefined } = validator;
      const { id } = this.props;

      if (!isString(area)) throw ValidatorError("module-verifyProps-114");
      if (!isString(elementId)) throw ValidatorError("module-verifyProps-115");
      if (!isObject(settings)) throw ValidatorError("module-verifyProps-116");
      if (!isFunction(handleSuccess) && !isUndefined(handleSuccess))
        throw ValidatorError("module-verifyProps-117");
      if (!isFunction(handleFail) && !isUndefined(handleFail))
        throw ValidatorError("module-verifyProps-118");

      if (isString(area) && isString(elementId) && isObject(settings)) {
        //const { isExpanded, isTabsCrowded } = settings;
        let newSettings = {
          meta: {
            moduleId: id,
            area: area,
            elementId,
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
      }
    } catch (err) {
      ErrorHandler(err, this.sendToErrorOverlay);
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

  componentDidMount = () => {
    const { isFunction } = validator;

    if (isFunction(this.verifyChildProps)) {
      this.verifyChildProps();
    }

    if (isFunction(this.childComponentDidMount)) {
      this.childComponentDidMount();
    }

    this.verifyProps();
    this.verifyState();
  };

  renderHeaderContents = () => {};

  renderBodyContents = () => {};

  verifyProps = () => {
    const { id, title, refresh, onRaiseToView } = this.props;

    const { isString, isNumber, isFunction, isUndefined } = validator;

    if (!isString(id)) throw ValidatorError("module-verifyProps-107");
    if (!isString(title)) throw ValidatorError("module-verifyProps-108");
    if (!isNumber(refresh) && !isUndefined(refresh))
      throw ValidatorError("module-verifyProps-127");
    if (!isFunction(onRaiseToView) && !isUndefined(onRaiseToView))
      throw ValidatorError("module-verifyProps-128");
  };

  verifyState = () => {
    // Check state
    const { isObject } = validator;

    if (isObject(this.state)) {
      const { uiSettings } = this.state;

      if (isObject(uiSettings)) {
        if (isObject(uiSettings["modulecontainer"])) {
          if (!isObject(uiSettings["modulecontainer"]["properties"])) {
            throw ValidatorError("module-verifyProps-125");
          }
        } else {
          throw ValidatorError("module-verifyProps-124");
        }
      } else {
        throw ValidatorError("module-verifyProps-123");
      }
    } else {
      throw ValidatorError("module-verifyProps-126");
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
    const { title, id } = this.props;
    console.log("RERENDER", containerProperties);
    return (
      <div
        id={id}
        droppable="true"
        className={"tabeon-module-container col-12"}
      >
        <div id={"tabeon-module-id-" + id} className={"tabeon-module"}>
          <HeaderWrapper
            title={title}
            onToggleModuleExpansion={this.toggleModuleExpansion}
            containerProperties={containerProperties}
          />
          <BodyWrapper
            Contents={this.renderBodyContents}
            containerProperties={containerProperties}
          />
          {typeof this.renderFooterContents === "function" &&
            this.renderFooterContents() !== null && (
              <FooterWrapper
                Contents={this.renderFooterContents}
                containerProperties={containerProperties}
              />
            )}
        </div>
      </div>
    );
  };
}

Module.propTypes = {
  //  onRaiseToModal: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default Module;
