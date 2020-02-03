const getAllTabs = (successCallback, errorCallback, timeoutCallback) => {
    let getTabs = chrome.tabs.query(
        {
            currentWindow: true,
            active: true
        },
        (tabs) => {
            successCallback(tabs);
        }
    )
}