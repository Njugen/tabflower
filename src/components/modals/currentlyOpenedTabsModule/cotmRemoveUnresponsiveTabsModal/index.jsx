import React from "react";
import { PropTypes } from "prop-types";
import {
  ValidatorError,
  ErrorHandler,
} from "../../../utils/exceptionsAndHandler";
import * as validator from "../../../utils/inputValidators";
import Modal from "../../modal";
import HeaderContents from "./HeaderContents";
import BodyContents from "./BodyContents";
import FooterContents from "./FooterContents";

class COTMRemoveUnresponsiveTabs extends Modal {
  // This modal has no child props

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
        throw ValidatorError("COTMRemoveUnresponsiveTabs-101");
      }
    } catch (err) {
      ErrorHandler(err, this.sendToErrorOverlay);
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

COTMRemoveUnresponsiveTabs.propTypes = {
  data: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }),
  onRaiseToErrorOverlay: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default COTMRemoveUnresponsiveTabs;
