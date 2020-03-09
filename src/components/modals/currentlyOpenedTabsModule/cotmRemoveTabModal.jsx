import React, { Fragment } from "react";
import Modal from '../modal';
import { ValidatorError, ErrorHandler } from './../../utils/exceptionsAndHandler';
import * as validator from './../../utils/inputValidators'

class COTMRemoveTabModal extends Modal {
    verifyChildProps = () => {
        const { isObject, isNumber, isString } = validator;
        const { tabInfo } = this.props.data.params;

        if(isObject(tabInfo)){ 
            if(!isNumber(tabInfo.id)){
                throw new ValidatorError("COTMRemoveTabModal-101");
            }

            if(!isString(tabInfo.title)){
                throw new ValidatorError("COTMRemoveTabModal-104");
            }
        } else {
            throw new ValidatorError("COTMRemoveTabModal-102");
        }
    }


    saveModalHandler = (callback) => {
        try {
            const { isFunction } = validator;

            if(isFunction(callback)){
                this.clearModalData(callback(this.state));
            } else {
                throw new ValidatorError("COTMRemoveTabModal-103");
            }
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

    dismissModalHandler = () => {
        try{
            this.clearModalData();
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

    childComponentDidMount = () => {
        const { isObject} = validator;
        const data = this.props.data.params.tabInfo;

        if(isObject(data)){ 
            this.setState(
                { data }
            )
        } else {
            throw new ValidatorError("COTMRemoveTabModal-102");
        }
        
    }

    renderModalBody(){
        const { title } = this.props.data.params.tabInfo;

        return (
            <Fragment>
                <p>
                    You are about to close the tab <strong>{ title }</strong>. All ongoing activities will be interrupted and possibly lost.
                </p>
                <p>
                    Are you sure you want to proceed?
                </p>
                <p className="small">
                    You may reopen this tab through the browser's history feature (presuming you have it activated).
                </p>
            </Fragment>
        );    
    }

    renderModalHeader(){
        return "Close Tab";    
    }
}

export default COTMRemoveTabModal;