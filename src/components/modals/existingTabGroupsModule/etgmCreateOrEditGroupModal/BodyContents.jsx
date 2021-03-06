import React, { Component, Fragment } from "react";
import * as validator from "../../../utils/inputValidators";
import TBTextInput from "./../../../utils/form/tbTextInput";
import TBTextArea from "./../../../utils/form/tbTextArea";
import TBCheckBox from "./../../../utils/form/tbCheckbox";
import TBWindowListInput from "./../../../utils/form/tbWindowListInput";
import { ValidatorError } from "./../../../utils/exceptionsAndHandler";
import TBScheduleListInput from "../../../utils/form/tbScheduleListInput";

export default class BodyContents extends Component {
  verifyProps = () => {
    const {
      isObject,
      isFunction,
      isUndefined,
      isString,
      isBoolean,
    } = validator;

    const { data, fieldErrors, onChange, tabGroupDetails } = this.props;

    if (!isObject(data)) throw ValidatorError("ETGMCreateNewGroupModal-b1");
    if (!isObject(fieldErrors))
      throw ValidatorError("ETGMCreateNewGroupModal-b2");
    if (!isFunction(onChange))
      throw ValidatorError("ETGMCreateNewGroupModal-b3");
    if (!isObject(tabGroupDetails))
      throw ValidatorError("ETGMCreateNewGroupModal-b4");

    if (isObject(data)) {
      const { params } = data;

      if (!isObject(params)) throw ValidatorError("ETGMCreateNewGroupModal-b5");

      const {
        groupName,
        groupCloseAll,
        groupCloseInactiveTabs,
        groupDescription,
        groupDontAskAgain,
        type,
      } = params;

      // If there is a groupName variable, it has to be a string (groupName is optional)
      if (!isUndefined(groupName) && !isString(groupName))
        throw ValidatorError("ETGMCreateNewGroupModal-b6");

      // If there is a groupCloseAll variable, it has to be a bool (groupCloseAll is optional)
      if (!isUndefined(groupCloseAll) && !isBoolean(groupCloseAll))
        throw ValidatorError("ETGMCreateNewGroupModal-b7");

      // If there is a groupCloseInactiveTabs variable, it has to be a bool (groupCloseInactiveTabs is optional)
      if (
        !isUndefined(groupCloseInactiveTabs) &&
        !isBoolean(groupCloseInactiveTabs)
      )
        throw ValidatorError("ETGMCreateNewGroupModal-b8");

      // If there is a groupDescription variable, it has to be a string (groupDescription is optional)
      if (!isUndefined(groupDescription) && !isString(groupDescription))
        throw ValidatorError("ETGMCreateNewGroupModal-b9");

      // If there is a groupDontAskAgain variable, it has to be a bool (groupDontAskAgain is optional)
      if (!isUndefined(groupDontAskAgain) && !isBoolean(groupDontAskAgain))
        throw ValidatorError("ETGMCreateNewGroupModal-b10");

      // If there is a type variable, it has to be a string (type is optional)
      if (!isUndefined(type) && !isString(type))
        throw ValidatorError("ETGMCreateNewGroupModal-b11");

      if (
        type !== "currently-opened" &&
        type !== "existing-group" &&
        type !== "new-group"
      )
        throw ValidatorError("ETGMCreateNewGroupModal-b12");
    }
  };

  componentDidUpdate = () => {
    this.verifyProps();
  };

  componentDidMount = () => {
    this.verifyProps();
  };

  render() {
    const { isObject } = validator;
    const { data, fieldErrors, onChange, tabGroupDetails } = this.props;

    if (isObject(data)) {
      const { params } = data;

      if (isObject(params)) {
        const {
          groupName: name,
          groupCloseAll: closeAll,
          groupCloseInactiveTabs: closeInactiveTabs,
          groupDescription: description,
          groupDontAskAgain: dontAskAgain,
          type,
        } = params;

        const {
          groupName: nameErr,
          groupDescription: descErr,
          windowCollection: windowErr,
        } = fieldErrors;

        return (
          <Fragment>
            <TBTextInput
              id="groupName"
              warning={nameErr || null}
              label="Group Name"
              maxWidth={true}
              value={name ? name : ""}
              onChange={(id, value) => onChange(id, value, "tabGroupDetails")}
            ></TBTextInput>
            <TBTextArea
              id="groupDescription"
              warning={descErr || null}
              label="Description (max 170 characters)"
              value={description ? description : ""}
              onChange={(id, value) => onChange(id, value, "tabGroupDetails")}
            ></TBTextArea>
            <TBCheckBox
              id="groupCloseAll"
              label="Close everything else before launching this tab group"
              value={closeAll && closeAll === true ? "true" : "false"}
              onToggle={(id, value) => onChange(id, value, "tabGroupDetails")}
            />
            <TBCheckBox
              id="groupCloseInactiveTabs"
              label="Automatically close all unresponsive tabs opened by this tab group"
              value={
                closeInactiveTabs && closeInactiveTabs === true
                  ? "true"
                  : "false"
              }
              onToggle={(id, value) => onChange(id, value, "tabGroupDetails")}
            />
            <TBCheckBox
              id="groupDontAskAgain"
              label="Do not ask for confirmation when launching this tab group"
              value={dontAskAgain && dontAskAgain === true ? "true" : "false"}
              onToggle={(id, value) => onChange(id, value, "tabGroupDetails")}
            />

            {tabGroupDetails && (
              <>
                <TBWindowListInput
                  windowCollection={tabGroupDetails.windowCollection || []}
                  type={type}
                  label={
                    type === "currently-opened"
                      ? "Currently opened windows and tabs"
                      : type === "existing-group"
                      ? "Edit the windows and tabs in this group"
                      : type === "new-group" &&
                        "Add windows or tabs to this new group"
                  }
                  warning={windowErr || null}
                  onModifyList={onChange}
                />
                <TBScheduleListInput
                  id="groupScheduleList"
                  scheduleCollection={tabGroupDetails.groupScheduleList || []}
                  weekdays={[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                    //  "Every Day",
                  ]}
                  onModifyList={onChange}
                />
              </>
            )}
          </Fragment>
        );
      } else {
        return ValidatorError("ETGMCreateNewGroupModal-b13");
      }
    } else {
      return ValidatorError("ETGMCreateNewGroupModal-b14");
    }
  }
}
