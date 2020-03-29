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
    console.log(options);
    chrome.tabs.remove(
        options.tabId,
        () => {
           successCallback("Tab deleted");
        } 
    )
}

const deleteUnresponsiveTabs = (options, successCallback, failCallback) => {

    const { windowsAndTabs } = options;

    windowsAndTabs.map(
        (window, i, windowsList) => {
            
            const mapped = window.tabs.map(
                (tab) => {
                    console.log("luise", tab);
                    if(tab.url !== "about:blank" && !tab.url.includes("chrome://newtab")){
                        fetch(tab.url).then((response) => {
                            if (!response.ok) {
                                throw Error('Something went wrong');
                            }
                        })
                        .catch((error) => {
                            chrome.tabs.remove(
                                tab.id
                            )
                        });
                    }

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