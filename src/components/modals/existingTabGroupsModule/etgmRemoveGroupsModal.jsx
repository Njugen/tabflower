import React, { Fragment } from "react";
import Modal from '../modal';
import { PropTypes } from 'prop-types';
import { ValidatorError, ErrorHandler } from './../../utils/exceptionsAndHandler';
import * as validator from './../../utils/inputValidators'

class ETGMRemoveGroupsModal extends Modal {
    verifyChildProps = () => {
        /*
            Verify the this.props.data.params object
        */
        const { isString, isUndefined } = validator;
        const { groupId, groupName, removeAll } = this.props.data.params;

        if(isUndefined(removeAll) || (!isUndefined(removeAll) && removeAll === false)){
            // If the "removeAll" variable is not provided or is false, the task will be to delete a specific tab group
            // In this case, groupId and groupName need to be provided also.
            if(!isString(groupId) && !isUndefined(groupId)){ throw ValidatorError("ETGMRemoveGroupsModal-102"); }
            if(!isString(groupName) || isUndefined(groupName)){ throw ValidatorError("ETGMRemoveGroupsModal-103"); }
        } else {
            
            
             // If this variable is provided and true, the task will be to delete all tab groups.
            // groupId and groupName will be ignored
        }
       
    }

    saveModalHandler = (callback) => {
        try {
            const { isFunction } = validator;

            if(isFunction(callback)){
                this.clearModalData(callback(this.props.data.params));
            } else {
                throw ValidatorError("ETGMRemoveGroupsModal-101");
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

    renderModalBody(){
        console.log("REMOVE GROUP ID", this.props.data.params);
        
        const { groupId } = this.props.data.params;

        return (
            <Fragment>
                {!groupId && <p>Are you sure you want to remove all existing groups? You will lose all saved windows and tabs. This cannot be undone.</p>}
                 {groupId && <p>Are you sure you want to remove this tab group? You will lose all windows and tabs saved in it. This cannot be undone.</p>}
            </Fragment>
        );    
    }

    renderModalHeader(){
        const { groupId, groupName } = this.props.data.params || {};
        return !groupId ? "Confirm Removal of All Tabs" : "Confirm removal of the \"" + groupName + "\" tab group";
    }
}

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

export default ETGMRemoveGroupsModal;