import React from "react";
import Modal from "../../modal";
import * as ExceptionsHandler from "../../../utils/exceptionsAndHandler";
import * as validator from "../../../utils/inputValidators";
import HeaderContents from "./headerContents";
import BodyContents from "./bodyContents";
import FooterContents from "./footerContents";

class COTMRemoveWindowModal extends Modal {
  /*
        verifyChildProps()

        verifyChildProps is run automatically at mount. If necessary, 
        verify data provided by props (this.props) using this function. 
    */

  verifyChildProps = () => {
    const { isObject, isNumber } = validator;
    const { data } = this.props;

    if (isObject(data) && isObject(data.params)) {
      const { windowInfo } = data.params;

      if (isObject(windowInfo)) {
        if (!isNumber(windowInfo.id)) {
          throw ExceptionsHandler.ValidatorError("COTMRemoveWindowModal-101");
        }
      } else {
        throw ExceptionsHandler.ValidatorError("COTMRemoveWindowModal-102");
      }
    } else {
      throw ExceptionsHandler.ValidatorError("COTMRemoveWindowModal-104");
    }
  };

  /*
        childComponentDidMount()

        Set window info to modal state
    */

  childComponentDidMount = () => {
    try {
      const { isObject } = validator;
      const { data } = this.props;

      if (isObject(data) && isObject(data.params)) {
        const { windowInfo } = data.params;

        if (isObject(windowInfo)) {
          const data = windowInfo;

          this.setState({ data });
        } else {
          throw ExceptionsHandler.ValidatorError("COTMRemoveWindowModal-102");
        }
      } else {
        throw ExceptionsHandler.ValidatorError("COTMRemoveWindowModal-104");
      }
    } catch (err) {
      ExceptionsHandler.ErrorHandler(err, this.sendToErrorOverlay);
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
      const { isFunction } = validator;

      if (isFunction(callback)) {
        this.clearModalData(callback(this.state));
      } else {
        throw ExceptionsHandler.ValidatorError("COTMRemoveWindowModal-103");
      }
    } catch (err) {
      ExceptionsHandler.ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  renderBodyContents = (data) => {
    return <BodyContents data={data} />;
  };

  renderHeaderContents = (data) => {
    return <HeaderContents data={data} />;
  };

  renderFooterContents = (data) => {
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

export default COTMRemoveWindowModal;
