const getAllTabGroups = (successCallback, failCallback) => {
    chrome.storage.local.get(
        ["tabGroups"],
        (data) => {
            if(data && data.tabGroups){
                successCallback(data.tabGroups);
            } else {
                successCallback([]);
            }
        }
    )
}

const saveTabsToStorage = (group, successCallback, failCallback) => {
    chrome.storage.local.get(
        ["tabGroups"], (data) => {
            let updatedTabGroups = data.tabGroups;
            
           // console.log(updatedTabGroups);
            // Add an entirely new tab group if it does not exist
            if(typeof updatedTabGroups !== "undefined"){
                /*
                for(let i = 0; i < updatedTabGroups.length; i++){
                    if(updatedTabGroups[i].groupId === group.groupId){
                        updatedTabGroups[i] = group;
                    }
                } */

                const existingGroupIndex = updatedTabGroups.findIndex(
                    (loopGroup, key, groupArray) => {
                        return loopGroup.groupId === group.groupId
                    }
                )
                
                if(existingGroupIndex > -1){
                    updatedTabGroups[existingGroupIndex] = group;
                } else {
                    updatedTabGroups.push(group);
                }

                chrome.storage.local.set({
                    tabGroups: updatedTabGroups
                }, () => {
                    successCallback("A new tab group was added to TabFlower");
                });
            } else {
                if(!updatedTabGroups){
                    updatedTabGroups = [];
                    updatedTabGroups.push(group)
                }
                chrome.storage.local.set({
                    tabGroups: updatedTabGroups
                }, () => {
                    successCallback("A new tab group was added to TabFlower");
                });
            }
           
            chrome.storage.local.set({
                tabGroups: updatedTabGroups
            }, () => {
                successCallback("A new tab group was added to TabFlower");
            });

            console.log("ABC", updatedTabGroups);

            
        }
    );

//    console.log(options);
} 

const launchTabGroup = (details, successCallback, failCallback) => {
    const requestedGroupId = details.groupId;

    chrome.storage.local.get(["tabGroups"], (data) => {
        const storedTabGroup = data.tabGroups.find((item) => requestedGroupId === item.groupId);
        console.log("M", storedTabGroup); 

        // Go through all windows and open new ones based on stored information
        const storedWindows = storedTabGroup.windowAndTabs;

        storedWindows.map((window) => {
            let urls = [];

            for(let i = 0; i < window.tabs.length; i++){
                urls.push(window.tabs[i].url);
            }

            chrome.windows.create({
                url: urls
            })

            return null;
        });
    });

}

const deleteTabGroups = (details, successCallback, failCallback) => {
    console.log(details);
    if(typeof details.id === "number"){

    } else if(typeof details.id === "string" && details.id === "all"){
        chrome.storage.local.remove(["tabGroups"], () => {
            console.log("TEST");
            successCallback("asdsad");
        });
    }
}