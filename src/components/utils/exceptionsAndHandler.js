export const ValidatorError = (code) => {
    let message;

    switch(code){
        // modal.js
        case "mp-fadeIn-101" || "mp-fadeOut-101":
            message = "A style object is missing in the modal's jsx component. Style cannot be set";
            break;
        case "mp-fadeIn-102" || "mp-fadeOut-102":
            message = "A reference to the JSX element representing the modal is missing or is invalid";
            break; 
        case "mp-clearModalData-103":
            message = "The callback parameter is not a function";
            break;
        case "mp-saveToState-104": 
            message = "The \"value\" parameter is undefined. Data was not saved";    
            break;    
        case "mp-saveToState-105": 
            message = "The \"area\" parameter is not a string. Data was not saved.";    
            break;
        case "mp-saveToState-106": 
            message = "The \"callback\" parameter is not a function";
            break;    
        case "mp-saveToState-107": 
            message = "The \"area\" parameter is not a string. Data was not saved.";    
            break;    
        case "mp-propsAction-101": 
            message = "The modal could not execute the requested action connected to it because it is invalid. The task(s) were ignored.";    
            break;   
        case "mp-verifyProps-101": 
            message = "The \"onDismiss\" props function is missing in the requested modal. Request aborted.";    
            break;      
        case "mp-verifyProps-102": 
            message = "The \"onRaiseToErrorOverlay\" props function is missing in the requested modal. Request aborted.";    
            break;
        case "mp-verifyProps-103": 
            message = "The \"data\" props is either not an object, or is missing, in the requested modal. Request aborted.";    
            break;   
        case "mp-verifyProps-104": 
            message = "A modal always need to be requested using an \"params\" object. Request aborted";    
            break;   
        case "mp-verifyProps-105": 
            message = "A state object is missing in the \"Modal\" component. Request aborted";    
            break;    
        case "mp-verifyProps-106": 
            message = "A ui object is missing in the state object of the \"Modal\" component. Request aborted";    
            break;       
        case "mp-verifyProps-107": 
            message = "A fieldErrors object is missing in the state object of the \"Modal\" component. Request aborted";    
            break;                         
        // ETGMCreateNewGroupModal
        case "ETGMCreateNewGroupModal-101": 
            message = "The callback parameter is not a function";
            break;
        case "ETGMCreateNewGroupModal-102": 
            message = "A tab group id must be a string. The requested tab group could not be retrieved."  
            break;
        case "ETGMCreateNewGroupModal-103":
                message = "The URL could not be found";
                break;     
        case "ETGMCreateNewGroupModal-104":
            message = "The URL to be loaded needs to be a string";
            break;
        case "ETGMCreateNewGroupModal-105":
            message = "The success parameter needs to be a function for callback";
            break;     
        case "ETGMCreateNewGroupModal-106":
            message = "The fail parameter needs to be a function for callback";
            break;
        case "ETGMCreateNewGroupModal-107":
            message = "A tab index needs to be a number ranging from 0 to any positive integer.";
            break;       
        case "ETGMCreateNewGroupModal-108":
            message = "The URL to be loaded needs to be a string";
            break;
        case "ETGMCreateNewGroupModal-109":
            message = "The tabIndex parameter in the deleteTab function needs to be an integer 0 or higher";
            break;         
        case "ETGMCreateNewGroupModal-110":
            message = "The windowIndex parameter in the deleteTab function needs to be an integer 0 or higher";
            break;
        case "ETGMCreateNewGroupModal-111":
            message = "The windowIndex parameter in the deleteWindow function needs to be an integer 0 or higher";
            break;
        case "ETGMCreateNewGroupModal-112":
            message = "The \"type\" parameter in renderWindowsAndTabsSection() needs to be a string. Cannot add nor edit a tab group at this time.";
            break;
        case "ETGMCreateNewGroupModal-113":
            message = "The \"type\" parameter in renderWindowsAndTabsSection() needs to have either of the following values: \"currently-opened\", \"existing-group\" or \"new-group\". Cannot add nor edit a tab group at this time.";
            break; 
        case "ETGMCreateNewGroupModal-114":
            message = "The \"type\" parameter in this.props.data.params is neither missing or not a string. As a result, tab groups cannot be added nor edited at this time.";
            break;      
        case "ETGMCreateNewGroupModal-115":
            message = "The \"type\" parameter in this.props.data.params needs to have either of the following values: \"currently-opened\", \"existing-group\" or \"new-group\". As a result, tab groups cannot be added nor edited at this time.";
            break;      
        case "ETGMCreateNewGroupModal-116":
            message = "The \"groupName\" parameter in this.props.data.params needs to be a text string if given. If a string is not available, remove \"groupName\" from props. As a result of this error, tab groups cannot be added nor edited at this time.";
            break;   
        case "ETGMCreateNewGroupModal-118":
            message = "The \"groupCloseAll\" parameter in this.props.data.params needs to be a boolean value (true or false) if given. If such a value is not available, remove \"groupCloseAll\" from props. As a result of this error, tab groups cannot be added nor edited at this time.";
            break;       
        case "ETGMCreateNewGroupModal-119":
            message = "The \"windowAndTabs\" parameter needs to be an object in this.props.data.params, containing information about all windows and tabs in a tab group. If there is no such information available, this parameter should be an empty object. As a result of this error, tab groups cannot be added nor edited at this time.";
            break; 
        case "ETGMCreateNewGroupModal-120":
            message = "The \"groupId\" parameter needs to be a string in this.props.data.params, containing an id string of the requested tab group. If such an id does not exist as a text string, refrain from providing the groupId variable when calling this modal. As a result of this error, the requested tab group cannot be identified and can therefore not be edited.";
            break;       
        case "ETGMCreateNewGroupModal-121":
            message = "The predefined tabs and arrays were provided to this modal in an incorrect format. As a result, no tab groups can be created at this moment.";
            break;                         
        // ETGMRemoveGroupsModal
        case "ETGMRemoveGroupsModal-101":
            message = "The callback parameter is not a function.";
            break;    
        case "ETGMRemoveGroupsModal-102":
            message = "A group id needs to be provided as a text string in order to identify what tab group to delete. If all tab groups are meant to be deleted, please do not provide any group id when calling this modal. As a result of this, no tab groups can be deleted at this point.";
            break;     
        case "ETGMRemoveGroupsModal-103":
            message = "A tab group name needs to be provided to this modal for user convenience. The tab group name needs to be a text string";
            break;         
        // ETGMLaunchGroupsModal
        case "ETGMLaunchGroupsModal-101":
            message = "The callback parameter is not a function.";
            break;        
        case "ETGMLaunchGroupsModal-102":
            message = "A group id needs to be provided as a text string in order to identify which tab group to launch. As no tab group id has been provided, nothing will be launched by this request.";
            break;    
        // COTMRemoveTabModal     
        case "COTMRemoveTabModal-101": 
            message = "The targetted tab could not be identified since its unique identification number is missing or provided in wrong format. This might be caused if the tab information has been modified per request. Please, make sure the tab information has not been modified after being retrieved directly from the browser. As a result, the targetted tab cannot be deleted at this time.";
            break;  
        case "COTMRemoveTabModal-102": 
            message = "No information about the targetted tab could be retrieved, therefore the tab cannot be closed at this point.";
            break; 
        case "COTMRemoveTabModal-103": 
            message = "The callback parameter is not a function.";
            break;   
        case "COTMRemoveTabModal-104": 
            message = "The title of the targetted tab is missing. As the title is missing, other information related to the targetted tab could be missing or incorrect as well. As a precaution, no tab will be deleted as the extension cannot guarantee that the correct tab is targetted.";
            break;  

        // COTMRemoveWindowModal
        case "COTMRemoveWindowModal-101": 
            message = "The targetted window could not be identified since its unique identification number is missing or provided in wrong format. This might be caused if the window information has been modified per request. Please, make sure the window information has not been modified after being retrieved directly from the browser. As a result, the targetted window cannot be deleted at this time.";
            break;   
        case "COTMRemoveWindowModal-102": 
            message = "No information about the targetted window could be retrieved, therefore the window cannot be closed at this point.";
            break;        
        // COTMRemoveUnresponsiveTabs
        case "COTMRemoveUnresponsiveTabs-101":
            message = "The callback parameter is not a function.";
            break;  
        // module.jsx
        case "module-101":
            message = "The componentEvent parameter in handleDragOver() does not target anything."
            break;   
        case "module-102":
            message = "The componentEvent parameter in handleDragOver() is not an object."
            break;     
        case "module-103":
            message = "The componentEvent parameter in handleDrop() does not target anything."
            break;  
        case "module-104":
            message = "The componentEvent parameter in handleDrop() is not an object."
            break; 
        case "module-105":
            message = "The componentEvent parameter in handleDragStart() does not target anything."
            break;  
        case "module-106":
            message = "The componentEvent parameter in handleDragStart() is not an object."
            break;   
        case "module-107":
            message = "The parameters input in changeStateSettings() is not an object."
            break;  
        case "module-108":
            message = "The parameters input in changeStateModuleData() is not an object."
            break; 
        case "module-109":
            message = "The sectionName parameter in createStateModuleDataSection() is not a string consisting of at least 1 character."
            break;
        case "module-verifyProps-101":
            message = "The onRaiseToModal prop of the \"Module\" component is either not a function or is missing."
            break;
        case "module-verifyProps-102":
            message = "The onDragOver prop of the \"Module\" component is either not a function or is missing."
            break;
        case "module-verifyProps-103":
            message = "The onDrop prop of the \"Module\" component is either not a function or is missing."
            break;     
        case "module-verifyProps-104":
            message = "The onDragStart prop of the \"Module\" component is either not a function or is missing."
            break;
        case "module-verifyProps-105":
            message = "The onClick prop of the \"Module\" component is either not a function or is missing."
            break; 
        case "module-verifyProps-106":
            message = "The onRaiseToErrorOverlay prop of the \"Module\" component is either not a function or is missing."
            break; 
        case "module-verifyProps-107":
            message = "The id prop of the \"Module\" component is either not a string or is missing."
            break;     
        case "module-verifyProps-108":
            message = "A settings object is missing in the \"Module\" component."
            break;    
        case "module-verifyProps-109":
            message = "A state object is missing in the \"Module\" component."
            break;    
        case "module-verifyProps-110":
            message = "A dropDownGrid object is missing in the state of the \"Module\" component."
            break;    
        case "module-verifyProps-111":
            message = "A moduleData object is missing in the state of the \"Module\" component."
            break;       
        case "module-verifyProps-112":
            message = "A settings object is missing in the state of the \"Module\" component."
            break;  
        case "module-verifyProps-113":
            message = "The draggedOverModuleId is missing or is not a string in the dropDownGrid located in the state of \"Module\" component."
            break;   
        case "module-verifyProps-114":
            message = "The moduleBeingDraggedId is missing or is not a string in the dropDownGrid located in the state of \"Module\" component."
            break;                       
        // modules/currentlyOpenedTabs
        case "cotm-module-101":
            message = "A settings object is missing in \"CurrentlyOpenedTabsModule\". This object is mandatory for all modules. Please refer to the documentation for more details.";
            break;        
        case "cotm-module-102":
            message = "A moduleTitle key consisting of at least 1 character is missing in the settings object for \"CurrentlyOpenedTabsModule\". This key represents the title of the module, and will be shown as a title to the user.";
            break;      
        case "cotm-module-103":
            message = "The details parameter for the createTabGroup() function must be an object consisting of information about the new tab group.";
            break;
        case "cotm-module-104":
            message = "The details object for the createTabGroup() function must contain a \"windowAndTabs\" key in array format. This array must contain at least 1 object containing information about windows and tabs to base the new tab group on. As a result, your attempt to create a new tab group failed.";
            break; 
        case "cotm-module-105":
            message = "The details object for the createTabGroup() function must contain a \"groupId\" key as a string consisting of at least 1 character. This key should contain any string that is unique only to the tab group being created. This ID is used to target the tab group for e.g. changes or removal. As a result, your attempt to create a new tab group failed.";
            break;   
        case "cotm-module-106":
            message = "The details object for the createTabGroup() function must contain a \"tabGroupName\" key as a string consisting of at least 1 character. This key represents the name of the tab group, which can be whatever for the user's own convenience. As a result, your attempt to create a new tab group failed.";
            break; 
        case "cotm-module-107":
            message = "The details object for the createTabGroup() function must contain a \"tabGroupDescription\" key as a string consisting of at least 1 character. This key represents the description of the tab group, which can be whatever for the user's own convenience. As a result, your attempt to create a new tab group failed.";
            break;   
        case "cotm-module-108":
            message = "The information about currently opened windows and tabs retrieved from the web browser could not be processed by Tabflower. Please, make sure the retrieved information is an object consisting of a key named \"data\" in array format.";
            break;    
        case "cotm-module-109":
            message = "The extension attempts to listen for changes in your current tabs and windows, but your web browser does not support the Webextension API which is required for it to function properly. As a result, information about windows and tabs cannot be retrieved.";
            break;
        // modules/existingTabGroups    
        case "etgm-module-101":
            message = "A settings object is missing in \"ExistingTabGroupsModule\". This object is mandatory for all modules. Please refer to the documentation for more details.";
            break;    
        case "etgm-module-102":
            message = "A moduleTitle key consisting of at least 1 character is missing in the settings object for \"CurrentlyOpenedTabsModule\". This key represents the title of the module, and will be shown as a title to the user.";
            break;   
        case "etgm-module-103":
            message = "In order to launch a tab group, an object containing the target id (also known as \"tabGroupId\") needs to be provided. Since no object with the require information was provided, no tab group will be launched.";
            break;
        case "etgm-module-104":
            message = "In order to target a specific tab group for removal through the removeTabGroups() function, an object containing the tab id key \"groupId\" (string) needs to be provided as a parameter to this function. If no object parameter containing this key is provided, all tab groups will be targetted for removal.";
            break;      
        case "etgm-module-105":
            message = "The details parameter for the createOrEditTabGroup() function must be an object consisting of information about the new tab group. If an existing tab group is being edited, then the information provided should instead represent the tab group to be changed.";
            break;   
        case "etgm-module-106":
            message = "The details object for the createOrEditTabGroup() function must contain a \"windowAndTabs\" key in array format. This array must contain at least 1 object containing information about windows and tabs to base the new tab group on. As a result, your attempt to create a new tab group failed.";
            break; 
        case "etgm-module-107":
            message = "The details object for the createOrEditTabGroup() function must contain a \"groupId\" key as a string consisting of at least 1 character. This key should contain any string that is unique only to the tab group being created. This ID is used to target the tab group for e.g. changes or removal. As a result, your attempt to create a new tab group failed.";
            break;   
        case "etgm-module-108":
            message = "The details object for the createOrEditTabGroup() function must contain a \"tabGroupName\" key as a string consisting of at least 1 character. This key represents the name of the tab group, which can be whatever for the user's own convenience. As a result, your attempt to create a new tab group failed.";
            break; 
        case "etgm-module-109":
            message = "The details object for the createOrEditTabGroup() function must contain a \"tabGroupDescription\" key as a string consisting of at least 1 character. This key represents the description of the tab group, which can be whatever for the user's own convenience. As a result, your attempt to create a new tab group failed.";
            break;
        case "etgm-module-110":
            message = "The attempt to list all tab groups previously saved to the extension failed. This is because the tab/window information was not properly delivered from the browser on request. The information needs to be delivered to Tabflower as an object containing the array key \"data\", where the tab group information is located.";
            break;        
        // modules/aboutTabflower.jsx
        case "atfm-module-101":
            message = "A settings object is missing in \"AboutTabflowerModule\". This object is mandatory for all modules. Please refer to the documentation for more details.";
            break;        
        case "atfm-module-102":
            message = "A moduleTitle key consisting of at least 1 character is missing in the settings object for \"AboutTabflowerModule\". This key represents the title of the module, and will be shown as a title to the user.";
            break; 
        // modules/extensionSettings.jsx
        case "settings-module-101":
            message = "A settings object is missing in \"ExtensionSettingsModule\". This object is mandatory for all modules. Please refer to the documentation for more details.";
            break;        
        case "settings-module-102":
            message = "A moduleTitle key consisting of at least 1 character is missing in the settings object for \"ExtensionSettingsModule\". This key represents the title of the module, and will be shown as a title to the user.";
            break;               
        // views/view.jsx 
        case "view-101":
            message = "The \"onViewMount\" parameter is not set in this view. Any view inserted into Tabflower must have this parameter set as a function.";
            break;  
        // views/tabManagement.jsx
        case "tabManagement-view-101":
            message = "An error has occured when attempting to reload the user interface. However, the requested data changes have been made successfully. Please, reload this page manually to see these changes.";
            break;   
        // views/aboutTabFlower.jsx
        case "aboutTabflower-view-101":
            message = "An error has occured when attempting to reload the user interface. However, the requested data changes have been made successfully. Please, reload this page manually to see these changes.";
            break;  
        // views/settings.jsx
        case "settings-view-101":
            message = "An error has occured when attempting to reload the user interface. However, the requested data changes have been made successfully. Please, reload this page manually to see these changes.";
            break;                                                                                                     
        default:
            message = "An Unknown Error has occured.";
    }

    return {
        name: "ValidatorError",
        message: message,
        code: code
    }
}

export const ExtensionError = (code, data) => {
    let message = "Wooho";
    
    return {
        name: "ExtensionError",
        message: message,
        attachment: data,
        code: code
    }
}

/*
    ErrorHandler()

    Handle error by receiving the error information. 

    Parameters
    - err (object), contains all information related to the error
    - callback (function), triggers immediately. Can be used to notify the user about the error
    - additionalInfo (string), information to be added to the thrown error message 
    (e.g. failure to save data because of error).
*/
export const ErrorHandler = (err, callback, additionalInfo) => {
    if(err.name){
        /*
            An error has apparently occured. If the err object contains
            a "name" property (like this: err.name), this ErrorHandler will
            process it. 

            To prevent ErrorHandler() from processing a custom error, throw that
            error object without using a "name" property.
        */

        if(typeof additionalInfo === "string"){
            if(typeof err.message === "string"){
                err.message += ". " + additionalInfo;
            } else {
                err.message = additionalInfo;
            }
        }

        if(typeof callback === "function"){
            callback(err);
        }

    } else {
        // UNKNOWN ERROR
    }
    
}