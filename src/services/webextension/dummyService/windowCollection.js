
import { dummyWindowsAndTabs } from './data';

let importedWindowsAndTabs = dummyWindowsAndTabs;

/*
    getAllTabs

    params:
    - options (object, mandatory): details of what information to get from chrome.tabs.query.abs
    - successCallback (function, optional): a function triggered when the operations are deemed successful
        - e.g. successCallback(response), where response preferably is the feature's return data (the data can
            be anything and can be any datatype)

    - failCallback (function, optional): a function triggered when the operations are deemed as failures
        -
*/

// Tabs API 


export const getAllTabs = (options, successCallback, failCallback) => {
    const response = {
        data: importedWindowsAndTabs
    }

    successCallback(response);
}

export const deleteTab = (options, successCallback, failCallback) => {
    const windowsAndTabs = importedWindowsAndTabs;
    let updatedWindowsAndTabs = [];

    for(let i = 0; i < windowsAndTabs.length; i++){
        let tempTabs = [];

        if(typeof windowsAndTabs[i].tabs === "object" && windowsAndTabs[i].tabs.length > 0){
            for(let j = 0; j < windowsAndTabs[i].tabs.length; j++){
                const thisTab = windowsAndTabs[i].tabs[j];
                
                if(thisTab.id !== options.tabId){
                    tempTabs.push(thisTab);
                }
         
            }
            
            if(tempTabs.length > 0){
                
                windowsAndTabs[i].tabs = tempTabs;
                updatedWindowsAndTabs.push(windowsAndTabs[i]);
            } 
        }
    }

    importedWindowsAndTabs = updatedWindowsAndTabs;
     
    successCallback("Tab deleted");
}

export const deleteUnresponsiveTabs = (options, successCallback, failCallback) => {
    // Simulate tab/window deleting of inactive tabs/windows.
    // In this case, we do not simulate async calls, but instead just shut down about:blank and chrome://newtab tabs

    const windowsAndTabs = importedWindowsAndTabs;
    let updatedWindowsAndTabs = [];
    

    for(let i = 0; i < windowsAndTabs.length; i++){
        let tempTabs = [];

        if(typeof windowsAndTabs[i].tabs === "object" && windowsAndTabs[i].tabs.length > 0){
            for(let j = 0; j < windowsAndTabs[i].tabs.length; j++){
                const thisTab = windowsAndTabs[i].tabs[j];
                
                if(thisTab.url !== "about:blank" && !thisTab.url.includes("chrome://newtab")){
                    tempTabs.push(thisTab);
                }
         
            }

            if(tempTabs.length > 0){
                windowsAndTabs[i].tabs = tempTabs;
                updatedWindowsAndTabs.push(windowsAndTabs[i]);
            } 
        }
    }

    importedWindowsAndTabs = updatedWindowsAndTabs;
    
    successCallback("Simulation of unresponsive tab removal completed.");
}


// Windows API

export const getAllWindowsAndTabs = (successCallback, failCallback) => {
    const response = { 
        data: importedWindowsAndTabs
    }

    successCallback(response);
}


export const deleteWindow = (options, successCallback, failCallback) => {
    const windowsAndTabs = importedWindowsAndTabs;
    let updatedWindowsAndTabs = [];

    for(let i = 0; i < windowsAndTabs.length; i++){
        
        if(windowsAndTabs[i].id && options.windowId && (windowsAndTabs[i].id !== options.windowId)){
            updatedWindowsAndTabs.push(windowsAndTabs[i]);
        }
    }

    importedWindowsAndTabs = updatedWindowsAndTabs;
     
    successCallback("Window deleted");
}