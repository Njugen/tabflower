import { dummyTabGroups } from "./data";

let importedTabGroups = dummyTabGroups;

export const getAllTabGroups = (successCallback, failCallback) => {
    const response = {
        data: importedTabGroups
    }
    successCallback(response);
}

export const saveTabsToStorage = (groupDetails, successCallback, failCallback) => {
    const { groupId, tabGroupDescription, tabGroupName, tabGroupCloseAll, windowAndTabs } = groupDetails;

    importedTabGroups.push(
        {
            "groupId": groupId,
            "tabGroupCloseAll": tabGroupCloseAll,
            "tabGroupDescription": tabGroupDescription,
            "tabGroupName": tabGroupName,
            "windowAndTabs": windowAndTabs
        }
    )
    successCallback("A new tab group was added to TabFlower");
} 

export const launchTabGroup = (details, successCallback, failCallback) => {
    successCallback("This tab group has been launched");
}

export const deleteTabGroups = (details, successCallback, failCallback) => {
    console.log("TO-DELETE", details);
    if(typeof details.id === "string" && details.id !== "all"){
        let currentTabGroups = importedTabGroups;
        let updatedTabGroups = [];

        currentTabGroups.map(
            (item, i) => {
                if(item.groupId !== details.id){
                    updatedTabGroups.push(item);
                }
                return null;
            }
        )

        importedTabGroups = updatedTabGroups;
        successCallback("This tab group has been deleted");
    }
    
}