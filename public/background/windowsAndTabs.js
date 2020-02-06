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

const getAllTabs = (options, successCallback, failCallback) => {
    chrome.tabs.query(
        options,
        (tabs) => {
            if(1 === 2){
                successCallback(tabs);
            } else {
                failCallback("GET ALL TABS FAILED");
            }
        }
    )
}

const deleteTab = (options, successCallback, failCallback) => {
    console.log(options);
    chrome.tabs.remove(
        options.tabId,
        () => {
           successCallback("Tab deleted");
        } 
    )
}

// Windows API

const getAllWindowsAndTabs = (successCallback, failCallback) => {
    const options = {
        populate: true
    }
    
    let gettingWindows = chrome.windows.getAll(
        options, 
        (windows) => {
            successCallback(windows)
        }
    );
}
