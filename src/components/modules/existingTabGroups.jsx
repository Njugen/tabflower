import React, { Fragment } from "react";
import Module from '../utils/moduleon/module';
import { sendToBackground } from './../../services/webextension/APIBridge';
import { ValidatorError, ErrorHandler } from '../utils/exceptionsAndHandler';
import * as validator from '../utils/inputValidators'
require("../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css")

class ExistingTabGroupsModule extends Module {
    settings = {
        moduleTitle: "Existing Tab Groups"
    }

    verifyChildProps = () => {
        const { isObject, isString } = validator;

        if(isObject(this.settings)){
            const { moduleTitle } = this.settings;

            if(!isString(moduleTitle)){
                throw ValidatorError("etgm-module-102");
            }
        } else {
            throw ValidatorError("etgm-module-101");
        }
    }


   launchTabGroup = (tabGroupId) => {
        try {
            const { isString } = validator;

            if(isString(tabGroupId)){
          
                sendToBackground("launch-tab-group", {groupId: tabGroupId});
            } else {
                throw ValidatorError("etgm-module-103");
            } 
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
        }
   }

    removeTabGroups = (data) => {
        try {
            const { isString } = validator;

            let groupId = "";

            if(data && data.groupId){
                if(isString(data.groupId)){
                    groupId = data.groupId;
                } else {
                    throw ValidatorError("etgm-module-104");
                }
            } else {
                groupId = "all"
            }

            sendToBackground("delete-tab-groups", { id: groupId }, () => {
                this.getAllTabGroups();
            });
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

   createOrEditTabGroup = (details) => {
       try {
            const { isObject, isString, isArray } = validator; 

            if(isObject(details)){
                const { groupId, windowAndTabs, tabGroupName, tabGroupDescription } = details;

                if(!isArray(windowAndTabs) || (isArray(windowAndTabs) && windowAndTabs.length < 1)){
                    throw ValidatorError("etgm-module-106");
                }

                if(!isString(groupId)){ throw ValidatorError("etgm-module-107"); }
                if(!isString(tabGroupName)){ throw ValidatorError("etgm-module-108"); }
                if(!isString(tabGroupDescription)){ throw ValidatorError("etgm-module-109"); }

                sendToBackground(
                    "save-tab-group", 
                    details, 
                    () => {
                        const { onRaiseToView } = this.props;

                        if(onRaiseToView){
                            onRaiseToView("refresh");
                        }
                    },
                    (failResponse) => {
                        const err = ValidatorError(failResponse.data);
                        ErrorHandler(err, this.raiseToErrorOverlay);
                    
                    }
                );
            } else {
                throw ValidatorError("etgm-module-105");
            }
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
        }
   }

   getAllTabGroups = () => {
        try {
            sendToBackground(
                "get-all-tab-groups", 
                {}, 
                (response) => {
                    try {
                        const { isUndefined, isArray } = validator;

                        let tabGroups = [];

                        if(!isUndefined(response) && isArray(response.data)){
                            tabGroups = response.data;
                        } else {
                            throw ValidatorError("etgm-module-110");
                        }

                        this.setState({
                            moduleData: {
                                loadedTabGroups: tabGroups
                            }
                        }, () => {

                        });
                    } catch(err){
                        ErrorHandler(err, this.raiseToErrorOverlay);
                    }
                },
                (failResponse) => {
                    const err = ValidatorError(failResponse.data);
                    ErrorHandler(err, this.raiseToErrorOverlay);
                
                }
            );
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
        }
   }

   renderTabGroups = () => {
        const tabGroups = this.state.moduleData.loadedTabGroups || [];
        const { isPositiveNumber } = validator;

        if(isPositiveNumber(tabGroups.length)){
            return tabGroups.map(
                (group, i) => {
                    return (
                        <div className="list-item-block col-3 m-1 p-3" key={"tg-" + i}>
                            <div className="list-item-block-header mb-3">
                                <h6 className="list-item-block-headline float-left pr-2">{group.tabGroupName}</h6>
                                <div className="list-item-block-options float-right">
                                    <button className="fas fa-cog options-button" onClick={() => this.raiseToModal({ id: "etgmcreateoreditgroupmodal", params: { windowAndTabs: group.windowAndTabs, groupName: group.tabGroupName, groupCloseAll: group.tabGroupCloseAll, groupDescription: group.tabGroupDescription, groupId: group.groupId, type: "existing-group"}, action: this.createOrEditTabGroup.bind(this) })}></button>
                                    <button className="fas fa-times options-button" onClick={() => this.raiseToModal({ id: "etgmremovegroupsmodal", params: {groupId: group.groupId, groupName: group.tabGroupName}, action: this.removeTabGroups.bind(this) })}></button>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="list-item-block-body small pb-3">
                                <p>{group.tabGroupDescription}</p>
                            </div>
                            <div className="list-item-block-footer">
                                <button className="btn btn-tabeon-reverse d-inline-block" onClick={() => this.raiseToModal({ id: "etgmlaunchgroupsmodal", params: { groupId: group.groupId}, action: this.launchTabGroup.bind(this) })}>Launch group</button>
                            </div>
                        </div>
                    );
                } 
            );
        } else {
            return (
                <div className="no-tab-groups-msg">
                    There are no saved tab groups at the moment. You may add a new tab group by clicking the "Create a new group" button below
                </div>
            );
        }
   }

   childComponentDidMount = () => {
       this.getAllTabGroups();
       console.log("UPDATE");
   }

   componentDidUpdate = (prevProps, prevState) => {
       if(prevProps.refresh !== this.props.refresh){
    
        this.getAllTabGroups();
       }
   }

   renderBody = () => {
        return (
            <Fragment>
                <div className="existing-tab-groups-module">
                    <p>
                        To keep the browser's tab bar from overflowing, Tab Flower lets you group windows and tabs together. You may create new tab groups at any time, and launch their tabs in a categorized manner later.
                    </p>
                    <div className="existing-tab-groups-list row d-flex justify-content-center">
                        {this.renderTabGroups()}
                    </div>    
                </div>
            </Fragment>
        );
   }
   
   renderFooter = () => {
        return (    
            <Fragment>
                 
                <button className="btn btn-tabeon d-inline-block" onClick={() => this.raiseToModal({ id: "etgmremovegroupsmodal", params: { removeAll: true }, action: this.removeTabGroups.bind(this) })}>Remove all groups</button>
                <button className="btn btn-tabeon d-inline-block" onClick={() => this.raiseToModal({ id: "etgmcreateoreditgroupmodal", params: { windowAndTabs: [], type: "new-group" }, action: this.createOrEditTabGroup.bind(this) })}>Create a new group</button>
              
            </Fragment>
        );
   }
    
}

export default ExistingTabGroupsModule;