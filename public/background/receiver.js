/*
    receiver.js is run in the extension manifest and should not be included as an import/requested function in other
    js/jsx files. Example:

    manifest.js:

    "background": {
        "scripts": [
            "background/receiver.js"
        ],
        "persistent": true
    }
*/

/*
    The receive() function
    
    This function triggers another function based on featureId. Whichever function gets triggered totally depends on 
    what string featureId holds.

    Params:
        - featureId (string, mandatory): id of the extension background feature you want to call
        More about extension API: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtension
        - detailsObj (obj or null, optional): details from the sender, which the background operation might need
        in order to execute its features.
        - onSendResponse (function, optional): A function which sends response to the sender function

    

    More about the sendResponse() function
    
    The sendResponse function sends a response to the sender. The response is delivered as a parameter in the callback function of
    chrome.runtime.sendMessage. A response can be whatever (string, object, number etc), but in TabFlower try to be
    consistent when sending a response. Try to make the response variable have the following structure:
    
    sendResponse(responseVariable), where 

    responseVariable = {
        success: true || fail, // (bool)
        message: { data: "" }, // ("message" key may be whatever)
    }

    - try to make the responseVariable tell the sender whether something in the background failed or not 
    by using the "success" key. Whether something is a success or a failure is decided by what you want to do and what
    results you consider to be a failure or success. This is merely to make it easier to decide whether to handle errors
    on the client side or not.
    
    - the "message" can be a boolean, null, string, number, object or whatever value which can be used on the client side. 
    If you choose to declare the response a failure, you may want to set the "message" key to null. However, sometimes it may 
    be a good idea to return a valid message as well even if something is declared a failure, for the sake of error handling 
    and showing the user why something has failed and what to do about it.
*/

const receive = (featureId, detailsObj, forwardResponse) => {
    if(featureId === "get-all-tabs"){

        getAllTabs(
            detailsObj,
            (tabs) => {

                forwardResponse(tabs);
            },
            (err) => {
                console.log("ERROR");
                forwardResponse(null, err);
            }
        ) 
    } else if(featureId === "get-all-windows-and-tabs"){
        getAllWindowsAndTabs(
            (windows) => {
                forwardResponse(windows);
            },
            (err) => {
                console.log("TRIED to get all windows and tabs");
            }
        )
    } else if(featureId === "delete-tab") {
        deleteTab(
            detailsObj,
            (message) => {
                forwardResponse(message);
            },
            () => {
                console.log("FAILDED TO REMOVE TAB");
            }
        )
    } else if(featureId === "delete-window"){
        deleteWindow(
            detailsObj,
            (message) => {
                forwardResponse(message);
            },
            () => {
                console.log("FAILDED TO REMOVE TAB");
            }
        )
    } else if(featureId === "delete-unresponsive-tabs"){
        deleteUnresponsiveTabs(
            detailsObj,
            (message) => {
                forwardResponse(message)
            },
            () => {
                console.log("-");
            }
        )
    } else if(featureId === "save-tab-group"){
        saveTabsToStorage(
            detailsObj,
            (message) => {
                forwardResponse(message);
            }
        )
    } else if(featureId === "get-all-tab-groups"){
        getAllTabGroups(
            (message) => {
                forwardResponse(message)
            },
            () => {

            }
        )
     }else {
        forwardResponse();
    }
}

chrome.runtime.onMessage.addListener(
    (message, sender, sendResponse) => {
        const manageResponse = (successMessage, failMessage) => {
            let response;
            if(successMessage && !failMessage){
                response = {
                    success: true,
                    data: successMessage
                };
            }

            if(failMessage && !successMessage){
                response = {
                    success: false,
                    data: failMessage
                };
            }
            
            sendResponse(response);
        }

        if(typeof message === "object"){
            const { id, details } = message;

            if(typeof id === "string"){
                /*
                    The message has an id
                */
                receive(id, details || null, manageResponse);
                
            }
        }
        return true;
    }
)