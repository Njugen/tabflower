import { getAllTabs, deleteTab, deleteUnresponsiveTabs, getAllWindowsAndTabs, deleteWindow } from './windowAndTabs';
import { getAllTabGroups, saveTabsToStorage, launchTabGroup, deleteTabGroups } from './storage';

export const dummyReceiver = (featureId, detailsObj, forwardSuccessResponse, forwardFailureResponse) => {
    if(featureId === "get-all-tabs"){

        getAllTabs(
            detailsObj,
            (tabs) => {

                forwardSuccessResponse(tabs);
            },
            (message) => {
                console.log("ERROR");
                forwardFailureResponse(message);
            }
        ) 
    } else if(featureId === "get-all-windows-and-tabs"){
        console.log("calling getting all windows and tabs");
        getAllWindowsAndTabs(
            (windows) => {
                
                forwardSuccessResponse(windows);
            },
            (message) => {
                forwardFailureResponse(message);
            }
        )
    } else if(featureId === "delete-tab") {
        deleteTab(
            detailsObj,
            (message) => {
                forwardSuccessResponse(message);
            },
            (message) => {
                forwardFailureResponse(message);
            }
        )
    } else if(featureId === "delete-window"){
        deleteWindow(
            detailsObj,
            (message) => {
                forwardSuccessResponse(message);
            },
            (message) => {
                forwardFailureResponse(message);
            }
        )
    } else if(featureId === "delete-unresponsive-tabs"){
        deleteUnresponsiveTabs(
            detailsObj,
            (message) => {
                forwardSuccessResponse(message)
            },
            (message) => {
                forwardFailureResponse(message);
            }
        )
    } else if(featureId === "save-tab-group"){
        saveTabsToStorage(
            detailsObj,
            (message) => {
                forwardSuccessResponse(message);
            },
            (message) => {
                console.log("FAIL CALLBACK CALLED");
                forwardFailureResponse(message);
            }
        )
    } else if(featureId === "get-all-tab-groups"){
        getAllTabGroups(
            (message) => {
                forwardSuccessResponse(message)
            },
            (message) => {
                forwardFailureResponse(message);
            }
        )
     } else if(featureId === "launch-tab-group"){
         launchTabGroup(
             detailsObj,
             (message) => {
                 forwardSuccessResponse(message)
             },
             (message) => {
                forwardFailureResponse(message);
             }
         )
     } else if(featureId === "delete-tab-groups"){
        deleteTabGroups(
            detailsObj,
             (message) => {
                forwardSuccessResponse(message)
             },
             (message) => {
                forwardFailureResponse(message);
             }
        )
     } else {
        forwardFailureResponse();
    }
}

export default dummyReceiver;