export const sendToBackground = (id, messageObj, success, fail, timeout) => {
    const bridge = (typeof window.chrome === "undefined" ? null : window.chrome);

    if(typeof messageObj === "object"){
        const obj = {
            id: id,
            ...messageObj
        }

        if(typeof bridge === "object"){
            bridge.runtime.sendMessage(
                null,
                obj,
                function(response){
                    console.log("RESPONSE RECEIVED", response)
                    if(response){
                        if(response.success === true){
                            console.log("SUCCESS");
                            success(response.message);
                        } else if(response.success === false){
                            fail("Response could not be received")
                        }
                    } 
                }
            );
        } else {
            fail("This shit has failed");
        }
    } else {
        fail("messageObj is not an object");
    }

}