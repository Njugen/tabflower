import React, { Fragment } from "react";
import Modal from '../modal';
import WindowsList from '../../utils/windowsList';
import TBCheckBox from "../../utils/form/tbCheckbox";
import TBTextInput from '../../utils/form/tbTextInput';
import TBTextArea from '../../utils/form/tbTextArea';
import { PropTypes } from 'prop-types';
import * as ExceptionsHandler from '../../utils/exceptionsAndHandler';
import * as validator from '../../utils/inputValidators'

class ETGMCreateNewGroupModal extends Modal {
    /*
        verifyChildProps()

        verifyChildProps is run automatically at mount. If necessary, 
        verify data provided by props (this.props) using this function 
        (data which is used exclusively by this modal component, and not used in common 
        by other modal components). 
    */
    verifyChildProps = () => {
        /*
            Verify the this.props.data.params object
        */
        const { isBoolean, isString, isUndefined, isArray, isObject } = validator;
        
        if(isObject(this.props.data)){
            if(isObject(this.props.data.params)){
                const { 
                    windowAndTabs, 
                    groupName, 
                    groupCloseAll, 
                    groupCloseInactiveTabs, 
                    groupDescription, 
                    type, 
                    groupId 
                } = this.props.data.params;
            
                /*
                    type (string, mandatory)

                    A type is always required and needs to hold either of the following values:
                    - "currently-opened"
                    - "new-group"
                    - "existing-group"
                */
                if(!isString(type)){
                    throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-114");
                } else {
                    if(type !== "currently-opened" && type !== "new-group" && type !== "existing-group"){
                        throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-115");
                    }
                }

                /*
                    groupId (string, optional)

                    A group id is optional and if given, should always be a string. If there is no
                    group id, refrain from using the groupId parameter when calling this modal
                */

                if(!isString(groupId) && !isUndefined(groupId)){
                    throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-120");
                }

                /*
                    groupName (string, optional)

                    A group name is optional and if given, should always be a string. If there is no
                    group name, refrain from using the groupName parameter when calling this modal
                */

                if(!isString(groupName) && !isUndefined(groupName)){
                    throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-116");
                }


                /*
                    groupDescription (string, optional)

                    A group description is optional and if given, should always be a string. If there is no
                    group description, refrain from using the groupDescription parameter when calling this modal
                */
                if(!isString(groupDescription) && !isUndefined(groupDescription)){
                    throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-117");
                }

                /*
                    groupCloseAll (boolean, optional)

                    This parameter is optional and if given, should always be a boolean (either true or false). If there is no boolean value, 
                    refrain from using the groupCloseAll parameter when calling this modal
                */
                if(!isBoolean(groupCloseAll) && !isUndefined(groupCloseAll)){
                    throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-118");
                }

                /*
                    groupCloseInactiveTabs (boolean, optional)

                    This parameter is optional and if given, should always be a boolean (either true or false)
                */

                if(!isBoolean(groupCloseInactiveTabs) && !isUndefined(groupCloseInactiveTabs)){
                    throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-122");
                }

                /* 
                    windowAndTabs (object, mandatory)

                    This parameter contains windows and tabs stored into a single array. If there are no windows/tabs, this array
                    is empty e.g. windowAndTabs = []
                */
                
                if(!isArray(windowAndTabs) && !isUndefined(windowAndTabs)){
                    throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-119");
                }
            } else {
                throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-124");
            }    
        } else {
            throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-123");
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
            console.log("saveModalHandler triggered");
            const { isFunction } = validator;
            
            if(isFunction(callback)){
                this.validateFields(() => {
                    this.clearModalData(callback(this.state.tabGroupDetails));
                });
            } else {
                throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-101");
            }
        } catch(err){
            const { groupName } = this.props.data.params;
            const additionalMessage = (!groupName ? "The tab group could not be saved" : "The tab group could not be changed" ) + ". Please try again.";

            ExceptionsHandler.ErrorHandler(err, this.raiseToErrorOverlay, additionalMessage);
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
        validateFields()

        Check through all form fields and windows + tabs of this modal form. This function runs the success() parameter
        if no errors are detected in the fields or in the listed windows/tabs.

        Parameters:
        - success (function, mandatory. Gets called when no error(s) are thrown by the validateFields() function)
    */
    validateFields = (success) => {
       try {
            const { tabGroupName, tabGroupDescription, windowAndTabs } = this.state.tabGroupDetails;
            const { isString, isUndefined, isZero } = validator;

            let errors = {};

            if(!isString(tabGroupName)){
                errors["tabGroupName"] = "A tab group needs to be given a name or a label before it can be saved.";
            }

            if(!isString(tabGroupDescription)){
                errors["tabGroupDescription"] = "A tab group needs to be given a short description before it can be saved.";
            }

            if(isUndefined(windowAndTabs.length) || isZero(windowAndTabs.length)){
                errors["windowAndTabs"] = "A tab group must consist of at least one window.";
            }

            if(Object.keys(errors).length > 0){
                throw errors;
            } 

            success(); 
           
        } catch(err){
            if(!err.name){
                this.saveFieldErrorsToState(err);
            } else {
                const { groupName } = this.props.data.params;
                const additionalMessage = (!groupName ? "The tab group could not be saved" : "The tab group could not be changed" ) + ". Please try again.";

                ExceptionsHandler.ErrorHandler(err, this.raiseToErrorOverlay, additionalMessage);
            }
        }
    }

    /*
        setGroupId()

        Return the input value as group id, if the input is a string. Otherwise if an id does not exist, 
        create a brand new string and use THAT as group id.

        Parameters:
        - id (string, optional. An existing string, if such exists)
    */
    setGroupId = (id) => {
        try {
            const { isString, isUndefined } = validator;
            
            let groupId = "";

            if(!isUndefined(id)){
                if(isString(id)){
                    groupId = id;
                } else {
                    throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-102")
                }
            } else {
                groupId = Math.random().toString(36).slice(2);
            }

            return groupId;
        } catch(err){
            ExceptionsHandler.ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

    childComponentDidMount = () => {
        this.saveToState("windowAndTabs", this.props.data.params.windowAndTabs, "tabGroupDetails");
        this.saveToState("groupId", this.setGroupId(this.props.data.params.groupId), "tabGroupDetails");
    } 

    /*
        loadUrl()

        Load a url, and run one of two available callback functions depending on the result

        Parameters:
        - url (string, mandatory)
        - success (callback function, mandatory. Run when the url response is ok)
        - fail (callback function, mandatory. Run when the url response is not ok)
    */
    loadUrl = (url, success, fail) => {
        try {
            const { isString, isFunction } = validator;
            
            if(isString(url)){
                if(!isFunction(success)){
                    throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-105");
                }

                if(!isFunction(fail)){
                    throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-106");
                }

                fetch(url)
                .then((response) => {
                    if(response.ok){
                        return (response.text())
                    } else {
                        throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-103")
                    }
                })
                .then((responseText) => {
                    success(responseText);
                })
                .catch((err) => {   
                    fail(err);
                });
            } else {
                throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-104");
            }
        } catch(err){
            ExceptionsHandler.ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

    /*
        addNewWindow()

        Attempt to add a new window to this tab group, by checking the response of the url. If the response
        is positive, a new window with this url will be added. Otherwise, do something else... 

        (NOTE: right now, a new window will be added either way... this should be changed later or at least the user should
            be given the opportunity to change it)

        Parameters:
        - inputUrl (string, mandatory) - URL of the to be added
    */
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
                throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-104")
            }
        } catch(err){
            ExceptionsHandler.ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

    /*
        addNewTab()

        Attempt to add a new tab to this window, by checking the response of the url. If the response
        is positive, a new tab with this url will be added. Otherwise, do something else... 

        (NOTE: right now, a new tab will be added to the selected window either way... this should be changed later or at least the user should
            be given the opportunity to change it)

        Parameters:
        - inputUrl (string, mandatory) - URL of the to be added
        - index (number, mandatory) - map id of the targetted window (the window to which the new tab should be added)
    */
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

                    const stringifiedWindows = JSON.stringify(windows);
                    let parsedWindows = JSON.parse(stringifiedWindows);

                    this.loadUrl(
                        inputUrl,
                        (responseText) => {
                            const parsedResponse = (new window.DOMParser()).parseFromString(responseText, "text/html");
                            
                            parsedWindows[index].tabs.push({
                              
                                    title: parsedResponse.title,
                                    favIconUrl: inputUrl + "/favicon.ico",
                                    url: inputUrl
                            
                            })
    
                            this.saveToState("windowAndTabs", parsedWindows, "tabGroupDetails")
                        },
                        (err) => {
                            
                            parsedWindows[index].tabs.push({
           
                                    title: inputUrl,
                                    favIconUrl: inputUrl + "/favicon.ico",
                                    url: inputUrl
                         
                            }); 
             
                            this.saveToState("windowAndTabs", parsedWindows, "tabGroupDetails");
                        }
                    )
                 
                } else {
                    throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-107")
                }
            } else {
                throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-108")
            }
        } catch(err){
            ExceptionsHandler.ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

    /*
        deleteTab()

        Delete a selected tab from the tab group by targetting the window where it is located

        Parameters:
        - windowIndex (number, mandatory) - The map id of the targetted window
        - tabIndex (number, mandatory) - The map id of the targetted tab (the tab to be deleted)
    */
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
                    throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-109")
                }
            } else {
                throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-110")
            }
        } catch(err){
            ExceptionsHandler.ErrorHandler(err, this.raiseToErrorOverlay);
        }
        
    }

    /*
        deleteTab()

        Delete a selected window from the tab group by targetting it by id.

        Parameters:
        - windowIndex (number, mandatory) - The map id of the targetted window (the window to delete)
    */
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
                throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-111")
            }
        } catch(err){
            ExceptionsHandler.ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

    /*
        renderWindowsAndTabsSection()

        Render a list of windows and tabs available in the windowAndTabs parameter.

        Parameters:
        - windowAndTabs (array of window objects, mandatory): contains a collection of windows retrieved from the browser API
        - type (string, mandatory), can be either one of the following values. This parameter decides what feature the windowlist should offer:
            - currently-opened
            - existing-group
            - new-group
        - warning
    */
    renderWindowsAndTabsSection = (windowAndTabs, type, warning) => {
        /* 
           types:
            - currently-opened
            - existing-group
            - new-group
        */
       
        const { isString, isArray } = validator;

        if(!isString(type)){
            throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-112");
        } else {
            if(type !== "currently-opened" && type !== "existing-group" && type !== "new-group"){
                throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-113");
            }
        }

        if(isArray(windowAndTabs)){
            windowAndTabs = windowAndTabs || [];
        } else {
            throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-121");
        }

        

        return (
            <div className="tb-windowlist-container">
                <div className="tb-form-row row d-flex justify-content-between">
                    <div className="col-8 label mb-0">
                        <span>
                            { type === "currently-opened" && "Currently opened windows and tabs" }
                            { type === "existing-group" && "Edit the windows and tabs in this group" }
                            { type === "new-group" && "Add windows or tabs to this new group" }
                        </span> 
                    </div>
                    <div className="col-4 label">
                        <span>{typeof warning === "string" && warning}</span>
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
                            onRaiseToErrorOverlay={(data) => this.raiseToErrorOverlay(data)}
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
        const { isObject } = validator;

        if(isObject(this.props.data)){
            if(isObject(this.props.data.params)){
                const { 
                    groupName: name,
                    groupCloseAll: closeAll,
                    groupCloseInactiveTabs: closeInactiveTabs,
                    groupDescription: description,
                    type
                } = this.props.data.params;
                
                const { 
                    tabGroupName: nameErr,
                    tabGroupDescription: descErr,
                    windowAndTabs: windowErr
                } = this.state.fieldErrors
                
                const { tabGroupDetails } = this.state;
                
                return (
                    <Fragment>
                        <TBTextInput id="tabGroupName" warning={nameErr || null} label="Group Name" value={name ? name : ""} onChange={(id, value) => this.saveToState(id, value, "tabGroupDetails")}></TBTextInput>
                        <TBTextArea id="tabGroupDescription" warning={descErr || null} label="Description (max 170 characters)" value={description ? description : ""} onChange={(id, value) => this.saveToState(id, value, "tabGroupDetails")}></TBTextArea>
                        <TBCheckBox id="tabGroupCloseAll" label="Close everything else before launching this tab group" value={closeAll && closeAll === true ? "true" : "false"} onToggle={(id, value) => this.saveToState(id, value, "tabGroupDetails")} />           
                        <TBCheckBox id="tabGroupCloseInactiveTabs" label="Automatically close all unresponsive tabs opened by this tab group" value={closeInactiveTabs && closeInactiveTabs === true ? "true" : "false"} onToggle={(id, value) => this.saveToState(id, value, "tabGroupDetails")} />
                        {tabGroupDetails && this.renderWindowsAndTabsSection(tabGroupDetails.windowAndTabs, type, windowErr || null)}
                    </Fragment>
                );    
            } else {
                return "Error body";
            }
        } else {
            return "Error Body";
        }
    }

    renderModalHeader(){
        const { isObject } = validator;

        if(isObject(this.props.data)){
            if(isObject(this.props.data.params)){
                const { type, groupName } = this.props.data.params;

                if(type === "currently-opened" || type === "new-group"){
                    return "Create a New Tab Group";
                } else if(type === "existing-group") {
                    return "Edit the \"" + (groupName || "") + "\" tab group";
                }
            } else {
                return "Error";
            } 
        } else {
            return "Error"
        }
    }
}

/*
ETGMCreateNewGroupModal.propTypes = {
    data: PropTypes.shape({
            params: PropTypes.shape({
                name: PropTypes.string,
                groupCloseAll: PropTypes.bool,
                groupDescription: PropTypes.string,
                type: PropTypes.string.isRequired
            })
    }),
    onRaiseToErrorOverlay: PropTypes.func.isRequired,
    onDismiss: PropTypes.func.isRequired
} */

export default ETGMCreateNewGroupModal;