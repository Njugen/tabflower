import React, { Fragment } from "react";
import Modal from '../modal';

import TBCheckBox from "../../utils/form/tbCheckbox";
import { ValidatorError, ErrorHandler } from './../../utils/exceptionsAndHandler';
import * as validator from './../../utils/inputValidators'

class ETGMLaunchGroupsModal extends Modal {
    /*
        verifyChildProps()

        verifyChildProps is run automatically at mount. If necessary, 
        verify data provided by props (this.props) using this function 
        (data which is used exclusively by this modal component, and not used in common 
        by other modal components). 
    */
    verifyChildProps = () => {
        const { isString, isUndefined, isBoolean, isArray } = validator;
        const { 
            groupId, 
            groupName, 
            groupCloseAll, 
            groupCloseInactiveTabs,
            groupDescription, 
            windowAndTabs 
        } = this.props.data.params;

        /*
            groupId (string, optional)

            A group id is necessary when attempting to launch a tab group. If there is no group to target,
            then throw an error
        */
        if(!isString(groupId)){ 
            throw ValidatorError("ETGMLaunchGroupsModal-102"); 
        }

        /*
            groupName (string, optional)

            A group name is optional and if given, should always be a string.
        */

        if(!isString(groupName) && !isUndefined(groupName)){
            throw ValidatorError("ETGMLaunchGroupsModal-103");
        }

        /*
            groupDescription (string, optional)

            A group description is optional and if given, should always be a string. 
        */
        if(!isString(groupDescription) && !isUndefined(groupDescription)){
            throw ValidatorError("ETGMLaunchGroupsModal-104");
        }

        /*
            groupCloseAll (boolean, optional)

            This parameter is optional and if given, should always be a boolean (either true or false).
        */
        if(!isBoolean(groupCloseAll) && !isUndefined(groupCloseAll)){
            throw ValidatorError("ETGMLaunchGroupsModal-105");
        }

        /*
            groupCloseInactiveTabs (boolean, optional)

            This parameter is optional and if given, should always be a boolean (either true or false)
        */
        if(!isBoolean(groupCloseInactiveTabs) && !isUndefined(groupCloseInactiveTabs)){
            throw ValidatorError("ETGMLaunchGroupsModal-106");
        }

        /* 
            windowAndTabs (object, mandatory)

            This parameter contains windows and tabs stored into a single array. If there are no windows/tabs, this array
            is empty e.g. windowAndTabs = []
        */
        
       if(!isArray(windowAndTabs)){
        throw ValidatorError("ETGMLaunchGroupsModal-107");
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
                //this.clearModalData(callback(this.props.data.params));
                const tabGroupDetails = {
                    groupId: this.props.data.params.groupId,
                    windowAndTabs: this.props.data.params.windowAndTabs,
                    tabGroupName: this.props.data.params.groupName,
                    tabGroupDescription: this.props.data.params.groupDescription,
                    ...this.state.tabGroupDetails 
                };
                this.clearModalData(callback(tabGroupDetails));
            } else {
                throw ValidatorError("ETGMLaunchGroupsModal-101");
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

    manyTabsDetected = (numberOfWindows, numberOfTabs) => {
        return (
            <p>
                Warning: You are about to launch a group consisting of 4 windows and 120 tabs. This might stress your computer down in the long run
            </p>
        );
    }

    launchOptions = () => {
        console.log(this.props.data.params);
        const {
            groupCloseAll,
            groupCloseInactiveTabs,
            groupDontAskAgain
        } = this.props.data.params;
        return (

            <Fragment>
                <TBCheckBox id="tabGroupCloseAll" label="Close all currently opened tabs and windows" value={groupCloseAll && groupCloseAll === true ? "true" : "false"} onToggle={(id, value) => this.saveToState(id, value, "tabGroupDetails")} />
                <TBCheckBox id="tabGroupCloseInactiveTabs" label="Automatically close all unresponsive tabs opened by this tab group" value={groupCloseInactiveTabs && groupCloseInactiveTabs === true ? "true" : "false"} onToggle={(id, value) => this.saveToState(id, value, "tabGroupDetails")} />
                <TBCheckBox id="tabGroupDontAskAgain" label="Save all selected options and do not show this message again (All settings offered in this popup can still be changed for any tab group. Just click the cog wheel for the tab group you want to change)." value={groupDontAskAgain && groupDontAskAgain === true ? "true" : "false"} onToggle={(id, value) => this.saveToState(id, value, "tabGroupDetails")} />
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