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
            successCallback(tabs);

            //failCallback("GET ALL TABS FAILED");
            
        }
    )
}

const deleteTab = (options, successCallback, failCallback) => {
    
    chrome.tabs.remove(
        options.tabId,
        () => {
           successCallback("Tab deleted");
        } 
    )
}

const deleteUnresponsiveTabs = (options, successCallback, failCallback) => {

    const { windowsAndTabs } = options;

    const evaluateTabs = (tabUrl, tabId) => {
        fetch(tabUrl).then((response) => {
            if (!response.ok) {
                throw Error('Something went wrong');
            }
        })
        .catch((error) => {
            chrome.tabs.remove(
                tabId
            )
        });
    }

    windowsAndTabs.map(
        (window, i, windowsList) => {
            console.log(window);
            const mapped = window.tabs.map(
                (tab) => {
                    
                    if(!tab.pendingUrl && (tab.url !== "about:blank" && !tab.url.includes("chrome://newtab"))){
                        evaluateTabs(tab.url, tab.id);
                    } else if(tab.pendingUrl && (tab.pendingUrl !== "about:blank" && !tab.pendingUrl.includes("chrome://newtab"))){
                        evaluateTabs(tab.pendingUrl, tab.id);
                    }

                    if(tab.url === "about:blank" || tab.url.includes("chrome://newtab") || (tab.pendingUrl && tab.pendingUrl.includes("chrome://newtab"))){
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
    
    chrome.windows.remove(
        options.windowId,
        () => {
           successCallback("Window deleted");
        } 
    )
}

/*
    Trigger event listeners
*/

chrome.windows.onRemoved.addListener((windowId) => {
    chrome.runtime.sendMessage({ messageId: "window-tabs-updated" });
})

chrome.windows.onCreated.addListener((window) => {
    chrome.runtime.sendMessage({ messageId: "window-tabs-updated" });
})

chrome.tabs.onCreated.addListener((tab) => {
    chrome.runtime.sendMessage({ messageId: "window-tabs-updated" });
})

chrome.tabs.onMoved.addListener((tab) => {
    chrome.runtime.sendMessage({ messageId: "window-tabs-updated" });
})

chrome.tabs.onDetached.addListener((tab) => {
    chrome.runtime.sendMessage({ messageId: "window-tabs-updated" });
})

chrome.tabs.onRemoved.addListener((tab) => {
    chrome.runtime.sendMessage({ messageId: "window-tabs-updated" });
})

chrome.tabs.onUpdated.addListener((tab) => {
    chrome.runtime.sendMessage({ messageId: "window-tabs-updated" });
})