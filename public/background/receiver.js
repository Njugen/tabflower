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
    const bridge() function
    
    This function triggers another function based on featureId. Whichever function gets triggered totally depends on 
    what string featureId holds.

    Params:
        - featureId (string, mandatory): id of the extension background feature you want to call
        More about extension API: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions
        - sendResponse (function, optional): A function which sends response to the sender function

    

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
    by using the "type key". Whether something is a success or a failure is decided by what you want to do. This
    is merely to make it easier to handle the error on the user interface.
    
    - the "message" can be a boolean, null, string, number, object or whatever. If you choose to declare the response
    a failure, you may want to set the "message" key to null. However, sometimes it may be a good idea to return
    a valid message as well, for the sake of error handling and showing the user why something has failed and
    what to do about it.
*/

const receive = (featureId, sendResponse) => {
    if(featureId === "get-all-tabs"){

        getAllTabs(
            (tabs) => {

                sendResponse({
                    success: true,
                    message: tabs
                });
            },
            (err) => {
                console.log("ERROR");
                sendResponse({success: false});
            }
        ) 
    } else {
        sendResponse();
    }
}

chrome.runtime.onMessage.addListener(
    (message, sender, sendResponse) => {
        if(typeof message === "object"){
            const { id } = message;

            if(typeof id === "string"){
                /*
                    The message has an id
                */
                receive(id, sendResponse);
                
            }
        }
        return true;
    }
)