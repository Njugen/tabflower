import React, { Fragment } from "react";
import Modal from "../modal";
//import { ValidatorError, ErrorHandler } from './../../utils/exceptionsAndHandler';
import * as ExceptionsHandler from "./../../utils/exceptionsAndHandler";
import * as validator from "./../../utils/inputValidators";
import { PropTypes } from "prop-types";

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

  /*
        renderBodyContents(props)

        Render the body and the contents of this particular modal
    */
  renderBodyContents(props) {
    const { data } = props;
    const { isObject, isString, isUndefined } = validator;
    console.log(props);
    if (!isUndefined(data)) {
      if (isObject(data)) {
        if (!isUndefined(data.params)) {
          if (isObject(data.params)) {
            const { tabInfo } = data.params;

            if (isObject(tabInfo)) {
              const { title } = tabInfo;

              if (isString(title)) {
                return (
                  <Fragment>
                    <p>
                      You are about to close the tab <strong>{title}</strong>.
                      All ongoing activities will be interrupted and possibly
                      lost.
                    </p>
                    <p>Are you sure you want to proceed?</p>
                    <p className="small">
                      You may reopen this tab through the browser's history
                      feature (presuming you have it activated).
                    </p>
                  </Fragment>
                );
              } else {
                if (isUndefined(title)) {
                  return "The targetted tab's title was not provided. Other info about the targetted tab might also be incorrect, therefore no contents nor settings can be modified at the moment";
                } else {
                  return "The targetted tab's title was not provided in the correct manner. Other info about the targetted tab might also be incorrect, therefore no contents nor settings can be modified at the moment";
                }
              }
            } else {
              if (isUndefined(tabInfo)) {
                return "The information about the targetted tab is missing. There are no contents nor settings to modify.";
              } else {
                return "The information about the targetted tab was provided in wrong format. Its contents and settings cannot be shown.";
              }
            }
          } else {
            return "The parameter(s) provided by the information container is invalid. The contents cannot be viewed.";
          }
        } else {
          return "The parameter(s) provided by the information container is missing. There is no contents to show.";
        }
      } else {
        return "The information related to this message is invalid. The contents cannot be viewed.";
      }
    } else {
      return "The information related to this message is missing. There is no contents to show.";
    }
  }

  /*
        renderModalHeadery()

        Render the headline string of this modal
    */

  renderHeaderContents(props) {
    return "Close Tab";
  }
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
