import React from "react";
import Modal from "../../modal";
import { PropTypes } from "prop-types";
import * as ExceptionsHandler from "../../../utils/exceptionsAndHandler";
import * as validator from "../../../utils/inputValidators";
import HeaderContents from "./HeaderContents";
import FooterContents from "./FooterContents";
import BodyContents from "./BodyContents";

class ETGMRemoveGroupsModal extends Modal {
  verifyChildProps = () => {
    /*
            Verify the this.props.data.params object
        */
    const { isString, isUndefined, isObject } = validator;
    const { data } = this.props;

    if (!isObject(data))
      throw ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-105");

    const { params } = data;

    if (!isObject(params))
      throw ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-104");

    const { groupId, groupName, removeAll } = params;

    if (
      isUndefined(removeAll) ||
      (!isUndefined(removeAll) && removeAll === false)
    ) {
      // If the "removeAll" variable is not provided or is false, the task will be to delete a specific tab group
      // In this case, groupId and groupName need to be provided also.
      if (!isString(groupId) || isUndefined(groupId)) {
        throw ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-102");
      }
      if (!isString(groupName) || isUndefined(groupName)) {
        throw ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-103");
      }
    } else {
      // If this variable is provided and true, the task will be to delete all tab groups.
      // groupId and groupName will be ignored
    }
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
        throw ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-105");

      const { params } = this.props.data;

      if (!isObject(params))
        throw ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-104");

      if (!isFunction(callback))
        throw ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-101");

      this.clearModalData(callback(this.props.data.params));
    } catch (err) {
      ExceptionsHandler.ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  renderBodyContents = (data) => {
    const { isObject } = validator;

    if (!isObject(data))
      throw ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-106");

    return <BodyContents data={data} />;
  };

  renderHeaderContents = (data) => {
    const { isObject } = validator;

    if (!isObject(data))
      throw ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-107");

    return <HeaderContents data={data} />;
  };

  renderFooterContents = (data) => {
    const { isObject } = validator;

    if (!isObject(data))
      throw ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-108");

    return (
      <FooterContents
        data={data}
        onDismiss={this.dismissModalHandler}
        onConfirm={() =>
          this.saveModalHandler((response) => {
            this.executePropsAction(response);
          })
        }
      />
    );
  };
}

ETGMRemoveGroupsModal.propTypes = {
  data: PropTypes.shape({
    params: PropTypes.shape({
      groupId: PropTypes.string,
      groupName: PropTypes.string,
    }),
  }),
  onRaiseToErrorOverlay: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default ETGMRemoveGroupsModal;
