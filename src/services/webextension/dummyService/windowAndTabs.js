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
        data: [{"active":false,"audible":false,"autoDiscardable":true,"discarded":false,"favIconUrl":"https://s.yimg.com/rz/l/favicon.ico","height":1281,"highlighted":false,"id":2,"incognito":false,"index":0,"mutedInfo":{"muted":false},"pinned":false,"selected":false,"status":"complete","title":"Yahoo","url":"https://www.yahoo.com/?fr=fpc-comodo&type=81_25050030006_77.0.3865.120_u_hp_sp","width":2560,"windowId":1},{"active":false,"audible":false,"autoDiscardable":true,"discarded":false,"favIconUrl":"chrome-extension://chphlpgkkbolifaimnlloiipkdnihall/images/extension-icon64.png","height":1329,"highlighted":false,"id":8,"incognito":false,"index":1,"mutedInfo":{"muted":false},"pinned":false,"selected":false,"status":"complete","title":"OneTab","url":"chrome-extension://chphlpgkkbolifaimnlloiipkdnihall/onetab.html","width":2560,"windowId":1},{"active":false,"audible":false,"autoDiscardable":true,"discarded":false,"favIconUrl":"","height":1329,"highlighted":false,"id":9,"incognito":false,"index":2,"mutedInfo":{"muted":false},"pinned":false,"selected":false,"status":"complete","title":"Extensions - Tabeon","url":"chrome://extensions/?id=iofccfgjcakiohdkbplbcajjfedlkjkg","width":2560,"windowId":1},{"active":false,"audible":false,"autoDiscardable":true,"discarded":false,"height":1297,"highlighted":false,"id":15,"incognito":false,"index":3,"mutedInfo":{"muted":false},"pinned":false,"selected":false,"status":"complete","title":"New Tab","url":"chrome://newtab/","width":2560,"windowId":1},{"active":true,"audible":false,"autoDiscardable":true,"discarded":false,"favIconUrl":"chrome-extension://iofccfgjcakiohdkbplbcajjfedlkjkg/favicon.ico","height":1329,"highlighted":true,"id":16,"incognito":false,"index":4,"mutedInfo":{"muted":false},"openerTabId":9,"pinned":false,"selected":true,"status":"complete","title":"React App","url":"chrome-extension://iofccfgjcakiohdkbplbcajjfedlkjkg/index.html#manage","width":2560,"windowId":1}]
    }

    successCallback(response);
}

export const deleteTab = (options, successCallback, failCallback) => {
    successCallback("Tab deleted");
}

export const deleteUnresponsiveTabs = (options, successCallback, failCallback) => {

}


// Windows API

export const getAllWindowsAndTabs = (successCallback, failCallback) => {
    const response = { 
        data: [{"alwaysOnTop":false,"focused":true,"height":1416,"id":1,"incognito":false,"left":1912,"state":"maximized","tabs":[{"active":false,"audible":false,"autoDiscardable":true,"discarded":false,"favIconUrl":"https://s.yimg.com/rz/l/favicon.ico","height":1281,"highlighted":false,"id":2,"incognito":false,"index":0,"mutedInfo":{"muted":false},"pinned":false,"selected":false,"status":"complete","title":"Yahoo","url":"https://www.yahoo.com/?fr=fpc-comodo&type=81_25050030006_77.0.3865.120_u_hp_sp","width":2560,"windowId":1},{"active":false,"audible":false,"autoDiscardable":true,"discarded":false,"favIconUrl":"chrome-extension://chphlpgkkbolifaimnlloiipkdnihall/images/extension-icon64.png","height":1329,"highlighted":false,"id":8,"incognito":false,"index":1,"mutedInfo":{"muted":false},"pinned":false,"selected":false,"status":"complete","title":"OneTab","url":"chrome-extension://chphlpgkkbolifaimnlloiipkdnihall/onetab.html","width":2560,"windowId":1},{"active":false,"audible":false,"autoDiscardable":true,"discarded":false,"favIconUrl":"","height":1329,"highlighted":false,"id":9,"incognito":false,"index":2,"mutedInfo":{"muted":false},"pinned":false,"selected":false,"status":"complete","title":"Extensions - Tabeon","url":"chrome://extensions/?id=iofccfgjcakiohdkbplbcajjfedlkjkg","width":2560,"windowId":1},{"active":true,"audible":false,"autoDiscardable":true,"discarded":false,"favIconUrl":"chrome-extension://iofccfgjcakiohdkbplbcajjfedlkjkg/favicon.ico","height":1329,"highlighted":true,"id":14,"incognito":false,"index":3,"mutedInfo":{"muted":false},"openerTabId":9,"pinned":false,"selected":true,"status":"complete","title":"React App","url":"chrome-extension://iofccfgjcakiohdkbplbcajjfedlkjkg/index.html#manage","width":2560,"windowId":1}],"top":-8,"type":"normal","width":2576}]
    }

    successCallback(response);
}


export const deleteWindow = (options, successCallback, failCallback) => {
    successCallback("Window deleted");
}