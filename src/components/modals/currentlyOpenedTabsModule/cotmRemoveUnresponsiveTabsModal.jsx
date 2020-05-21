import React, { Fragment } from "react";
import { PropTypes } from 'prop-types';
import { ValidatorError, ErrorHandler } from './../../utils/exceptionsAndHandler';
import * as validator from './../../utils/inputValidators'
import Modal from '../modal';


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

            if(isFunction(callback)){
                this.clearModalData(callback(this.state));
            } else {
                throw ValidatorError("COTMRemoveUnresponsiveTabs-101");
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
        try {
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
            <p>Go through all opened tabs and remove them from the list</p>
        );    
    }

    /*
        renderModalHeader()

        Render the headline string of this modal
    */
    renderModalHeader(){
        
        return "Close unresponsive tabs";    
    }
}

COTMRemoveUnresponsiveTabs.propTypes = {
    data: PropTypes.shape({
            params: PropTypes.object.isRequired
    }),
    onRaiseToErrorOverlay: PropTypes.func.isRequired,
    onDismiss: PropTypes.func.isRequired
}

export default COTMRemoveUnresponsiveTabs;