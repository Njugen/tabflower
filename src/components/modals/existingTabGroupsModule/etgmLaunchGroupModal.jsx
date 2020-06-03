import React, { Fragment } from "react";
import Modal from '../modal';

import TBCheckBox from "../../utils/form/tbCheckbox";
import * as ExceptionsHandler from '../../utils/exceptionsAndHandler';
import * as validator from '../../utils/inputValidators'

class ETGMLaunchGroupsModal extends Modal {
    /*
        verifyChildProps()

        verifyChildProps is run automatically at mount. If necessary, 
        verify data provided by props (this.props) using this function 
        (data which is used exclusively by this modal component, and not used in common 
        by other modal components). 
    */
    verifyChildProps = () => {
        const { isString, isUndefined, isBoolean, isArray, isObject } = validator;
        const { data } = this.props;

        if(isObject(data)){
            const { params } = this.props.data;

            if(isObject(params)){
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
                    throw ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-102"); 
                }
        
                /*
                    groupName (string, optional)
        
                    A group name is optional and if given, should always be a string.
                */
        
                if(!isString(groupName) && !isUndefined(groupName)){
                    throw ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-103");
                }
        
                /*
                    groupDescription (string, optional)
        
                    A group description is optional and if given, should always be a string. 
                */
                if(!isString(groupDescription) && !isUndefined(groupDescription)){
                    throw ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-104");
                }
        
                /*
                    groupCloseAll (boolean, optional)
        
                    This parameter is optional and if given, should always be a boolean (either true or false).
                */
                if(!isBoolean(groupCloseAll) && !isUndefined(groupCloseAll)){
                    throw ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-105");
                }
        
                /*
                    groupCloseInactiveTabs (boolean, optional)
        
                    This parameter is optional and if given, should always be a boolean (either true or false)
                */
                if(!isBoolean(groupCloseInactiveTabs) && !isUndefined(groupCloseInactiveTabs)){
                    throw ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-106");
                }
        
                /* 
                    windowAndTabs (object, mandatory)
        
                    This parameter contains windows and tabs stored into a single array. If there are no windows/tabs, this array
                    is empty e.g. windowAndTabs = []
                */
                
                if(!isArray(windowAndTabs)){
                    throw ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-107");
                }
            } else {
                throw ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-108");
            }
        } else {
            throw ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-109");
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
                        throw ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-101");
                    }
                } else {
                    throw ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-108");
                }
            } else {
                throw ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-109");
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
        try {
            this.clearModalData();
        } catch(err){
            ExceptionsHandler.ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

    /*
        renderManyTabsDetected()

        Render a warning message to the user, if the number of windows and/or tabs to be opened exceeds the recommended number.
        The recommended number is up to the app developer to decide. 

        Parameters:
        - numberOfWindows (optional, number)
        - numberOfTabs (optional, number)
    */
    renderManyTabsDetected = (numberOfWindows, numberOfTabs) => {
        return (
            <p>
                Warning: You are about to launch a group consisting of {numberOfWindows || "undefined number of "} windows and {numberOfTabs || "undefined number of "} tabs. This might stress your computer down in the long run
            </p>
        );
    }

    /*
        renderLaunchOptions()

        Render a list of checkbox elements, offering the user the possibility to change 
        the behaviour of the launching tab group.
    */
    renderLaunchOptions = () => {
        const { data } = this.props;
        const { isObject } = validator;

        if(isObject(data)){
            const { params } = this.props.data;

            if(isObject(params)){
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
            } else {
                return "The options could not be loaded because the relevant parameters were not provided with the group data. Please, contact the developer.";
            }
        } else {
            return "Information about the requested tab group was not provided to this modal. Please, contact the developer.";
        }
            
    }

    renderModalBody(){
        return (
            <Fragment>
                {this.renderManyTabsDetected()}
                {this.renderLaunchOptions()}
                
            </Fragment>
        );    
    }

    renderModalHeader(){
        
        return "Confirm launch of selected tabs";    
    }
}

export default ETGMLaunchGroupsModal;