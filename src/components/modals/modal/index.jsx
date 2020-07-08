import React, { Component, createRef } from "react";
import * as validator from "../../utils/inputValidators";
import * as ExceptionsHandler from "../../utils/exceptionsAndHandler";
import PropTypes from "prop-types";
import AppContext from "../../contexts/AppContextProvider";
import HeaderWrapper from "./headerWrapper";
import BodyWrapper from "./bodyWrapper";
import FooterWrapper from "./footerWrapper";

/*
    The Modal component

    This class represents the Modal (also known as popup) and renders its JSX/HTML
    into the DOM at mount. 

    The contents (the graphical render/user interface) of this class is empty. To use a modal with inserted contents, 
    create a child class inheriting from this component, then import it into src/App.js. The new class will inherit all 
    the basics written in Modal class

    modalForAPurpose.jsx:
    class ModalForAPurpose extends Modal {
        renderModalHeadline(){ return "Modal For a Purpose" }
        ... Read more about inserting contents into modal below ...
    }

    modalForAnotherPurpose.jsx:
    class ModalForAnotherPurpose extends Modal {
        renderModalHeadline(){ return "Modal For Another Purpose" }
        ... Read more about inserting contents into modal below ...
    }


    Per default (at page launch), the Modal component - and all components inheriting from it - are hidden by CSS opacity set to 0.
*/

class Modal extends Component {
  static contextType = AppContext;
  /*
        The modal state consists of information to be passed to
        other components. E.g. 
        
        state = {
            typeOfInformation: {}
        }

        "typeOfInformation" could be renamed to e.g. "tabGroupDetails", "firefighters" or any other
        name which represents the stored information.

        All UI related information (data passed to the state only for the purpose of re-rendering the component) should
        be stored in the ui object. Similarly, any form field errors in the modal should be stored in the fieldErrors object. 
        Like this:

        state = {
            typeOfInformation: {},
            ui: { isHidden: false, ... },
            fieldErrors: { field1: "error", ... }
        }
    */
  state = {
    fieldErrors: {},
  };

  sendToErrorOverlay = this.context.sendToErrorOverlay;

  fadeIn = () => {
    /*
            Fading in the modal by accessing its tag by react ref (https://reactjs.org/docs/refs-and-the-dom.html).
            Check the CSS set in src/styles/tabeon/style.css
        */

    try {
      const { isObject } = validator;

      if (
        !isObject(this.modalRef) ||
        (isObject(this.modalRef) && !isObject(this.modalRef.current))
      )
        throw ExceptionsHandler.ValidatorError("mp-fadeIn-102");

      let modal = this.modalRef.current;

      if (!isObject(modal.style))
        throw ExceptionsHandler.ValidatorError("mp-fadeIn-101");

      modal.style.opacity = 1;
      modal.style.zIndex = 10000;
    } catch (err) {
      ExceptionsHandler.ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  fadeOut = () => {
    /*
            Fading out the modal by accessing its tag by react ref (https://reactjs.org/docs/refs-and-the-dom.html).
            Check the CSS set under #tabeonModal in src/styles/tabeon/style.css
        */
    const { isObject } = validator;

    try {
      if (
        !isObject(this.modalRef) ||
        (isObject(this.modalRef) && !isObject(this.modalRef.current))
      )
        throw ExceptionsHandler.ValidatorError("mp-fadeOut-102");

      let modal = this.modalRef.current;

      if (!isObject(modal.style))
        throw ExceptionsHandler.ValidatorError("mp-fadeOut-101");

      modal.style.opacity = 0;

      setTimeout(() => {
        modal.style.zIndex = 0;
      }, 500);
    } catch (err) {
      ExceptionsHandler.ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  clearModalData = (callback) => {
    /*
            This function removes all data from the modal's state.
            
            Parameter:
            - callback (function, optional: can be used to execute more functions after the modal has faded out and dismissed)
        */
    try {
      const { isUndefined, isFunction } = validator;
      const { setValueToState } = this.context;

      this.setState({}, () => {
        this.fadeOut();

        setValueToState("modal", {});

        if (!isUndefined(callback) && !isFunction(callback)) {
          throw ExceptionsHandler.ValidatorError("mp-clearModalData-103");
        }

        if (isFunction(callback)) callback();
      });
    } catch (err) {
      ExceptionsHandler.ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  /*
      dismissModalHandler()

      Triggers when the user clicks the #modal-dismiss button located in the modal's user interface. The modal's
      state will be cleared.
  */
  dismissModalHandler = () => {
    try {
      this.clearModalData();
    } catch (err) {
      ExceptionsHandler.ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  scrollHandler = (e) => {
    /*
        scrollHandler(e)

        Parameters:
        - e (event object, passed to this function by the event caller. This parameter does not need to be used unless necessary).

        This function acts as an event handler for the "scroll" event affecting the document object. 
        Use this function in the following manner (preferably during component mount and unmount):

        componentDidMount:
        - document.addEventListener("scroll", this.scrollHandler);
        
        componentWillUnmount:
        - document.removeEventListener("scroll", this.scrollHandler);
    */

    const modalWrapper = document.getElementById("tabeonModal");
    const modalDialogueBox = modalWrapper.getElementsByClassName(
      "modal-dialog"
    )[0];

    modalDialogueBox.style.marginTop =
      -window.scrollY + 100 + modalDialogueBox.offsetHeight + "px";
  };

  handleOverflow = (bodyOverflow, wrapperOverflow) => {
    /*
            handleOverflow();

            Correct the flow and scroll behaviour of the window when the modal is visible.
            Call this function in the componentDidMount() hook, and again in the componentWillUnmount() hook
            to adjust the flows to each situation.

            - bodyOverflow ("auto", "scroll" or "hidden")
            - wrapperOverflow ("auto", "scroll" or "hidden")
        */

    const modalWrapper = document.getElementById("tabeonModal");
    document.body.style.overflow = bodyOverflow;
    modalWrapper.style.overflowY = wrapperOverflow;
  };

  componentWillUnmount = () => {
    // The scroll event and the behaviour it follows are not needed when the user dismisses the modal. Therefore, it should be removed.

    this.handleOverflow("auto", "auto");
    document.removeEventListener("scroll", this.scrollHandler);
  };

  componentDidMount = () => {
    const { isFunction } = validator;

    /*
      When a modal is rendered into the DOM, wait 100ms before fading in.
    */
    setTimeout(() => {
      this.fadeIn();
    }, 100);

    if (isFunction(this.verifyChildProps)) {
      this.verifyChildProps();
    }

    this.handleOverflow("hidden", "auto");

    document.addEventListener("scroll", this.scrollHandler);

    /*
        Execute certain features belonging to each individual child modal, when mounting that modal and
        if a childComponentDidMount() function is defined in that modal class.
    */
    if (isFunction(this.childComponentDidMount)) {
      this.childComponentDidMount();
    }

    this.verifyProps();
    this.verifyState();
  };

  componentWillMount = () => {
    /*
        Before the modal is mounted (meaning render() is executed), set modalRef
        to provide access to the modal container in the DOM (using this.modalRef.current).

        <div ref={this.modalRef} className="modal" id="tabeonModal">
    */

    this.modalRef = createRef();
  };

  componentDidUpdate = (prevProps, prevState) => {
    /*
            Fade in the modal component if the props changes (this is meant to check props.data, which are
            bound to change as data raised by these modals will always differ)
        */

    if (prevProps !== this.props) {
      setTimeout(() => {
        this.fadeIn();
      }, 100);
    }
  };

  executePropsAction = (data) => {
    /*
            The executePropsAction function

            This function is automatically triggered when the user clicks the #modal-save button. This function
            triggers this.props.data.action, which is a props variable with a bound function raised by an outside component calling
            the modal.

            Parameters:
            - data (optional, any datatype: data passed from the modal to the caller component)
            
            In the /src/components/modules/existingTabGroups.jsx module, we launch a modal by running this
        
            - this.raiseToModal({ 
                id: "etgmremovegroupsmodal", 
                params: {groupId: group.groupId, groupName: group.tabGroupName}, 
                action: this.removeTabGroups.bind(this) })}
            
            Where the function stored in the "action" key gets called with the params as its input.
        */

    try {
      data = data || null;
      const { isObject } = validator;

      if (this.props && isObject(this.props.data)) {
        if (typeof this.props.data.action === "function") {
          this.props.data.action(data);
        } else if (typeof this.props.data.action !== "undefined") {
          throw ExceptionsHandler.ValidatorError("mp-propsAction-101");
        }
      } else {
      }
    } catch (err) {
      ExceptionsHandler.ErrorHandler(err, this.sendToErrorOverlay);
    }

    /*
            If there is no function in the this.props.data.action, nothing will happen beyond this point.
        */
  };

  saveToState = (key, value, area, callback) => {
    /*
            The saveToState function

            This function saves a value to a categorized/area section of the state.

            E.g. 
            state = {
                area1: { key1: value1 }
                area2: {key2: null}
                area3: {key3: null}
            }

            Parameters:
            - key (string): A label representing the data to be stored
            - value (anything, but not undefined): A value paired with the key
            - area (string): Where in the state to store the value
            - callback (function, optional): Function to execute once the data has been stored 
        */
    try {
      const { isString, isUndefined, isFunction, isObject } = validator;

      if (!isString(area))
        throw ExceptionsHandler.ValidatorError("mp-saveToState-107");
      if (isUndefined(value))
        throw ExceptionsHandler.ValidatorError("mp-saveToState-104");
      /* if (!isString(key))
        throw ExceptionsHandler.ValidatorError("mp-saveToState-105"); */

      let newInput = this.state;

      if (!isObject(newInput[area])) newInput[area] = {};

      if (isString(key)) {
        newInput[area][key] = value;
      } else if (key === null) {
        newInput[area] = value;
      }

      this.setState(newInput, () => {
        console.log("MOHAHAHA");
        if (!isUndefined(callback)) {
          if (isFunction(callback)) {
            callback();
          } else {
            throw ExceptionsHandler.ValidatorError("mp-saveToState-106");
          }
        }
      });
    } catch (err) {
      ExceptionsHandler.ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  verifyProps = () => {
    const {
      // onDismiss,
      data,
    } = this.props;
    const { isObject } = validator;

    if (!isObject(data)) {
      throw ExceptionsHandler.ValidatorError("mp-verifyProps-103");
    } else {
      if (!isObject(data.params)) {
        throw ExceptionsHandler.ValidatorError("mp-verifyProps-104");
      }
    }
  };

  verifyState = () => {
    const { isObject } = validator;

    if (isObject(this.state)) {
      const { fieldErrors } = this.state;

      if (!isObject(fieldErrors)) {
        throw ExceptionsHandler.ValidatorError("mp-verifyProps-107");
      }
    } else {
      throw ExceptionsHandler.ValidatorError("mp-verifyProps-105");
    }
  };

  renderHeaderContents = () => {
    console.log("INSECT");
  };

  renderFooterContents = () => {};

  render = () => {
    /*
            Rendering of the modal's user interface

            This render is a copy-paste of Bootstrap's modal feature, exluding jQuery.
            The fadein/fadeout feature is instead replaced with relevant code written
            in this class.

            Main methods/functions to be aware of: 

            - renderModalHeader()
            - renderModalBody()
            - dismissModalHandler()
            - saveModalHandler()

            These functions add contents and functionalities to the modal's user interface. 
            Add these to the Modal child classes to give them necessary features.
        */
    return (
      <div ref={this.modalRef} className="modal" id="tabeonModal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <HeaderWrapper
              data={this.props.data}
              Contents={this.renderHeaderContents}
              onDismiss={this.dismissModalHandler}
            />
            <BodyWrapper
              data={this.props.data}
              Contents={this.renderBodyContents}
            />
            <FooterWrapper
              data={this.props.data}
              Contents={this.renderFooterContents}
            />
          </div>
        </div>
      </div>
    );
  };
}

Modal.propTypes = {
  data: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }),
  // onRaiseToErrorOverlay: PropTypes.func,
  //  onDismiss: PropTypes.func,
};

export default Modal;
