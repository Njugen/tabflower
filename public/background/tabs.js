const getAllTabs = (options, successCallback, errorCallback, timeoutCallback) => {
    let getTabs = chrome.tabs.query(
        options,
        (tabs) => {
            successCallback(tabs);
        }
    )
}

/*
{
            currentWindow: true,
            active: true
        },
*/