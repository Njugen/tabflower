/*
    sendToBackground() function

    This function sends a request to the background in order to trigger features located in
    the extension background. Read more about this here:
    - https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension
    - https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension#Background_scripts 
    
    This function offers two callbacks to handle possible responses.

    Params:
        - id (string, mandatory): the feature id for the features to trigger. The feature id and the feature functions 
        related to it are defined in receiver.js
        
        - messageObj (object, optional): an object consisting of keys which can be used by the background functions to execute
        their features in a documented manner. From a Tabflower perspective, this object is optional as well as the object keys, 
        however certain features in the Webextension API may demand certain keys/values to be set. Please, refer to the documentation.
        
        - success (function, optional): a callback function meant to be triggered when a response from the background feature
        is deemed a success (responseVariable.success === true). See receiver.js for more information

        - fail (function, optional): a callback function meant to trigger at failure (responseVariable.success === false). Check
        receiver.js for more information

    Example on how to use:

    sendToBackground(
        "get-stored-data",
        {
            username: "thai",
            password: "nguyen",
            other: "whatever else the background operation needs"
        },
        (response) => {
            // Response from the background. Is the background operation successful?
            // if yes, trigger success. If not, trigger fail.

            if(typeof response.success === "boolean"){
                if(response.success === true){ success(response.message) } 
                else if(response.success === fail){
                    fail("This has failed")
                }
            } else {
                response.fail("Could not determine this operation as successful");
            }
        }
    )

    Other notes:

    The sendToBackground() function will automatically send messages to the extension background ONLY if
    this code is run as a webextension or as a temporary webextension in the correct environment (Edge, Firefox or Chrome).
    
    If this code is not run in the correct environment, all background features will simply not workdue to the 
    Webextension API being unavailable. In such case, we could let the function send messages to a dummy API located
    elsewhere, which in turn returns dummy data for testing purposes only.
*/

import { dummyReceiver } from './dummyService/receiver';

export const sendToBackground = (id, messageObj, success, fail) => {
    let bridge = (typeof window.chrome === "undefined" ? null : window.chrome);
    const obj = (typeof messageObj === "object" ? { id: id, details: messageObj } : null);

    if(obj !== null){

        if(bridge !== null){
            // The code is being run as a webextension, the API does exist (npm run build -> load into the browser)
            if(typeof bridge === "object"){
                bridge.runtime.sendMessage(
                    null,
                    obj,
                    (response) => {
                        if(response){
                            if(response.success === true){
                                if(typeof success === "function"){
                                    success(response);
                                }
                            } else if(response.success === false || !response.success){
                                if(typeof fail === "function"){
                                    fail(response)
                                }
                            }
                        } 
                    }
                );
            } else {
                fail("This shit has failed");
            }
        } else {
            // The code is not being run as a webextension (e.g. npm start, as a react app)
            
            bridge = {
                runtime: {
                    sendMessage: (extensionId, message, response) => {
                        // imitate the chrome.runtime.sendMessage() function, read more here: https://developer.chrome.com/extensions/runtime#method-sendMessage
                        dummyReceiver(message.id, message.details || null, response);

                    }
                }
            }

            bridge.runtime.sendMessage(null, obj, (response) => {
                if(typeof success === "function"){
                    success(response);
                }
            });
        }
    } else {
        if(typeof fail === "function"){
            fail("messageObj is not an object");
        }
    }   
}