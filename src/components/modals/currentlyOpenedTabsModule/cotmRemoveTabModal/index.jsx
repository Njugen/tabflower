import React from "react";
import Modal from "../../modal";
import * as ExceptionsHandler from "../../../utils/exceptionsAndHandler";
import * as validator from "../../../utils/inputValidators";
import { PropTypes } from "prop-types";
import HeaderContents from "./headerContents";
import BodyContents from "./bodyContents";
import FooterContents from "./footerContents";

class COTMRemoveTabModal extends Modal {
  /*
        verifyChildProps()
 
        verifyChildProps is run automatically at mount. If necessary, 
        verify data provided by props (this.props) using this function 
        (data which is used exclusively by this modal component, and not used in common 
        by other modal components). 
    */

  verifyChildProps = () => {
    const { isObject, isNumber, isString } = validator;
    const { data } = this.props;

    if (isObject(data) && isObject(data.params)) {
      const { tabInfo } = data.params;

      if (isObject(tabInfo)) {
        if (!isNumber(tabInfo.id)) {
          throw ExceptionsHandler.ValidatorError("COTMRemoveTabModal-101");
        }

        if (!isString(tabInfo.title)) {
          throw ExceptionsHandler.ValidatorError("COTMRemoveTabModal-104");
        }
      } else {
        throw ExceptionsHandler.ValidatorError("COTMRemoveTabModal-102");
      }
    } else {
      throw ExceptionsHandler.ValidatorError("COTMRemoveTabModal-105");
    }
  };

  /*
        childComponentDidMount()

        Set tab info to modal state
    */

  childComponentDidMount = () => {
    try {
      const { isObject } = validator;
      const { data } = this.props;

      if (isObject(data) && isObject(data.params)) {
        const { tabInfo } = data.params;

        if (isObject(tabInfo)) {
          const data = tabInfo;

          this.setState({ data });
        } else {
          throw ExceptionsHandler.ValidatorError("COTMRemoveTabModal-102");
        }
      } else {
        throw ExceptionsHandler.ValidatorError("COTMRemoveTabModal-105");
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
        throw ExceptionsHandler.ValidatorError("COTMRemoveTabModal-103");
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

COTMRemoveTabModal.propTypes = {
  data: PropTypes.shape({
    params: PropTypes.shape({
      tabInfo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
  // onRaiseToErrorOverlay: PropTypes.func.isRequired,
  //  onDismiss: PropTypes.func.isRequired
};

export default COTMRemoveTabModal;
