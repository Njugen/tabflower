import { dummyTabGroups } from "./data";

let importedTabGroups = dummyTabGroups;

export const getAllTabGroups = (successCallback, failCallback) => {
  const response = {
    data: importedTabGroups,
  };
  successCallback(response);
};

export const saveTabsToStorage = (
  groupDetails,
  successCallback,
  failCallback
) => {
  const {
    groupId,
    groupDescription,
    groupName,
    groupCloseAll,
    groupCloseInactiveTabs,
    groupDontAskAgain,
    windowCollection,
  } = groupDetails;

  importedTabGroups.push({
    groupId: groupId,
    groupCloseAll: groupCloseAll,
    groupCloseInactiveTabs: groupCloseInactiveTabs,
    groupDontAskAgain: groupDontAskAgain,
    groupDescription: groupDescription,
    groupName: groupName,
    windowCollection: windowCollection,
  });
  successCallback("A new tab group was added to TabFlower");
};

export const launchTabGroup = (details, successCallback, failCallback) => {
  successCallback("This tab group has been launched");
};

export const deleteTabGroups = (details, successCallback, failCallback) => {
  if (typeof details.id === "string" && details.id !== "all") {
    let currentTabGroups = importedTabGroups;
    let updatedTabGroups = [];

    currentTabGroups.map((item, i) => {
      if (item.groupId !== details.id) {
        updatedTabGroups.push(item);
      }
      return null;
    });

    importedTabGroups = updatedTabGroups;
    successCallback("This tab group has been deleted");
  }
};

export const getModuleUISettings = (successCallback, failCallback) => {
  successCallback({
    data: {
      "window-container-id-0": {
        id: "window-container-id-0",
        isExpanded: true,
        isTabsVisible: false,
      },
    },
  });
};

export const saveModuleUISettings = (
  details,
  successCallback,
  failCallback
) => {
  successCallback();
};
