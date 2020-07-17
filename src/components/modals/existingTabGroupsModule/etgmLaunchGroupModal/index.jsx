import React from "react";
import Modal from "../../modal";

import * as ExceptionsHandler from "../../../utils/exceptionsAndHandler";
import * as validator from "../../../utils/inputValidators";
import HeaderContents from "./HeaderContents";
import BodyContents from "./BodyContents";
import FooterContents from "./FooterContents";

class ETGMLaunchGroupsModal extends Modal {
  /*
        verifyChildProps()

        verifyChildProps is run automatically at mount. If necessary, 
        verify data provided by props (this.props) using this function 
        (data which is used exclusively by this modal component, and not used in common 
        by other modal components). 
    */
  verifyChildProps = () => {
    const { isString, isUndefined, isBoolean, isArray, isObject } = validator;
    const { data } = this.props;

    if (!isObject(data))
      throw ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-109");

    const { params } = data;

    if (!isObject(params))
      throw ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-108");

    const {
      groupId,
      groupName,
      groupCloseAll,
      groupCloseInactiveTabs,
      groupDescription,
      windowCollection,
    } = params;

    /*
        groupId (string, optional)

        A group id is necessary when attempting to launch a tab group. If there is no group to target,
        then throw an error
    */
    if (!isString(groupId))
      throw ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-102");

    /*
        groupName (string, optional)

        A group name is optional and if given, should always be a string.
    */

    if (!isString(groupName) && !isUndefined(groupName))
      throw ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-103");

    /*
        groupDescription (string, optional)

        A group description is optional and if given, should always be a string. 
    */
    if (!isString(groupDescription) && !isUndefined(groupDescription))
      throw ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-104");

    /*
        groupCloseAll (boolean, optional)

        This parameter is optional and if given, should always be a boolean (either true or false).
    */
    if (!isBoolean(groupCloseAll) && !isUndefined(groupCloseAll))
      throw ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-105");

    /*
        groupCloseInactiveTabs (boolean, optional)

        This parameter is optional and if given, should always be a boolean (either true or false)
    */
    if (
      !isBoolean(groupCloseInactiveTabs) &&
      !isUndefined(groupCloseInactiveTabs)
    )
      throw ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-106");

    /* 
        windowCollection (object, mandatory)

        This parameter contains windows and tabs stored into a single array. If there are no windows/tabs, this array
        is empty e.g. windowCollection = []
    */
    if (!isArray(windowCollection))
      throw ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-107");
  };

  /*
        saveModalHandler()

        Triggers when the user clicks the #modal-save button located in the modal's user interface. Once clicked
        the information located in the modal's state will be passed on to the function bound by the caller function, before
        being deleted.

        Parameters:
        - callback (function, mandatory. Triggers once the modal state has been cleared after being dismissed by the user)
    */
  saveModalHandler = (callback) => {
    try {
      const { isFunction, isObject } = validator;
      const { data } = this.props;

      if (!isObject(data))
        throw ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-109");

      const { params } = this.props.data;

      if (!isObject(params))
        throw ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-108");

      if (!isFunction(callback))
        throw ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-101");

      //this.clearModalData(callback(this.props.data.params));
      const tabGroupDetails = {
        groupId: this.props.data.params.groupId,
        windowCollection: this.props.data.params.windowCollection,
        groupName: this.props.data.params.groupName,
        groupDescription: this.props.data.params.groupDescription,
        ...this.state.tabGroupDetails,
      };

      this.clearModalData(callback(tabGroupDetails));
    } catch (err) {
      ExceptionsHandler.ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  renderBodyContents = (data) => {
    const { isObject } = validator;

    if (!isObject(data)) {
      throw ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-110");
    }

    return (
      <BodyContents
        data={data}
        onChange={(id, value, area) => this.saveToState(id, value, area)}
      />
    );
  };

  renderHeaderContents = (data) => {
    const { isObject } = validator;

    if (!isObject(data)) {
      throw ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-111");
    }

    return <HeaderContents data={data} />;
  };

  renderFooterContents = (data) => {
    const { isObject } = validator;

    if (!isObject(data)) {
      throw ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-112");
    }

    return (
      <FooterContents
        data={data}
        onConfirm={() =>
          this.saveModalHandler((response) => {
            this.executePropsAction(response);
          })
        }
        onDismiss={this.dismissModalHandler}
      />
    );
  };
}

export default ETGMLaunchGroupsModal;
