import React, { Fragment } from "react";
import Modal from '../modal';
import { PropTypes } from 'prop-types';
import * as ExceptionsHandler from '../../utils/exceptionsAndHandler';
import * as validator from '../../utils/inputValidators'

class ETGMRemoveGroupsModal extends Modal {
    verifyChildProps = () => {
        /*
            Verify the this.props.data.params object
        */
        const { isString, isUndefined, isObject } = validator;
        const { data } = this.props;

        if(isObject(data)){
            const { params } = this.props.data;

            if(isObject(params)){
                const { groupId, groupName, removeAll } = this.props.data.params;

                if(isUndefined(removeAll) || (!isUndefined(removeAll) && removeAll === false)){
                    // If the "removeAll" variable is not provided or is false, the task will be to delete a specific tab group
                    // In this case, groupId and groupName need to be provided also.
                    if(!isString(groupId) || isUndefined(groupId)){ throw ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-102"); }
                    if(!isString(groupName) || isUndefined(groupName)){ throw ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-103"); }
                } else {

                    // If this variable is provided and true, the task will be to delete all tab groups.
                    // groupId and groupName will be ignored
                    
                }
            } else {
                throw ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-104");
            }
        } else {
            throw ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-105");
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
            const { isFunction, isObject } = validator;
            const { data } = this.props;

            if(isObject(data)){
                const { params } = this.props.data;
    
                if(isObject(params)){
                    if(isFunction(callback)){
                        this.clearModalData(callback(this.props.data.params));
                    } else {
                        throw ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-101");
                    }
                } else {
                    throw ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-104");
                }
            } else {
                throw ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-105");
            }
        } catch(err){
            ExceptionsHandler.ErrorHandler(err, this.raiseToErrorOverlay);
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
            ExceptionsHandler.ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

    renderModalBody(){
        const { isObject } = validator;
        const { data } = this.props;

        if(isObject(data)){
            const { params } = this.props.data;

            if(isObject(params)){
        
                const { groupId, groupName } = this.props.data.params;

                return (
                    <Fragment>
                        {!groupId && <p>Are you sure you want to remove all existing groups? You will lose all saved windows and tabs. This cannot be undone.</p>}
                        {groupId && <p>Are you sure you want to remove this tab group? You will lose all windows and tabs saved in it. This cannot be undone.</p>}
                    </Fragment>
                );  
            } else {
                return "ETGMRemoveGroupsModal-104";
            }
        } else {
            return "ETGMRemoveGroupsModal-105";
        }
          
    }

    renderModalHeader(){
        const { isObject } = validator;
        const { data } = this.props;

        if(isObject(data)){
            const { params } = this.props.data;

            if(isObject(params)){
                const { groupId, groupName } = this.props.data.params || {};
                return !groupId ? "Confirm Removal of All Tabs" : "Confirm removal of the \"" + groupName + "\" tab group";
            }
        } else {
            
        }
        
    }
}
/*
ETGMRemoveGroupsModal.propTypes = {
    data: PropTypes.shape({
            params: PropTypes.shape({
                groupId: PropTypes.string,
                groupName: PropTypes.string
            })
    }),
    onRaiseToErrorOverlay: PropTypes.func.isRequired,
    onDismiss: PropTypes.func.isRequired
}
*/
export default ETGMRemoveGroupsModal;