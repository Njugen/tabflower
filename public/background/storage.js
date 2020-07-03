const getAllTabGroups = (successCallback, failCallback) => {
  chrome.storage.local.get(["tabGroups"], (data) => {
    if (data && data.tabGroups) {
      successCallback(data.tabGroups);
    } else {
      successCallback([]);
    }
  });
};

const saveTabsToStorage = (groupDetails, successCallback, failCallback) => {
  console.log("TABGROUP", groupDetails);
  chrome.storage.local.get(["tabGroups"], (data) => {
    let updatedTabGroups = data.tabGroups;

    //
    // Add an entirely new tab group if it does not exist
    if (typeof updatedTabGroups !== "undefined") {
      /*
                for(let i = 0; i < updatedTabGroups.length; i++){
                    if(updatedTabGroups[i].groupId === group.groupId){
                        updatedTabGroups[i] = group;
                    }
                } */

      const existingGroupIndex = updatedTabGroups.findIndex(
        (loopGroup, key, groupArray) => {
          return loopGroup.groupId === groupDetails.groupId;
        }
      );

      if (existingGroupIndex > -1) {
        updatedTabGroups[existingGroupIndex] = groupDetails;
      } else {
        updatedTabGroups.push(groupDetails);
      }

      chrome.storage.local.set(
        {
          tabGroups: updatedTabGroups,
        },
        () => {
          successCallback("A new tab group was added to TabFlower");
        }
      );
    } else {
      if (!updatedTabGroups) {
        updatedTabGroups = [];
        updatedTabGroups.push(groupDetails);
      }
      chrome.storage.local.set(
        {
          tabGroups: updatedTabGroups,
        },
        () => {
          successCallback("A new tab group was added to TabFlower");
        }
      );
    }

    chrome.storage.local.set(
      {
        tabGroups: updatedTabGroups,
      },
      () => {
        successCallback("A new tab group was added to TabFlower");
      }
    );
  });

  //
};

const launchTabGroup = (details, successCallback, failCallback) => {
  const requestedGroupId = details.groupId;
  const closeInactiveTabs = details.tabGroupCloseInactiveTabs || false;

  console.log("DE", details);

  const openNewTabGroup = () => {
    chrome.storage.local.get(["tabGroups"], (data) => {
      const storedTabGroup = data.tabGroups.find(
        (item) => requestedGroupId === item.groupId
      );

      // Go through all windows and open new ones based on stored information
      const storedWindows = storedTabGroup.windowAndTabs;

      storedWindows.map((window) => {
        let urls = [];

        for (let i = 0; i < window.tabs.length; i++) {
          urls.push(window.tabs[i].url);
        }

        chrome.windows.create(
          {
            url: urls,
          },
          (createdWindow) => {
            if (closeInactiveTabs === true) {
              const options = {
                windowsAndTabs: [createdWindow],
              };
              setTimeout(() => {
                deleteUnresponsiveTabs(options);
              }, 500);
            }

            saveTabsToStorage(details, () => {
              successCallback("A tabgroup has been launched");
            });
          }
        );

        return null;
      });
    });
  };

  if (details.tabGroupCloseAll && details.tabGroupCloseAll === true) {
    chrome.windows.getAll(
      { windowTypes: ["normal", "popup"] },
      (windowsArray) => {
        const currentWindows = windowsArray;

        currentWindows.map((window, i) => {
          if (i < currentWindows.length - 1) {
            chrome.windows.remove(window.id);
          } else {
            openNewTabGroup();
            setTimeout(() => {
              chrome.windows.remove(window.id);
            }, 500);
          }
        });
      }
    );
  } else {
    openNewTabGroup();
  }
};

const deleteTabGroups = (details, successCallback, failCallback) => {
  if (typeof details.id === "string" && details.id !== "all") {
    chrome.storage.local.get(["tabGroups"], (data) => {
      let currentTabGroups = data.tabGroups;
      let updatedTabGroups = [];

      currentTabGroups.map((item, i) => {
        if (item.groupId !== details.id) {
          updatedTabGroups.push(item);
        }
        return null;
      });

      chrome.storage.local.set(
        {
          tabGroups: updatedTabGroups,
        },
        () => {
          successCallback("asdsad");
        }
      );
    });
  } else if (typeof details.id === "string" && details.id === "all") {
    chrome.storage.local.remove(["tabGroups"], () => {
      successCallback("asdsad");
    });
  }
};

getModuleUISettings = (details, successCallback, failCallback) => {
  console.log("");
  if (details && details.moduleId) {
    chrome.storage.local.get(details.moduleId, (data) => {
      // console.log("XXX", data[details.moduleId]);
      if (data && data[details.moduleId]) {
        successCallback(data[details.moduleId]);
      } else {
        successCallback({});
      }
    });
  }
};

saveModuleUISettings = (details, successCallback, failCallback) => {
  // Get existing settings and update the values
  const window = details;

  console.log("AAA", details);

  getModuleUISettings(details.meta, (settings) => {
    let updatedSettings = settings;
    console.log("MM", details, settings);
    console.log("RRRRR", updatedSettings);
    if (typeof updatedSettings[window.meta.area] !== "object") {
      updatedSettings[window.meta.area] = {
        [window.meta.id]: {},
      };
    }
    console.log("UPDATEDSETTINGS", updatedSettings);
    if (typeof updatedSettings[window.meta.area][window.meta.id] === "object") {
      const optionEntries = Object.entries(window.options);
      const currentEntry = optionEntries[0];
      const key = currentEntry[0];
      const value = currentEntry[1];

      if (typeof window.options[key] === "boolean") {
        if (updatedSettings[window.meta.area][window.meta.id][key] !== value) {
          updatedSettings[window.meta.area][window.meta.id][key] = value;
        }
      }

      /*
      if (typeof window.options.isExpanded === "boolean") {
        if (
          updatedSettings[window.meta.area][window.meta.id].isExpanded !==
          window.options.isExpanded
        ) {
          updatedSettings[window.meta.area][window.meta.id].isExpanded =
            window.options.isExpanded;
        }
      }

      if (typeof window.options.isTabsCrowded === "boolean") {
        if (
          updatedSettings[window.meta.area][window.meta.id].isTabsCrowded !==
          window.options.isTabsCrowded
        ) {
          updatedSettings[window.meta.area][window.meta.id].isTabsCrowded =
            window.options.isTabsCrowded;
        }
      } */
    } else {
      console.log("CCCC");
      updatedSettings[window.meta.area][window.meta.id] = window.options;
    }
    console.log(updatedSettings);
    chrome.storage.local.set(
      {
        [window.meta.moduleId]: updatedSettings,
      },
      () => {
        if (!chrome.runtime.lastError) {
          successCallback();
        }
      }
    );
  });
};
