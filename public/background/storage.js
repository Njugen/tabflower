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