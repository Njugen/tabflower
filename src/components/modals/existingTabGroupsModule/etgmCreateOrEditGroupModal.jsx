import React, { Fragment } from "react";
import Modal from '../modal';
import WindowsList from './../../utils/windowsList';
import TBCheckBox from "../../utils/form/tbCheckbox";
import TBTextInput from './../../utils/form/tbTextInput';
import TBTextArea from './../../utils/form/tbTextArea';
import { PropTypes } from 'prop-types';
import { ValidatorError, ErrorHandler } from './../../utils/exceptionsAndHandler';
import * as validator from './../../utils/inputValidators'

class ETGMCreateNewGroupModal extends Modal {

    saveModalHandler = (callback) => {
        try {
            const { isFunction } = validator;

            if(isFunction(callback)){
                this.validateFields(() => {
                    this.clearModalData(callback(this.state.tabGroupDetails));
                });
            } else {
                throw new ValidatorError("ETGMCreateNewGroupModal-101");
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

    validateFields = (success) => {
       /* <TBTextInput id="tabGroupName" label="Group Name" value={name ? name : ""} onChange={(id, value) => this.saveToState(id, value, "tabGroupDetails")}></TBTextInput>
                <TBTextArea id="tabGroupDescription" label="Description (max 170 characters)" value={description ? description : ""} onChange={(id, value) => this.saveToState(id, value, "tabGroupDetails")}></TBTextArea>
                <TBCheckBox id="tabGroupCloseAll" label="Close everything else before launching this tab group" value={closeAll && closeAll === true ? "true" : "false"} onToggle={(id, value) => this.saveToState(id, value, "tabGroupDetails")} />
        */
       try {
            const { tabGroupName, tabGroupDescription, windowAndTabs } = this.state.tabGroupDetails;
            const { isString, isUndefined, isZero } = validator;

            if(!isString(tabGroupName)){
                throw new ValidatorError("ETGMCreateNewGroupModal-112");
            }

            if(!isString(tabGroupDescription)){
                throw new ValidatorError("ETGMCreateNewGroupModal-113");
            }

            if(isUndefined(windowAndTabs.length) || isZero(windowAndTabs.length)){
                throw new ValidatorError("ETGMCreateNewGroupModal-114");
            }

            success();
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

    setGroupId = (id) => {
        try {
            const { isString, isUndefined } = validator

            let groupId = "";

            groupId = 123;

            if(!isUndefined(id)){
                if(isString(id)){
                    groupId = id;
                } else {
                    throw new ValidatorError("ETGMCreateNewGroupModal-102")
                }
            } else {
                groupId = Math.random().toString(36).slice(2);
            }

            return groupId;
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

    childComponentDidMount = () => {
        this.saveToState("windowAndTabs", this.props.data.params.windowAndTabs, "tabGroupDetails");
        this.saveToState("groupId", this.setGroupId(this.props.data.params.groupId), "tabGroupDetails");
    } 

    componentWillUnmount = () => {
        
        
    }

    loadUrl = (url, success, fail) => {
        try {
            const { isString, isFunction } = validator;
            
            if(isString(url)){
                if(!isFunction(success)){
                    throw new ValidatorError("ETGMCreateNewGroupModal-105");
                }

                if(!isFunction(fail)){
                    throw new ValidatorError("ETGMCreateNewGroupModal-106");
                }

                fetch(url)
                .then((response) => {
                    if(response.ok){
                        return (response.text())
                    } else {
                        throw new ValidatorError("ETGMCreateNewGroupModal-103")
                    }
                })
                .then((responseText) => {
                    success(responseText);
                })
                .catch((err) => {   
                    fail(err);
                });
            } else {
                throw new ValidatorError("ETGMCreateNewGroupModal-104");
            }
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

    addNewWindow = (inputUrl) => {
        try {
            const { isString } = validator;

            if(isString(inputUrl)){
                let windows;

                const { windowAndTabs } = this.state.tabGroupDetails;

                if(Object.keys(windowAndTabs).length > 0){
                    windows = [...windowAndTabs];
                } else {
                    windows = [];
                }

                this.loadUrl(
                    inputUrl,
                    (responseText) => {
                        const parsedResponse = (new window.DOMParser()).parseFromString(responseText, "text/html");
                        
                        windows.push({
                            tabs: [{
                                title: parsedResponse.title,
                                favIconUrl: inputUrl + "/favicon.ico",
                                url: inputUrl
                            }]
                        })
                        this.saveToState("windowAndTabs", windows, "tabGroupDetails")
                    },
                    (err) => {
                        
                        windows.push({
                            tabs: [{
                                title: inputUrl,
                                favIconUrl: inputUrl + "/favicon.ico",
                                url: inputUrl
                            }]
                        });
                        this.saveToState("windowAndTabs", windows, "tabGroupDetails");
                    }
                )
              
            } else {
                throw new ValidatorError("ETGMCreateNewGroupModal-104")
            }
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

    addNewTab = (inputUrl, index) => {
        try {
            const { isString, isAtLeastZero } = validator;

            if(isString(inputUrl)){
                if(isAtLeastZero(index)){

                    let windows;

                    if(Object.keys(this.state.tabGroupDetails.windowAndTabs).length > 0){
                        windows = [...this.state.tabGroupDetails.windowAndTabs];
                    } else {
                        windows = [];
                    }


                    this.loadUrl(
                        inputUrl,
                        (responseText) => {
                            const parsedResponse = (new window.DOMParser()).parseFromString(responseText, "text/html");
                            
                            windows[index].tabs.push({
                              
                                    title: parsedResponse.title,
                                    favIconUrl: inputUrl + "/favicon.ico",
                                    url: inputUrl
                            
                            })
                            this.saveToState("windowAndTabs", windows, "tabGroupDetails")
                        },
                        (err) => {
                            
                            windows[index].tabs.push({
           
                                    title: inputUrl,
                                    favIconUrl: inputUrl + "/favicon.ico",
                                    url: inputUrl
                         
                            });
                            this.saveToState("windowAndTabs", windows, "tabGroupDetails");
                        }
                    )
                 
                } else {
                    throw new ValidatorError("ETGMCreateNewGroupModal-107")
                }
            } else {
                throw new ValidatorError("ETGMCreateNewGroupModal-108")
            }
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

    deleteTab = (windowIndex, tabIndex) => {
        
        try {
            const { isAtLeastZero } = validator;
            
            if(isAtLeastZero(windowIndex)){ 
                if(isAtLeastZero(tabIndex)){
                    let windows;

                    if(Object.keys(this.state.tabGroupDetails.windowAndTabs).length > 0){
                        windows = [...this.state.tabGroupDetails.windowAndTabs];
                        
                        windows[windowIndex].tabs.splice(tabIndex, 1);

                        if(windowIndex === 0 && windows[windowIndex].tabs.length < 1){
                            windows.splice(windowIndex, 1);
                        }

                        this.saveToState("windowAndTabs", windows, "tabGroupDetails") 
                    }
                } else {
                    throw new ValidatorError("ETGMCreateNewGroupModal-109")
                }
            } else {
                throw new ValidatorError("ETGMCreateNewGroupModal-110")
            }
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
        }
        
    }

    deleteWindow = (windowIndex) => {
        try {
            const { isAtLeastZero } = validator;
            let windows;

            if(isAtLeastZero(windowIndex)){
                if(Object.keys(this.state.tabGroupDetails.windowAndTabs).length > 0){
                    windows = [...this.state.tabGroupDetails.windowAndTabs];
                    windows.splice(windowIndex, 1);

                    this.saveToState("windowAndTabs", windows, "tabGroupDetails") 
                }
            } else {
                throw new ValidatorError("ETGMCreateNewGroupModal-111")
            }
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

    renderWindowsAndTabsSection = (windowAndTabs, type) => {
        /* 
           types:
            - currently-opened
            - existing-group
            - new-group
        */
        windowAndTabs = windowAndTabs || [];

        return (
            <div className="tb-windowlist-container">
                <div className="tb-form-row row">
                    <div className="col-8 label mb-0">
                        <span>
                            { type === "currently-opened" && "Currently opened windows and tabs" }
                            { type === "existing-group" && "Edit the windows and tabs in this group" }
                            { type === "new-group" && "And windows or tabs to this new group" }
                        </span>
                    </div>
                    
                </div>
                <div className="tb-form-row row mr-1 mb-1 ml-1 mt-0">
                    <div className="col-12 mt-0">
                        <WindowsList 
                            windows={windowAndTabs} 
                            onAddNewWindow={(data) => this.addNewWindow(data)}
                            onAddNewTab={(data, index) => this.addNewTab(data, index)}
                            onDeleteTab={(windowIndex, tabIndex) => this.deleteTab(windowIndex, tabIndex)}
                            onDeleteWindow={(windowIndex) => this.deleteWindow(windowIndex)}
                            canCloseItems={type === "existing-group" || type === "new-group" ? true : false}
                            initialShowTabs={false}
                            initialTabStyle="vertical"
                            type={this.props.data.params.type}
                        />
                    </div>
                </div>    
            </div>
        )
    }

    renderModalBody(){
        const { 
            groupName: name,
            groupCloseAll: closeAll,
            groupDescription: description,
            type
        } = this.props.data.params;
        
        const { tabGroupDetails } = this.state;

        return (
            <Fragment>
                <TBTextInput id="tabGroupName" label="Group Name" value={name ? name : ""} onChange={(id, value) => this.saveToState(id, value, "tabGroupDetails")}></TBTextInput>
                <TBTextArea id="tabGroupDescription" label="Description (max 170 characters)" value={description ? description : ""} onChange={(id, value) => this.saveToState(id, value, "tabGroupDetails")}></TBTextArea>
                <TBCheckBox id="tabGroupCloseAll" label="Close everything else before launching this tab group" value={closeAll && closeAll === true ? "true" : "false"} onToggle={(id, value) => this.saveToState(id, value, "tabGroupDetails")} />
                {tabGroupDetails && this.renderWindowsAndTabsSection(tabGroupDetails.windowAndTabs, type)}
            </Fragment>
        );    
    }

    renderModalHeader(){
        const { type, groupName } = this.props.data.params;

        if(type === "currently-opened" || type === "new-group"){
            return "Create a New Tab Group";
        } else if(type === "existing-group") {
            return "Edit the \"" + groupName + "\" tab group";
        }
    }
}

ETGMCreateNewGroupModal.propTypes = {
    data: PropTypes.object,
    onRaiseToErrorOverlay: PropTypes.func,
    onDismiss: PropTypes.func
}

export default ETGMCreateNewGroupModal;