import React, { Component, Fragment } from "react";
import * as validator from "../../../utils/inputValidators";
import TBTextInput from "./../../../utils/form/tbTextInput";
import TBTextArea from "./../../../utils/form/tbTextArea";
import TBCheckBox from "./../../../utils/form/tbCheckbox";
import TBWindowListInput from "./../../../utils/form/tbWindowListInput";
import { ValidatorError } from "./../../../utils/exceptionsAndHandler";

export default class BodyContents extends Component {
  render() {
    const { isObject } = validator;
    const { data, fieldErrors, onChange, tabGroupDetails } = this.props;

    console.log("VITAMIN", data);
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
              <TBWindowListInput
                windowCollection={tabGroupDetails.windowCollection || []}
                type={type}
                warning={windowErr || null}
                onModifyList={onChange}
              />
            )}
          </Fragment>
        );
      } else {
        return ValidatorError("ETGMCreateNewGroupModal-135").message;
      }
    } else {
      return ValidatorError("ETGMCreateNewGroupModal-136").message;
    }
  }
}
