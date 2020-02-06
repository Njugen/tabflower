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

const deleteUnresponsiveTabs = (options, successCallback, failCallback) => {
    console.log("IOI", options);

    const { windowsAndTabs } = options;

    function errorOccuredHandler(details){
        console.log("VV", details);
        if(details.error && details.type === "main_frame"){
            if(details.tabId){
                chrome.tabs.remove(
                    details.tabId
                )
            }
        }
    }

    chrome.webRequest.onErrorOccurred.addListener(errorOccuredHandler,{urls: ["<all_urls>"]});
    setTimeout(() => chrome.webRequest.onErrorOccurred.removeListener(errorOccuredHandler), 2000);

    windowsAndTabs.map(
        (window, i, windowsList) => {
            
            const mapped = window.tabs.map(
                (tab) => {
                    console.log("luise", tab);
                    chrome.tabs.reload(tab.id);
                    if(tab.url === "about:blank" || tab.url.includes("chrome://newtab")){
                        chrome.tabs.remove(
                            tab.id
                        )
                    }
                    return null;
                } 
            );
            return mapped;
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


const deleteWindow = (options, successCallback, failCallback) => {
    console.log(options);
    chrome.windows.remove(
        options.windowId,
        () => {
           successCallback("Tab deleted");
        } 
    )
}