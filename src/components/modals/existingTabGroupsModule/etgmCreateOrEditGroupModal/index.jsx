import React from "react";
import Modal from "../../modal/index";
import { PropTypes } from "prop-types";
import * as validator from "../../../utils/inputValidators";
import HeaderContents from "./HeaderContents";

import AppContext from "./../../../contexts/AppContextProvider";
import BodyContents from "./BodyContents";
import {
  ValidatorError,
  ErrorHandler,
} from "./../../../utils/exceptionsAndHandler";
import FooterContents from "./FooterContents";

class ETGMCreateNewGroupModal extends Modal {
  static contextType = AppContext;
  /*
        verifyChildProps()

        verifyChildProps is run automatically at mount. If necessary, 
        verify data provided by props (this.props) using this function 
        (data which is used exclusively by this modal component, and not used in common 
        by other modal components). 
    */

  verifyChildProps = () => {
    /*
            Verify the this.props.data.params object
        */
    const { isBoolean, isString, isUndefined, isArray, isObject } = validator;
    const { data } = this.props;

    if (isObject(data)) {
      const { params } = data;

      if (isObject(params)) {
        const {
          windowCollection,
          groupName,
          groupCloseAll,
          groupCloseInactiveTabs,
          groupDescription,
          groupDontAskAgain,
          type,
          groupId,
        } = params;

        /*
                    type (string, mandatory)

                    A type is always required and needs to hold either of the following values:
                    - "currently-opened"
                    - "new-group"
                    - "existing-group"
                */
        if (!isString(type)) {
          throw ValidatorError("ETGMCreateNewGroupModal-114");
        } else {
          if (
            type !== "currently-opened" &&
            type !== "new-group" &&
            type !== "existing-group"
          ) {
            throw ValidatorError("ETGMCreateNewGroupModal-115");
          }
        }

        /*
            groupId (string, optional)

            A group id is optional and if given, should always be a string. If there is no
            group id, refrain from using the groupId parameter when calling this modal
        */
        if (!isString(groupId) && !isUndefined(groupId)) {
          throw ValidatorError("ETGMCreateNewGroupModal-120");
        }

        /*
            groupName (string, optional)

            A group name is optional and if given, should always be a string. If there is no
            group name, refrain from using the groupName parameter when calling this modal
        */
        if (!isString(groupName) && !isUndefined(groupName)) {
          throw ValidatorError("ETGMCreateNewGroupModal-116");
        }

        /*
            groupDescription (string, optional)

            A group description is optional and if given, should always be a string. If there is no
            group description, refrain from using the groupDescription parameter when calling this modal
        */
        if (!isString(groupDescription) && !isUndefined(groupDescription)) {
          throw ValidatorError("ETGMCreateNewGroupModal-117");
        }

        /*
            groupCloseAll (boolean, optional)

            This parameter is optional and if given, should always be a boolean (either true or false). If there is no boolean value, 
            refrain from using the groupCloseAll parameter when calling this modal
        */
        if (!isBoolean(groupCloseAll) && !isUndefined(groupCloseAll)) {
          throw ValidatorError("ETGMCreateNewGroupModal-118");
        }

        /*
            groupCloseInactiveTabs (boolean, optional)

            This parameter is optional and if given, should always be a boolean (either true or false)
        */
        if (
          !isBoolean(groupCloseInactiveTabs) &&
          !isUndefined(groupCloseInactiveTabs)
        ) {
          throw ValidatorError("ETGMCreateNewGroupModal-122");
        }

        if (!isBoolean(groupDontAskAgain) && !isUndefined(groupDontAskAgain)) {
          throw ValidatorError("ETGMCreateNewGroupModal-137");
        }

        /* 
            windowCollection (object, mandatory)

            This parameter contains windows and tabs stored into a single array. If there are no windows/tabs, this array
            is empty e.g. windowCollection = []
        */
        if (!isArray(windowCollection) && !isUndefined(windowCollection)) {
          throw ValidatorError("ETGMCreateNewGroupModal-119");
        }
      } else {
        throw ValidatorError("ETGMCreateNewGroupModal-124");
      }
    } else {
      throw ValidatorError("ETGMCreateNewGroupModal-123");
    }
  };

  /*
        saveModalHandler()

        Triggers when the user clicks the #modal-save button located in the modal's user interface.

        Parameters:
        - callback (function, mandatory. Triggers once the modal state has been cleared after being dismissed by the user)
    */
  saveModalHandler = (callback) => {
    try {
      const { isFunction, isObject, isString } = validator;
      const { data } = this.props;

      let error = {
        issue: null,
      };

      if (isObject(data)) {
        const { params } = data;

        if (isObject(params)) {
          if (isString(params.groupName)) {
            error.additionalMessage = "The tab group could not be changed";
          } else {
            error.additionalMessage = "The tab group could not be saved";
          }

          error.additionalMessage += ". Please try again.";

          if (isFunction(callback)) {
            this.validateFields(() => {
              this.clearModalData(callback(this.state.tabGroupDetails));
            });
          } else {
            error.issue = ValidatorError("ETGMCreateNewGroupModal-101");
          }
        } else {
          error.issue = ValidatorError("ETGMCreateNewGroupModal-124");
        }
      } else {
        error.issue = ValidatorError("ETGMCreateNewGroupModal-123");
      }

      if (error.issue) {
        throw error;
      }
    } catch (err) {
      ErrorHandler(err.issue, this.sendToErrorOverlay, err.additionalMessage);
    }
  };

  /*
        validateFields()

        Check through all form fields and windows + tabs of this modal form. This function runs the success() parameter
        if no errors are detected in the fields or in the listed windows/tabs.

        Parameters:
        - success (function, mandatory. Gets called when no error(s) are thrown by the validateFields() function)
    */
  validateFields = (success) => {
    try {
      const {
        isString,
        isUndefined,
        isZero,
        isObject,
        isArray,
        isFunction,
      } = validator;

      let fieldErrors = {};
      let error = {
        issue: null,
      };

      const { data } = this.props;
      const { tabGroupDetails } = this.state;

      if (isFunction(success)) {
        if (isObject(data)) {
          const { params } = data;

          if (isObject(params)) {
            if (isObject(tabGroupDetails)) {
              const {
                groupName,
                groupDescription,
                windowCollection,
              } = tabGroupDetails;

              if (isString(params.groupName)) {
                error.additionalMessage = "The tab group could not be changed";
              } else {
                error.additionalMessage = "The tab group could not be saved";
              }

              error.additionalMessage += ". Please try again.";

              if (!isString(groupName)) {
                fieldErrors.groupName =
                  "A tab group needs to be given a name or a label before it can be saved.";
              }

              if (!isString(groupDescription)) {
                fieldErrors.groupDescription =
                  "A tab group needs to be given a short description before it can be saved.";
              }

              if (
                !isArray(windowCollection) ||
                (isArray(windowCollection) &&
                  (isUndefined(windowCollection.length) ||
                    isZero(windowCollection.length)))
              ) {
                fieldErrors.windowCollection =
                  "A tab group must consist of at least one window.";
              }

              if (Object.keys(fieldErrors).length > 0) {
                this.saveToState(null, fieldErrors, "fieldErrors");
                throw fieldErrors;
              } else {
                success();
              }
            } else {
              error.issue = ValidatorError("ETGMCreateNewGroupModal-125");
            }
          } else {
            error.issue = ValidatorError("ETGMCreateNewGroupModal-124");
          }
        } else {
          error.issue = ValidatorError("ETGMCreateNewGroupModal-123");
        }
      } else {
        error.issue = ValidatorError("ETGMCreateNewGroupModal-126");
      }

      if (isString(error.issue)) {
        throw error;
      }
    } catch (err) {
      if (err.issue) {
        ErrorHandler(err.issue, this.sendToErrorOverlay, err.additionalMessage);
      } else {
        ErrorHandler(err, this.sendToErrorOverlay, err.additionalMessage);
      }
    }
  };

  /*
        setGroupId(id)

        Return the input value as group id, if the input is a string. Otherwise if an id does not exist, 
        create a brand new string and use THAT as group id.

        Parameters:
        - id (string, optional. An existing string, if such exists)
    */
  setGroupId = (id) => {
    try {
      const { isString, isUndefined } = validator;

      let groupId = "";

      if (!isUndefined(id)) {
        if (isString(id)) {
          groupId = id;
        } else {
          throw ValidatorError("ETGMCreateNewGroupModal-102");
        }
      } else {
        groupId = Math.random().toString(36).slice(2);
      }

      return groupId;
    } catch (err) {
      ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  childComponentDidMount = () => {
    try {
      const { isObject, isArray } = validator;
      const { data } = this.props;

      if (!isObject(data)) throw ValidatorError("ETGMCreateNewGroupModal-127");

      if (isObject(data) && !isObject(data.params))
        throw ValidatorError("ETGMCreateNewGroupModal-142");

      const { params } = data;
      const { windowCollection, groupId } = params;

      if (!isArray(windowCollection))
        throw ValidatorError("ETGMCreateNewGroupModal-128");

      this.saveToState("windowCollection", windowCollection, "tabGroupDetails");

      this.saveToState("groupId", this.setGroupId(groupId), "tabGroupDetails");
    } catch (err) {
      ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  renderBodyContents = (data) => {
    const { isObject } = validator;

    if (!isObject(data)) {
      throw ValidatorError("ETGMCreateNewGroupModal-139");
    }

    return (
      <BodyContents
        data={data}
        fieldErrors={this.state.fieldErrors}
        tabGroupDetails={this.state.tabGroupDetails}
        onChange={(id, value, area) => this.saveToState(id, value, area)}
      />
    );
  };

  renderHeaderContents = (data) => {
    const { isObject } = validator;

    if (!isObject(data)) {
      throw ValidatorError("ETGMCreateNewGroupModal-140");
    }

    return <HeaderContents data={data} />;
  };

  renderFooterContents = (data) => {
    const { isObject } = validator;

    if (!isObject(data)) {
      throw ValidatorError("ETGMCreateNewGroupModal-141");
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

ETGMCreateNewGroupModal.propTypes = {
  data: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string,
      groupCloseAll: PropTypes.bool,
      groupDescription: PropTypes.string,
      type: PropTypes.string.isRequired,
    }),
  }),
  onRaiseToErrorOverlay: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default ETGMCreateNewGroupModal;
