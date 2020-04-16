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

const saveTabsToStorage = (groupDetails, successCallback, failCallback) => {

    chrome.storage.local.get(
        ["tabGroups"], (data) => {
            let updatedTabGroups = data.tabGroups;
            
           // 
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
                        return loopGroup.groupId === groupDetails.groupId
                    }
                )
                
                if(existingGroupIndex > -1){
                    updatedTabGroups[existingGroupIndex] = groupDetails;
                } else {
                    updatedTabGroups.push(groupDetails);
                }

                chrome.storage.local.set({
                    tabGroups: updatedTabGroups
                }, () => {
                    successCallback("A new tab group was added to TabFlower");
                });
            } else {
                if(!updatedTabGroups){
                    updatedTabGroups = [];
                    updatedTabGroups.push(groupDetails)
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

            

            
        }
    );

//    
} 

const launchTabGroup = (details, successCallback, failCallback) => {
    const requestedGroupId = details.groupId;
    console.log(details);
    const openNewTabGroup = () => {
        chrome.storage.local.get(["tabGroups"], (data) => {
            const storedTabGroup = data.tabGroups.find((item) => requestedGroupId === item.groupId);
            

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

    if(details.tabGroupCloseAll && details.tabGroupCloseAll === true){
        chrome.windows.getAll({ windowTypes: ['normal', 'popup'] }, (windowsArray) => {
            const currentWindows = windowsArray;
            
            currentWindows.map((window, i) => {
                if(i < currentWindows.length-1){
                    chrome.windows.remove(window.id);
                } else {
                    openNewTabGroup();
                    setTimeout(() => {
                        chrome.windows.remove(window.id);
                    }, 500)
                }
                
            });
        });
    } else {
        openNewTabGroup();
    }

}

const deleteTabGroups = (details, successCallback, failCallback) => {
    
    if(typeof details.id === "string" && details.id !== "all"){

        chrome.storage.local.get(["tabGroups"], (data) => {
            let currentTabGroups = data.tabGroups;
            let updatedTabGroups = [];

            currentTabGroups.map(
                (item, i) => {
                    if(item.groupId !== details.id){
                        updatedTabGroups.push(item);
                    }
                    return null;
                }
            )
            

        
            chrome.storage.local.set({
                tabGroups: updatedTabGroups
            }, () => {
                successCallback("asdsad");
            })
        
        })  

    } else if(typeof details.id === "string" && details.id === "all"){
        chrome.storage.local.remove(["tabGroups"], () => {

            successCallback("asdsad");
        });
    }
}