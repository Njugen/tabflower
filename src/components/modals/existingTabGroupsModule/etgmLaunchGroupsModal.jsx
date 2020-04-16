import React, { Fragment } from "react";
import Modal from '../modal';
import { sendToBackground } from './../../../services/webextension/APIBridge';
import { PropTypes } from 'prop-types';

import TBCheckBox from "../../utils/form/tbCheckbox";
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