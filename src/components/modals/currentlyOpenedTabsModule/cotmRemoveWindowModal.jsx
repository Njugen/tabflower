import React, { Fragment } from "react";
import Modal from '../modal';
import { ValidatorError, ErrorHandler } from './../../utils/exceptionsAndHandler';
import * as validator from './../../utils/inputValidators';

class COTMRemoveWindowModal extends Modal {
    /*
        verifyChildProps()

        verifyChildProps is run automatically at mount. If necessary, 
        verify data provided by props (this.props) using this function. 
    */

    verifyChildProps = () => {
        const { isObject, isNumber } = validator;
        const { windowInfo } = this.props.data.params;
        
        if(isObject(windowInfo)){
            if(!isNumber(windowInfo.id)){
                throw ValidatorError("COTMRemoveWindowModal-101");
            }
        } else {
            throw ValidatorError("COTMRemoveWindowModal-102");
        }
    } 

    
    /*
        childComponentDidMount()

        Set window info to modal state
    */

   childComponentDidMount = () => {
        try {
            const { isObject } = validator;
            const data = this.props.data.params.windowInfo;

            if(isObject(data)){
                this.setState(
                    { data }
                )
            } else {
                throw ValidatorError("COTMRemoveWindowModal-102");
            }
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

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

            if(isFunction(callback)){
                this.clearModalData(callback(this.state));
            } else {
                throw ValidatorError("COTMRemoveWindowModal-103");
            }
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

    /*
        dismissModalHandler()

        Triggers when the user clicks the #modal-dismiss button located in the modal's user interface. The modal's
        state will be cleared.
    */
    dismissModalHandler = () => {
        try{
            this.clearModalData();
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

    /*
        renderModalBody()

        Render the body and the contents of this particular modal
    */
    renderModalBody(){
        return (
            <Fragment>
                <p>
                    Closing this window will also close all its tabs. All ongoing activities on these web pages will be interrupted and possibly lost.
                </p>
                <p>
                    Are you sure you want to proceed?
                </p>
                <p className="small">
                    You may reopen the window with all its tabs intact from the browser's history feature (presuming you have it activated).
                </p>
            </Fragment>
        );    
    }

    /*
        renderModalHeadery()

        Render the headline string of this modal
    */
    renderModalHeader(){
        
        return "Close Window";    
    }
}

export default COTMRemoveWindowModal;