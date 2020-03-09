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
            message = "The targetted tab could not be identified since its unique identification number is missing or provided in wrong format. This might be caused if the tab information has been modified per request. Please, make sure the tab information has not been modified after being retrieved directly from the browser. As a result, the requested tab cannot be deleted at this time.";
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
        default:
            message = "An Unknown Error has occured.";
    }

    return {
        name: "ValidatorError",
        message: message,
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