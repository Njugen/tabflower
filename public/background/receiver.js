chrome.runtime.onMessage.addListener(
    (message, sender, sendResponse) => {
        if(typeof message === "object"){
            const { id } = message;

            if(typeof id === "string"){
                /*
                    The message has an id
                */

                if(id === "get-all-tabs"){
                    console.log("sending...response");

                    getAllTabs(
                        (tabs) => {

                            sendResponse(tabs);
                        },
                        (err) => {
                            console.log("ERROR");
                            sendResponse("err");
                        }
                    ) 
                } else {
                    sendResponse();
                }
            }
        }
        return true;
    }
)