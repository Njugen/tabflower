export const ValidatorError = (code) => {
    let message;

    switch(code){
        case "mp-fadeIn-101" || "mp-fadeOut-101":
            message = "A style object is missing in the modal's jsx component. Style cannot be set";
            break;
        case "mp-fadeIn-102" || "mp-fadeOut-102":
            message = "A reference to the jsx element representing the modal is missing or is invalid";
            break;  
        default:
            message = "An Unknown Error has occured"
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

        console.log(err);

            if(typeof callback === "function"){
                callback({id: "erroroverlay", error: err });
            }

    } else {
        // UNKNOWN ERROR
    }
    
}