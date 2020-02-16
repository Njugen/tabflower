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

        // ETGMCreateNewGroupModal
        case "ETGMCreateNewGroupModal-101": 
            message = "The callback parameter is not a function";
            break;
        case "ETGMCreateNewGroupModal-102": 
            message = "A tab group id must be a string. The tab group could not be created."  
            break;   
        default:
            message = "An Unknown Error has occured";
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
    - error (object), contains all information related to the error
    - action (function), triggers immediately. Can be used to clean up or interrupt current sequence
    - newSequence (function), triggers 1500 ms after the error handler launches. Can be used to notify the user
    once the clean up has been finished
*/
export const ErrorHandler = (err, callback) => {
    if(err.name){
        /*
            An error has apparently occured, however, IF this issue is
            a ValidatorError, in what way should the user get notified???

            during a ValidatorError in the modal component, we just know that a modal
            cannot be executed properly... ????
        */


        if(typeof callback === "function"){
            callback(err);
        }

    } else {
        // UNKNOWN ERROR
    }
    
}