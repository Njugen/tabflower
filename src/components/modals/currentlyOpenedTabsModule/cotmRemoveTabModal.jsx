import React, { Fragment } from "react";
import Modal from '../modal';
import { ValidatorError, ErrorHandler } from './../../utils/exceptionsAndHandler';
import * as validator from './../../utils/inputValidators'
import { PropTypes } from 'prop-types';

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
        const { tabInfo } = this.props.data.params;

        if(isObject(tabInfo)){ 
            if(!isNumber(tabInfo.id)){
                throw ValidatorError("COTMRemoveTabModal-101");
            }

            if(!isString(tabInfo.title)){
                throw ValidatorError("COTMRemoveTabModal-104");
            }
        } else {
            throw ValidatorError("COTMRemoveTabModal-102");
        }
    }

    /*
        childComponentDidMount()

        Set tab info to modal state
    */

    childComponentDidMount = () => {
        try {
            const { isObject} = validator;
            
            const data = this.props.data.params.tabInfo;

            if(isObject(data)){ 
                this.setState(
                    { data }
                )
            } else {
                throw ValidatorError("COTMRemoveTabModal-102");
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
                throw ValidatorError("COTMRemoveTabModal-103");
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
        try {
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
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

    /*
        renderModalHeadery()

        Render the headline string of this modal
    */

    renderModalHeader(){
        return "Close Tab";    
    }
}

COTMRemoveTabModal.propTypes = {
    data: PropTypes.shape({
        params: PropTypes.shape({
            tabInfo: PropTypes.shape({
                id: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired
            })
        })
    }),
    onRaiseToErrorOverlay: PropTypes.func.isRequired,
    onDismiss: PropTypes.func.isRequired
}

export default COTMRemoveTabModal;