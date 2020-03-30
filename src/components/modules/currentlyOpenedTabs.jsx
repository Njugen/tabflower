import React, { Fragment } from "react";
import Module from '../utils/moduleon/module';
import WindowsList from './../utils/windowsList';
import { sendToBackground } from "../../services/webextension/APIBridge";
import * as validator from './../utils/inputValidators';
import { ValidatorError, ErrorHandler } from '../utils/exceptionsAndHandler';
require("../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css")

class CurrentlyOpenedTabsModule extends Module {
   /*
        Settings
        - moduleTitle: Title of the module (string)
   */
    settings = {
        moduleTitle: "Currently Opened Tabs"
    }

    verifyChildProps = () => {
        const { isObject, isString } = validator;

        if(isObject(this.settings)){
            const { moduleTitle } = this.settings;

            if(!isString(moduleTitle)){
                throw ValidatorError("cotm-module-102");
            }
        } else {
            console.log("SIMPUKKA", isObject(this.settings));
            throw ValidatorError("cotm-module-101");
        }
    }

    /*
        createTabGroup
        
        Creates a new tab group based on information given in the input parameter. A group is
        created when this parameter is sent to the browser, where the background script decides
        whether to add a new group or overwrite an existing group. 

        Parameter
        - details (object), information about the tab group to create
    */
    createTabGroup = (details) => {
        try {
            const { isObject, isString, isArray } = validator; 

            if(isObject(details)){ 
                const { groupId, windowAndTabs, tabGroupName, tabGroupDescription } = details;

                if(!isArray(windowAndTabs) || (isArray(windowAndTabs) && windowAndTabs.length < 1)){
                    throw ValidatorError("cotm-module-104");
                }

                if(!isString(groupId)){ throw ValidatorError("cotm-module-105"); }
                if(!isString(tabGroupName)){ throw ValidatorError("cotm-module-106"); }
                if(!isString(tabGroupDescription)){ throw ValidatorError("cotm-module-107"); }

                sendToBackground(
                    "save-tab-group", 
                    details, 
                    () => {
                        try {
                            const { onRaiseToView } = this.props;

                            if(onRaiseToView){
                                onRaiseToView("refresh");
                            }
                        } catch(err){
                            ErrorHandler(err, this.raiseToErrorOverlay);
                        }
                    },
                    (failResponse) => {
                        const err = ValidatorError(failResponse.data);
                        ErrorHandler(err, this.raiseToErrorOverlay);
                    
                    }
                );
            } else {
                throw ValidatorError("cotm-module-103");
            }
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

    getOpenedWindowsAndTabs = () => {
        sendToBackground(
            "get-all-windows-and-tabs", 
            {}, 
            (successResponse) => {
                try {
                    console.log("AVENGERS", successResponse);
                    const { isArray, isObject } = validator;

                    if(!isObject(successResponse) || (isObject(successResponse) && !isArray(successResponse.data))){
                        throw ValidatorError("cotm-module-108");
                    }

                    this.setState({
                        moduleData: {
                            openedWindowsAndTabs: successResponse.data
                        }
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
    }

    
    closeUnresponsiveTabs = (data) => {
        try {
            sendToBackground(
                "delete-unresponsive-tabs", 
                { 
                    windowsAndTabs: this.state.moduleData.openedWindowsAndTabs
                }, 
                () => {
                    try {
                        setTimeout(
                            () => this.getOpenedWindowsAndTabs(), 
                            1500
                        );
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

    listenForWindowAndTabChanges = () => {
        try {
            const chrome = (typeof window.chrome === "undefined" ? null : window.chrome);

            if(chrome){
                chrome.runtime.onMessage.addListener(
                    (message) => {
                        try {
                            if(message.messageId && message.messageId === "window-tabs-updated"){
                                this.getOpenedWindowsAndTabs()
                            }
                        } catch(err){
                            ErrorHandler(err, this.raiseToErrorOverlay);
                        }
                    }
                )
            } else {
                // If the webextension API does not exist, simply ignore listening for anything and just request dummy data
                this.getOpenedWindowsAndTabs();
                
                //throw ValidatorError("cotm-module-109")
            }
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

    childComponentDidMount = () => {
        this.getOpenedWindowsAndTabs();
        this.listenForWindowAndTabChanges();
       // window.addEventListener("focus", this.getOpenedWindowsAndTabs);

      //  window.addEventListener("mousemove", this.getOpenedWindowsAndTabs);

       // window.addEventListener("blur", this.getOpenedWindowsAndTabs);
    }

   componentWillUnmount = () => {
       // window.removeEventListener("focus", this.getOpenedWindowsAndTabs);

       // window.removeEventListener("mousemove", this.getOpenedWindowsAndTabs);

       // window.removeEventListener("blur", this.getOpenedWindowsAndTabs);
   } 

   renderBody = () => {
        return (
            <Fragment>
                <div className="active-tabs-module">
                    <p>Tab Flower offers you an oversight over all opened tabs, making it easier
                        to remove tabs and windows you seldom use. You may also scan for unresponsive websites and remove them.
                    </p>
                    <WindowsList 
                        windows={this.state.moduleData.openedWindowsAndTabs} 
                        onRaiseToModal={(data) => this.raiseToModal(data)}
                        canCloseItems={true}
                        initialShowTabs={true}
                        initialTabStyle="horizontal"
                        refreshList={() => this.getOpenedWindowsAndTabs()}
                    />
                </div>
            </Fragment>
        );
   }

   renderFooter = () => {
        return (
            <Fragment>
                
                    <p className="tabeon-module-footer-text small d-inline-block">Need to archive these windows and tabs for future browsing? Save them to Tab Flower!</p>
                    <button className="btn btn-tabeon d-inline-block" onClick={() => this.raiseToModal({ id: "cotmremoveunresponsivetabsmodal", params: {}, action: this.closeUnresponsiveTabs.bind(this) })}>Remove unresponsive tabs</button>
                    <button className="btn btn-tabeon d-inline-block" onClick={() => this.raiseToModal({ id: "etgmcreateoreditgroupmodal", params: { windowAndTabs: this.state.moduleData.openedWindowsAndTabs, type: "currently-opened" }, action: this.createTabGroup.bind(this) })}>Add to group</button>
              
            </Fragment>
        );
   }

   
    
}

export default CurrentlyOpenedTabsModule;