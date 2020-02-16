import React, { Component, createRef } from "react";
import * as validator from './../utils/inputValidators';
import { ValidatorError, ErrorHandler } from '../utils/exceptionsAndHandler';
import { PropTypes } from 'prop-types';


/*
    The Modal component

    This class represents the Modal (also known as popup) and renders its JSX/HTML
    into the DOM at mount. It also consists of - and triggers - basic features such as fadein/fadeout as well
    as execution of bound functions (if any) from the component which calls the modal.

    The contents (the graphical render/user interface) of this class is empty. To use a modal with inserted contents, 
    create a child class inheriting from this component, then import it into src/App.js. The new class will inherit all 
    the basics written in Modal class, including its rendered 
user interface. Example:

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
    /*
        The modal state consists of information to be passed to
        other components. E.g. 
        
        state = {
            typeOfInformation: {}
        }

        "typeOfInformation" could be renamed to e.g. "tabGroupDetails", "firefighters" or any other
        name which represents the stored information.

        All UI related information (data passed to the state only for the purpose of re-rendering the component) should
        be stored in the ui object. Like this:

        state = {
            typeOfInformation: {},
            ui: { isHidden: false, ... }
        }
    */
    state = {
       ui: {}
    }

    raiseToErrorOverlay = (data) => {
        /*
            Parameters: 
            -   data (object, containing whatever data that we want the modal to processs. Mandatory)

            Inform the App component to launch a modal (popup), by raising the data provided
            in this function's parameter. The data parameter will travel through the following components:

                Module (any module, this module) > View (any view: this view) > RouteList > App

            All components in this chain will have access to the information raised.
        */

        const { onRaiseToErrorOverlay } = this.props;

        this.dismissModalHandler();

        setTimeout(() => {
                if(typeof onRaiseToErrorOverlay === "function"){
                    onRaiseToErrorOverlay(data);
                }
            },
            1000
        );
    }

    fadeIn = () => {
        /*
            Fading in the modal by accessing its tag by react ref (https://reactjs.org/docs/refs-and-the-dom.html).
            Check the CSS set in src/styles/tabeon/style.css
        */

        const { isObject } = validator;
 
        try {
            if(isObject(this.modalRef) && isObject(this.modalRef.current)){
                let modal = this.modalRef.current;
                
                if(isObject(modal.style)){
                    modal.style.opacity = 1;
                    modal.style.zIndex = 10000;

                } else {
                    throw new ValidatorError("mp-fadeIn-101");
                }
            } else {
                throw new ValidatorError("mp-fadeIn-102");
            }
            
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay); 
        }
    }

    fadeOut = () => {
        /*
            Fading out the modal by accessing its tag by react ref (https://reactjs.org/docs/refs-and-the-dom.html).
            Check the CSS set under #tabeonModal in src/styles/tabeon/style.css
        */
       const { isObject } = validator;
       
        try {
            if(isObject(this.modalRef) && isObject(this.modalRef.current)){
     
                let modal = this.modalRef.current;

                if(isObject(modal.style)){
                    modal.style.opacity = 0;
                    setTimeout(() => {
                        modal.style.zIndex = 0;
                    }, 500) 
                } else {
                    throw new ValidatorError("mp-fadeOut-101")
                }
            } else {
                throw new ValidatorError("mp-fadeout-102")
            }
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay); 
        }
    }

    clearModalData = (callback) => {
        /*
            This function removes all data from the modal's state.
            
            Parameter:
            - callback (function, optional: can be used to execute more functions after the modal has faded out and dismissed)
        */
        try {
            const { onDismiss: onDismissModal } = this.props;

            this.setState({ }, () => {
                this.fadeOut();
                onDismissModal();

                if(typeof callback === "function"){
                    callback();
                }
            });
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay); 
        }
    }

    componentDidMount = () => {
        /*
            When a modal is rendered into the DOM, wait 100ms before fading in.
            Apparently, the fade in does not work properly (resulting in immediate visibility of the component) without
            the timeout.
        */
        JSON.parse({})
        setTimeout(() => {
            this.fadeIn();
        }, 100)
      
        if(this.childComponentDidMount){
            this.childComponentDidMount();
        }
    };

    componentWillMount = () => {
        /*
            Before the modal is mounted (meaning render() is executed), set modalRef
            to provide access to the modal container in the DOM (using this.modalRef.current).

            <div ref={this.modalRef} className="modal" id="tabeonModal">
        */
         //JSON.parse({})
        this.modalRef = createRef();
    }

    componentDidUpdate = (prevProps, prevState) => {
        /*
            Fade in the modal component if the props changes (this is meant to check props.data, which are
            bound to change as data raised by these modals will always differ)
        */

        if(prevProps !== this.props){
            setTimeout(() => {
                this.fadeIn();
            }, 100)
        }
    }

    executePropsAction = (data) => {
        /*
            The executePropsAction function

            This function is automatically triggered when the user clicks the #modal-save button. This function
            triggers this.props.data.action, which is a props variable with a bound function raised by an outside component calling
            the modal.

            The point is to give the caller component the opportunity to execute its internal functions based on what
            the user does in the modal. This is useful if the user needs to confirm e.g. data saving, money transaction, identity verification etc.

            Parameters:
            - data (optional, any datatype: data passed from the modal to the caller component)
        */

        try {
            data = data || null;
            
            if(this.props && this.props.data && typeof this.props.data.action == "function"){
                this.props.data.action(data);
            }
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay); 
        }

        /*
            If there is no function in the this.props.data.action, nothing will happen beyond this point.
        */
    }

    saveToState = (key, value, area, callback) => {
        try {
            if(typeof area === "string"){
                let newInput = this.state;
                
                if(typeof newInput[area] !== "object"){
                    newInput[area] = {}
                }

                newInput[area][key] = value;

                this.setState(newInput, () => {
                    if(typeof callback === "function"){
                        callback();
                    }
                })
            }
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay); 
        }
    }


    render = () => {
        /*
            Rendering of the modal's user interface

            This render is a copy-paste of Bootstrap's modal feature, exluding jQuery.
            The fadein/fadeout feature is instead replaced with relevant code written
            in this class.

            Main methods/functions to be aware of: 

            - renderModalHeadline()
            - renderModalContents()
            - dismissModalHandler()
            - saveDataHandler()

            These functions add contents and functionalities to the modal's user interface. 
            Add these to the Modal child classes to give them necessary features.
        */

        return (
            <div ref={this.modalRef} className="modal" id="tabeonModal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="tabeonModalLabel">
                                {typeof this.renderModalHeader === "function" &&
                                    this.renderModalHeader()
                                }
                            </h5>
                            {typeof this.dismissModalHandler === "function" &&
                                <button type="button" className="close" onClick={() => this.dismissModalHandler()}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            }   
                        </div>
                        <div className="modal-body">
                            {typeof this.renderModalBody === "function" &&
                                this.renderModalBody()
                            }
                        </div>
                        <div className="modal-footer">
                            {typeof this.dismissModalHandler === "function" &&
                                <button type="button" id="modal-dismiss" className="btn btn-secondary" onClick={() => this.dismissModalHandler()}>Close</button>
                            }
                            {typeof this.saveModalHandler === "function" &&
                                <button type="button" id="modal-save" className="btn btn-tabeon"  onClick={() => this.saveModalHandler((data) => { this.executePropsAction(data)})}>Save changes</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    data: PropTypes.object,
    onRaiseToErrorOverlay: PropTypes.func,
    onDismiss: PropTypes.func
}

export default Modal;