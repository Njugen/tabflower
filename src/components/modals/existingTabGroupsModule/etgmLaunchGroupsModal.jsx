import React, { Fragment } from "react";
import Modal from '../modal';
import { sendToBackground } from './../../../services/webextension/APIBridge';
import { PropTypes } from 'prop-types';
import { ValidatorError, ErrorHandler } from './../../utils/exceptionsAndHandler';
import * as validator from './../../utils/inputValidators'

class ETGMLaunchGroupsModal extends Modal {
    verifyChildProps = () => {
        const { isString } = validator;
        const { groupId } = this.props.data.params;

        if(!isString(groupId)){ throw ValidatorError("ETGMLaunchGroupsModal-102"); }
    }

    saveModalHandler = (callback) => {
        try {
            const { isFunction } = validator;

            if(isFunction(callback)){
                this.clearModalData(callback(this.props.data.params));
            } else {
                throw ValidatorError("ETGMLaunchGroupsModal-101");
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

    manyTabsDetected = (numberOfWindows, numberOfTabs) => {
        return (
            <p>
                Warning: You are about to launch a group consisting of 4 windows and 120 tabs. This might stress your computer down in the long run
            </p>
        );
    }

    launchOptions = () => {
        return (
            <Fragment>
                <label><input type="checkbox" /> Close all currently opened tabs and windows</label>
                <label><input type="checkbox" /> Automatically close all unresponsive tabs after launching the group</label>
                <label><input type="checkbox" /> Save all selected options and do not show this message again</label>
            </Fragment>
        );
    }

    renderModalBody(){
        return (
            <Fragment>
                {this.manyTabsDetected()}
                {this.launchOptions()}
                
            </Fragment>
        );    
    }

    renderModalHeader(){
        
        return "Confirm launch of selected tabs";    
    }
}

export default ETGMLaunchGroupsModal;