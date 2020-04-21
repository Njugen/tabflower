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
    the basics written in Modal class, including its rendered import { ValidatorError } from './../utils/exceptionsAndHandler';
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
        be stored in the ui object. Similarly, any form field errors in the modal should be stored in the fieldErrors object. 
        Like this:

        state = {
            typeOfInformation: {},
            ui: { isHidden: false, ... },
            fieldErrors: { field1: "error", ... }
        }
    */
    state = {
       ui: {},
       fieldErrors: {}
    }

    constructor(props){
        super(props);
        this.verifyProps();
    }

    saveFieldErrorsToState = (errors) => {
        /*
            saveFieldErrorsToState()

            Parameters:
            - errors (object, containing the field errors)

            Save input field errors to component state. (for use in
            e.g. alert boxes or notifying the user based on the state variables alone) 
            
        */
        this.setState({
            fieldErrors: errors || {}
        })
    }

    raiseToErrorOverlay = (err) => {

        /*
            Parameters: 
            -   err (object, containing whatever error (1 error) that we want the modal to processs. Mandatory)

            Inform the App component to launch a modal (popup), by raising the error data provided
            in this function's parameter. The parameter will travel through the following components:

            This Modal > Module (any module, this module) > View (any view: this view) > RouteList > App

            All components in this chain will have access to the information raised.
        */

        const { onRaiseToErrorOverlay } = this.props;

        this.dismissModalHandler();

        setTimeout(() => {
                if(typeof onRaiseToErrorOverlay === "function"){
                    onRaiseToErrorOverlay(err);
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
 
        try {
            const { isObject } = validator;
    
            if(isObject(this.modalRef) && isObject(this.modalRef.current)){
                let modal = this.modalRef.current;
                
                if(isObject(modal.style)){
                    modal.style.opacity = 1;
                    modal.style.zIndex = 10000;

                } else {
                    throw ValidatorError("mp-fadeIn-101");
                }
            } else {
                throw ValidatorError("mp-fadeIn-102");
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
                    throw ValidatorError("mp-fadeOut-101")
                }
            } else {
                throw ValidatorError("mp-fadeOut-102")
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
            const { isUndefined, isFunction } = validator;

            this.setState({ }, () => {
                this.fadeOut();
                onDismissModal();

                if(!isUndefined(callback)){
                    if(isFunction(callback)){
                        callback();
                    } else {
                        throw ValidatorError("mp-clearModalData-103")
                    }
                }
            });
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay); 
        }
    }

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
        const modalDialogueBox = modalWrapper.getElementsByClassName("modal-dialog")[0];

        modalDialogueBox.style.marginTop = -window.scrollY + 100 + modalDialogueBox.offsetHeight + "px";
    }

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
    }

    componentWillUnmount = () => {
        // The scroll event and the behaviour it follows are not needed when the user dismisses the modal. Therefore, it should be removed.
        
        this.handleOverflow("auto", "auto");
        document.removeEventListener("scroll", this.scrollHandler);
    }

    componentDidMount = () => {
       const { isFunction } = validator;
        
        /*
            When a modal is rendered into the DOM, wait 100ms before fading in.
            Apparently, the fade in does not work properly (resulting in immediate visibility of the component) without
            the timeout.
        */
       
        setTimeout(() => {
            this.fadeIn();
        }, 100);

        /*
            Verify props for each individual child modal, if that modal has any props and a verifyChildProps()
            function to its disposal
        */
        if(isFunction(this.verifyChildProps)){
            this.verifyChildProps();
        }

        this.handleOverflow("hidden", "auto");

        /*
            This event listener prevents the modal from following the user when he scrolls vertically. 
        */

        document.addEventListener("scroll", this.scrollHandler);


        
        /*
            Execute certain features belonging to each individual child modal, when mounting that modal and
            if a childComponentDidMount() function is defined in that modal class.
        */
        if(isFunction(this.childComponentDidMount)){
            this.childComponentDidMount();
        }
        
    };

    componentWillMount = () => {
        /*
            Before the modal is mounted (meaning render() is executed), set modalRef
            to provide access to the modal container in the DOM (using this.modalRef.current).

            <div ref={this.modalRef} className="modal" id="tabeonModal">
        */
      
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
        

            [Example]:
            
            In the /src/components/modules/existingTabGroups.jsx module, we launch a modal by running this
        
            - this.raiseToModal({ 
                id: "etgmremovegroupsmodal", 
                params: {groupId: group.groupId, groupName: group.tabGroupName}, 
                action: this.removeTabGroups.bind(this) })}
            
            Where the function stored in the "action" key gets called whenever the user clicks a button with the id "modal-save" located
            in the launched modal.
        */

        try {
            data = data || null;

            if(this.props && this.props.data){
                if(typeof this.props.data.action === "function"){
                    this.props.data.action(data);
                } else if(typeof this.props.data.action !== "undefined"){
                    throw ValidatorError("mp-propsAction-101")
                }
            }
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay); 
        }

        /*
            If there is no function in the this.props.data.action, nothing will happen beyond this point.
        */
    }

    saveToState = (key, value, area, callback) => {
        /*
            The saveToState function

            This function saves information to a categorized/area section of the state. The
            state for a modal may be used to store feature related data or simply have
            information onhold to be passed. However, to avoid clutter, use this
            function to store data in separate sections if necessary. 

            E.g. 
            state = {
                ui: { key1: value1 }
                dataOnHold: {key2: null}
                AnotherArea: {key3: null}
            }

            instead of:
            
            state = {
                key1: null, key2: null, key3: null ...
            }

            Parameters:
            - key (string): A label representing the data to be stored
            - value (anything, but not undefined): A value paired with the key
            - area (string): Where in the state to store the value
            - callback (function, optional): Function to execute once the data has been stored 
        */
        try {
            const { isString, isUndefined, isFunction } = validator;
            
            if(isString(area)){
                if(isUndefined(value)){
                    throw ValidatorError("mp-saveToState-104") 
                }

                if(!isString(key)){
                    throw ValidatorError("mp-saveToState-105") 
                }

                let newInput = this.state;
                
                if(typeof newInput[area] !== "object"){
                    newInput[area] = {}
                }

                newInput[area][key] = value;

                this.setState(newInput, () => {
                    if(!isUndefined(callback)){
                        if(isFunction(callback)){
                            callback();
                        } else {
                            throw ValidatorError("mp-saveToState-106") 
                        }
                    }
                })
            } else {
                throw ValidatorError("mp-saveToState-107")
            }
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay); 
        }
    }

    verifyProps = () => {
        /*
            verifyProps
            
            All modals need to have a mandatory set of props:
            - onDismiss (function), function for triggering a function when modal is dimissed
            - onRaiseToErrorOverlay (function), function for passing information to the graphical UI if something goes wrong
            - data (object), object containing modal id, optional save function, and data parameters of possible existing values 

            A single modal can, of course have its own unique props that do not exist in other modals. These
            may be checked by adding a verifyChildProps function to that modal class.
            
            The data.params object should also be verified for each individual modal. Do this using
            the verifyChildProps function.
        */
       
        const { onDismiss, onRaiseToErrorOverlay, data } = this.props;
        const { isFunction, isObject } = validator;

        if(!isFunction(onDismiss)){ throw ValidatorError("mp-verifyProps-101"); }
        if(!isFunction(onRaiseToErrorOverlay)){ throw ValidatorError("mp-verifyProps-102"); }
        if(!isObject(data)){ throw ValidatorError("mp-verifyProps-103"); } else {
            if(!isObject(data.params)){ throw ValidatorError("mp-verifyProps-104"); }
        }
       
        if(isObject(this.state)){
            const { ui, fieldErrors } = this.state;

            if(!isObject(ui)){ throw ValidatorError("mp-verifyProps-106"); }
            if(!isObject(fieldErrors)){ throw ValidatorError("mp-verifyProps-107"); }
        } else {
            throw ValidatorError("mp-verifyProps-105");
        }
    }

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
    data: PropTypes.shape({
        params: PropTypes.object.isRequired
    }),
    onRaiseToErrorOverlay: PropTypes.func,
    onDismiss: PropTypes.func
}

export default Modal;