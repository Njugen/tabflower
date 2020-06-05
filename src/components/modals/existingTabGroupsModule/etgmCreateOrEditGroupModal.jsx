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
            const { isFunction, isObject, isString } = validator;
            
            let error = {
                issue: null
            }

            if(isObject(this.props.data)){
                if(isObject(this.props.data.params)){
                    if(isString(this.props.data.params.groupName)){
                        error.additionalMessage = "The tab group could not be changed";
                    } else {
                        error.additionalMessage = "The tab group could not be saved";
                    }

                    error.additionalMessage += ". Please try again.";

                    if(isFunction(callback)){
                        this.validateFields(() => {
                            
                            this.clearModalData(callback(this.state.tabGroupDetails));
                            
                        });
                    } else {
                        error.issue = ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-101");
                    }
                } else {
                    error.issue = ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-124");
                }
            } else {
                error.issue = ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-123");
            }
            
            if(error.issue){
                throw error;
            }
        } catch(err){
            
            ExceptionsHandler.ErrorHandler(err.issue, this.raiseToErrorOverlay, err.additionalMessage);
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
            
            const { isString, isUndefined, isZero, isObject, isArray, isFunction } = validator;

            let fieldErrors = {};
            let error = {
                issue: null
            };

            if(isFunction(success)){
                if(isObject(this.props.data)){
                    if(isObject(this.props.data.params)){
                    
                        if(isObject(this.state.tabGroupDetails)){
                            const { tabGroupName, tabGroupDescription, windowAndTabs } = this.state.tabGroupDetails;

                            if(isString(this.props.data.params.groupName)){
                                error.additionalMessage = "The tab group could not be changed";
                            } else {
                                error.additionalMessage = "The tab group could not be saved";
                            }

                            error.additionalMessage += ". Please try again.";

                            if(!isString(tabGroupName)){
                                fieldErrors.tabGroupName = "A tab group needs to be given a name or a label before it can be saved.";
                            }
                
                            if(!isString(tabGroupDescription)){
                                fieldErrors.tabGroupDescription = "A tab group needs to be given a short description before it can be saved.";
                            }
                
                            if(!isArray(windowAndTabs) || (isArray(windowAndTabs) && (isUndefined(windowAndTabs.length) || isZero(windowAndTabs.length)))){
                                fieldErrors.windowAndTabs = "A tab group must consist of at least one window.";
                            }
                    
                            if(Object.keys(fieldErrors).length > 0){
                                this.saveFieldErrorsToState(fieldErrors);
                                throw fieldErrors;
                            } else {
                                success();    
                            }
                        } else {
                            error.issue = ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-125");
                        }
                        
                    } else {
                        error.issue = ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-124");
                    }
                } else {
                    error.issue = ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-123");
                }
            } else {
                error.issue = ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-126");
            }

            if(isString(error.issue)){
                throw error;
            }
           
        } catch(err){
    
            if(err.issue){
                ExceptionsHandler.ErrorHandler(err.issue, this.raiseToErrorOverlay, err.additionalMessage);
            } else {
                ExceptionsHandler.ErrorHandler(err, this.raiseToErrorOverlay, err.additionalMessage);
            } 
        }
    }

    /*
        setGroupId(id)

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
        try {
            const { isObject, isArray } = validator;
            const { data } = this.props;

            if(isObject(data) && isObject(data.params)){
                const { windowAndTabs, groupId } = data.params;

                if(isArray(windowAndTabs)){
                    this.saveToState("windowAndTabs", windowAndTabs, "tabGroupDetails");
                } else {
                    throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-128");
                }

                this.saveToState("groupId", this.setGroupId(groupId), "tabGroupDetails");
            } else {
                throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-127");
            }
        } catch(err){
            ExceptionsHandler.ErrorHandler(err, this.raiseToErrorOverlay);
        }
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
            
            if(!isString(url)){
                throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-104");
            }
            
            if(!isFunction(success)){
                throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-105");
            }

            if(!isFunction(fail)){
                throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-106");
            }

            return global.fetch(url)
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
           
        } catch(err){
            ExceptionsHandler.ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

    /*
        addNewWindow(inputUrl)

        Attempt to add a new window to this tab group, by checking the response of the url. If the response
        is positive, a new window with this url will be added. Otherwise, do something else... 

        (NOTE: right now, a new window will be added either way... this should be changed later or at least the user should
            be given the opportunity to change it)

        Parameters:
        - inputUrl (string, mandatory) - URL of the to be added
    */
    addNewWindow = (inputUrl) => {
        try {
            const { isString, isObject, isArray } = validator;
            
            if(isString(inputUrl)){
                if(isObject(this.state.tabGroupDetails)){
                    let windows;

                    const { windowAndTabs } = this.state.tabGroupDetails;

                    if(isArray(windowAndTabs) && windowAndTabs.length > 0){
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
                    throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-125")
                } 
            } else {
                throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-104")
            }
        } catch(err){
            console.log("IDG", err);
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
            const { isString, isAtLeastZero, isObject, isArray } = validator;

            if(isString(inputUrl)){
                if(isAtLeastZero(index)){
                    if(isObject(this.state.tabGroupDetails)){
                        let windows;

                        const { windowAndTabs } = this.state.tabGroupDetails;

                        if(isArray(windowAndTabs) && windowAndTabs.length > 0){
                            windows = [...windowAndTabs];
                        } else {
                            throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-129");
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
                        throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-125")
                    } 
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

            const { isAtLeastZero, isObject } = validator;
            
            if(isAtLeastZero(windowIndex)){ 
                if(isAtLeastZero(tabIndex)){
                    let windows;

                    if(Object.keys(this.state.tabGroupDetails.windowAndTabs).length > 0){
                        //windows = [...this.state.tabGroupDetails.windowAndTabs];
                        windows = JSON.stringify(this.state.tabGroupDetails.windowAndTabs);
                        const parsedWindows = JSON.parse(windows);

                        if(isObject(parsedWindows[windowIndex])){
                            if(isObject(parsedWindows[windowIndex].tabs[tabIndex])){
                                parsedWindows[windowIndex].tabs.splice(tabIndex, 1);
                            }
                            
                            if(parsedWindows[windowIndex].tabs.length < 1){
                                parsedWindows.splice(windowIndex, 1);
                            }
    
                            this.saveToState("windowAndTabs", parsedWindows, "tabGroupDetails") 
                            
                        } else {
                            throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-131")
                        }
                    } else {
                        throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-130")
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
        deleteWindow()

        Delete a selected window from the tab group by targetting it by id.

        Parameters:
        - windowIndex (number, mandatory) - The map id of the targetted window (the window to delete)
    */
    deleteWindow = (windowIndex) => {
        try {
            const { isAtLeastZero, isObject } = validator;
            let windows;

            if(isAtLeastZero(windowIndex)){
                if(Object.keys(this.state.tabGroupDetails.windowAndTabs).length > 0){
                    windows = JSON.stringify(this.state.tabGroupDetails.windowAndTabs);
                    const parsedWindows = JSON.parse(windows);
                    
                    if(isObject(parsedWindows[windowIndex])){
                        parsedWindows.splice(windowIndex, 1);

                        this.saveToState("windowAndTabs", parsedWindows, "tabGroupDetails") 
                    } else {
                        throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-134")
                    }
                } else {
                    throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-133")
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

        if(isArray(windowAndTabs)){
            windowAndTabs = windowAndTabs || [];
        } else {
            throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-121");
        }

        if(!isString(type)){
            throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-112");
        } else {
            if(type !== "currently-opened" && type !== "existing-group" && type !== "new-group"){
                throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-113");
            }
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
        const { data } = this.props;

        if(isObject(data)){
            const { params } = data;

            if(isObject(params)){
                const { 
                    groupName: name,
                    groupCloseAll: closeAll,
                    groupCloseInactiveTabs: closeInactiveTabs,
                    groupDescription: description,
                    type
                } = params;
                
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
                        {tabGroupDetails && this.renderWindowsAndTabsSection(tabGroupDetails.windowAndTabs || [], type, windowErr || null)}
                    </Fragment>
                );    
            } else {
                return ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-135").message;
                
            }
        } else {
            return ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-136").message;
         
        }
    }

    renderModalHeader(){
        const { isObject } = validator;
        const { data } = this.props;

        if(isObject(data)){
            const { params } = data;

            if(isObject(params)){
                const { type, groupName } = this.props.data.params;

                if(type === "currently-opened" || type === "new-group"){
                    return "Create a New Tab Group";
                } else if(type === "existing-group") {
                    return "Edit the \"" + (groupName || "") + "\" tab group";
                }
            } else {
                return "Data parameters are missing";
            } 
        } else {
            return "Data section is missing in component props";
        }
    }
}


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
} 

export default ETGMCreateNewGroupModal;