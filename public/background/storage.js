const getAllTabGroups = (successCallback, failCallback) => {
    chrome.storage.local.get(
        ["tabGroups"],
        (data) => {
            if(data && data.tabGroups){
                successCallback(data.tabGroups);
            }
        }
    )
}

const saveTabsToStorage = (group, successCallback, failCallback) => {
    chrome.storage.local.get(
        ["tabGroups"], (data) => {
            let updatedTabGroups = data.tabGroups;
    
            if(!updatedTabGroups){
                updatedTabGroups = [];
                updatedTabGroups.push(group)
            } else {
                updatedTabGroups.push(group);
            }

            console.log("ABC", updatedTabGroups);

            chrome.storage.local.set({
                tabGroups: updatedTabGroups
            }, () => {
                successCallback("A new tab group was added to TabFlower");
            });
        }
    );

//    console.log(options);
} 