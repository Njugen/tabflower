import React, { Fragment } from "react";
import { PropTypes } from 'prop-types';
import { ValidatorError, ErrorHandler } from './../../utils/exceptionsAndHandler';
import * as validator from './../../utils/inputValidators'
import Modal from '../modal';


class COTMRemoveUnresponsiveTabs extends Modal {
    // This modal has no child props

    saveModalHandler = (callback) => {
        try {
            const { isFunction } = validator;

            if(isFunction(callback)){
                this.clearModalData(callback(this.state));
            } else {
                throw new ValidatorError("COTMRemoveUnresponsiveTabs-101");
            }
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

    dismissModalHandler = () => {
        try {
            this.clearModalData();
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

    renderModalBody(){
        return (
            <Fragment>
                <p>Go through all opened tabs and remove them from the list</p>
                
            </Fragment>
        );    
    }

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