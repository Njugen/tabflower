/*
    ValidatorError()

    A function returning an object meant to be used for information purposes in the catch-block of a try-catch sequence.
    Throw a ValidatorError() when a necessary if-statement does not comply AND if something needs to be done about it.

    Parameters:
    - code (string, mandatory): A string representing the code of the error occured

    Returns:
    {
        name: "ValidatorError", (String, represents the type of error)
        message: message, (String, An error message to show the user)
        code: code (String, represents the error. Can be used to find the location of where the error occured)
    }
*/
export const ValidatorError = (code) => {
  let message;

  switch (code) {
    // App.js
    case "app-101":
      message =
        'The "callback" parameter in the App component\'s updateState() function needs to be a function, or undefined.';
      break;
    case "app-102":
      message =
        'The "newProps" parameter in the App component\'s updateState() function needs to be a an object (but not an array).';
      break;
    case "app-103":
      message =
        'The "viewProps" parameter in the App component\'s handleNavigation() function needs to be an object (but not an array), containing the following keys: "metaData" (object), "viewData" (object) and "refreshFactor" (number).';
      break;
    case "app-104":
      message =
        'The "viewProps" parameter in the App component\'s handleNavigation() function needs to be a an object (but not an array).';
      break;
    case "app-105":
      message =
        'The "sidebarProps" parameter in the App component\'s handleMainNavBarClick() function needs to be a an object (but not an array).';
      break;
    case "app-106":
      message =
        'The "sidebarProps" parameter in the App component\'s handleMainNavBarClick() function is missing an "activeNavLinkKey" key (as an integer) in its object.';
      break;
    case "app-107":
      message =
        'The "data" parameter in the App component\'s launchModal() function needs to be a an object (but not an array).';
      break;
    case "app-108":
      message =
        'The "data" parameter in the App component\'s launchModal() function does not contain the necessary keys';
      break;
    case "app-109":
      message =
        'The "data" parameter in the App component\'s launchErrorOverlay() function needs to be a an object (but not an array).';
      break;
    case "app-110":
      message =
        'The "data" parameter in the App component\'s launchErrorOverlay() function does not contain the necessary keys';
      break;
    case "app-112":
      message =
        'The "data" parameter in the App component\'s handleRouteListReady() function needs to be an array, with each element being a route object containing at least the following keys: { label: "name of the route", path: "/path of the route", key: index number }';
      break;
    case "app-113":
      message =
        'The "data" parameter in the App component\'s handleRouteListReady() function needs to be an array, containing different route objects';
      break;
    // modal.js
    case "mp-fadeIn-101" || "mp-fadeOut-101":
      message =
        "A style object is missing in the modal's jsx component. Style cannot be set";
      break;
    case "mp-fadeIn-102" || "mp-fadeOut-102":
      message =
        "A reference to the JSX element representing the modal is missing or is invalid";
      break;
    case "mp-clearModalData-103":
      message = "The callback parameter is not a function";
      break;
    case "mp-saveToState-104":
      message = 'The "value" parameter is undefined. Data was not saved';
      break;
    case "mp-saveToState-105":
      message = 'The "area" parameter is not a string. Data was not saved.';
      break;
    case "mp-saveToState-106":
      message = 'The "callback" parameter is not a function';
      break;
    case "mp-saveToState-107":
      message = 'The "area" parameter is not a string. Data was not saved.';
      break;
    case "mp-propsAction-101":
      message =
        "The modal could not execute the requested action connected to it because it is invalid. The task(s) were ignored.";
      break;
    case "mp-propsAction-102":
      message =
        "The modal could not execute any functions because there is none connected to it. The execution attempt was aborted.";
      break;
    case "mp-verifyProps-101":
      message =
        'The "onDismiss" props function is missing in the requested modal. Request aborted.';
      break;
    case "mp-verifyProps-102":
      message =
        'The "onRaiseToErrorOverlay" props function is missing in the requested modal. Request aborted.';
      break;
    case "mp-verifyProps-103":
      message =
        'The "data" props is either not an object, or is missing, in the requested modal. Request aborted.';
      break;
    case "mp-verifyProps-104":
      message =
        'A modal always need to be requested using an "params" object. Request aborted';
      break;
    case "mp-verifyProps-105":
      message =
        'A state object is missing in the "Modal" component. Request aborted';
      break;
    case "mp-verifyProps-106":
      message =
        'A ui object is missing in the state object of the "Modal" component. Request aborted';
      break;
    case "mp-verifyProps-107":
      message =
        'A fieldErrors object is missing in the state object of the "Modal" component. Request aborted';
      break;
    case "mp-verifyProps-108":
      message =
        'The "errorData" parameter in the raiseToErrorOverlay() needs to be an object. The attempt to forward the error data failed';
      break;
    case "mp-verifyProps-109":
      message =
        'The "onRaiseToErrorOverlay" parameter in the <Modal> or its child component needs to be a function. The attempt to forward the error data failed';
      break;
    case "mp-verifyProps-110":
      message =
        'The "errors" parameter in saveFieldErrorsToState() needs to be either an non-array object or undefined';
      break;
    // ETGMCreateNewGroupModal
    case "ETGMCreateNewGroupModal-101":
      message = "The callback parameter is not a function";
      break;
    case "ETGMCreateNewGroupModal-102":
      message =
        "A tab group id must be a string. The requested tab group could not be retrieved.";
      break;
    case "ETGMCreateNewGroupModal-103":
      message = "The URL could not be found";
      break;
    case "ETGMCreateNewGroupModal-104":
      message = "The URL to be loaded needs to be a string";
      break;
    case "ETGMCreateNewGroupModal-105":
      message = "The success parameter needs to be a function for callback";
      break;
    case "ETGMCreateNewGroupModal-106":
      message = "The fail parameter needs to be a function for callback";
      break;
    case "ETGMCreateNewGroupModal-107":
      message =
        "A tab index needs to be a number ranging from 0 to any positive integer.";
      break;
    case "ETGMCreateNewGroupModal-108":
      message = "The URL to be loaded needs to be a string";
      break;
    case "ETGMCreateNewGroupModal-109":
      message =
        "The tabIndex parameter in the deleteTab function needs to be an integer 0 or higher";
      break;
    case "ETGMCreateNewGroupModal-110":
      message =
        "The windowIndex parameter in the deleteTab function needs to be an integer 0 or higher";
      break;
    case "ETGMCreateNewGroupModal-111":
      message =
        "The windowIndex parameter in the deleteWindow function needs to be an integer 0 or higher";
      break;
    case "ETGMCreateNewGroupModal-112":
      message =
        'The "type" parameter in renderWindowsAndTabsSection() needs to be a string. Cannot add nor edit a tab group at this time.';
      break;
    case "ETGMCreateNewGroupModal-113":
      message =
        'The "type" parameter in renderWindowsAndTabsSection() needs to have either of the following values: "currently-opened", "existing-group" or "new-group". Cannot add nor edit a tab group at this time.';
      break;
    case "ETGMCreateNewGroupModal-114":
      message =
        'The "type" parameter in this.props.data.params is neither missing or not a string. As a result, tab groups cannot be added nor edited at this time.';
      break;
    case "ETGMCreateNewGroupModal-115":
      message =
        'The "type" parameter in this.props.data.params needs to have either of the following values: "currently-opened", "existing-group" or "new-group". As a result, tab groups cannot be added nor edited at this time.';
      break;
    case "ETGMCreateNewGroupModal-116":
      message =
        'The "groupName" parameter in this.props.data.params needs to be a text string if given. If a string is not available, remove "groupName" from props. As a result of this error, tab groups cannot be added nor edited at this time.';
      break;
    case "ETGMCreateNewGroupModal-117":
      message =
        'The "groupDescription" parameter in this.props.data.params needs to be a text string if given. If a string is not available, remove "groupDescription" from props. As a result of this error, tab groups cannot be added nor edited at this time.';
      break;
    case "ETGMCreateNewGroupModal-118":
      message =
        'The "groupCloseAll" parameter in this.props.data.params needs to be a boolean value (true or false) if given. If such a value is not available, remove "groupCloseAll" from props. As a result of this error, tab groups cannot be added nor edited at this time.';
      break;
    case "ETGMCreateNewGroupModal-119":
      message =
        'The "windowAndTabs" parameter needs to be an object in this.props.data.params, containing information about all windows and tabs in a tab group. If there is no such information available, this parameter should be an empty object. As a result of this error, tab groups cannot be added nor edited at this time.';
      break;
    case "ETGMCreateNewGroupModal-120":
      message =
        'The "groupId" parameter needs to be a string in this.props.data.params, containing an id string of the requested tab group. If such an id does not exist as a text string, refrain from providing the groupId variable when calling this modal. As a result of this error, the requested tab group cannot be identified and can therefore not be edited.';
      break;
    case "ETGMCreateNewGroupModal-121":
      message =
        "The predefined tabs and arrays were provided to this modal in an incorrect format. As a result, no tab groups can be created at this moment.";
      break;
    case "ETGMCreateNewGroupModal-122":
      message =
        'The "groupCloseInactiveTabs" parameter in this.props.data.params needs to be a boolean value (true or false) if given. If such a value is not available, remove "groupCloseInactiveTabs" from props. As a result of this error, tab groups cannot be added nor edited at this time.';
      break;
    case "ETGMCreateNewGroupModal-123":
      message =
        'The "data" variable either does not currently exist, nor is it currently an object, in this.props';
      break;
    case "ETGMCreateNewGroupModal-124":
      message =
        'The "params" variable either does not currently exist, nor is it currently an object, in this.props.data';
      break;
    case "ETGMCreateNewGroupModal-125":
      message =
        'The "tabGroupDetails" object is missing in the component state, or might already exist but not as a function. Check that this object gets added at component mount.';
      break;
    case "ETGMCreateNewGroupModal-126":
      message =
        'The "success" callback parameter is not a function. Field validation aborted.';
      break;
    case "ETGMCreateNewGroupModal-127":
      message =
        "No information about the targetted tab group could be found. Task aborted.";
      break;
    case "ETGMCreateNewGroupModal-128":
      message =
        "No windows nor tabs in the targetted tab group could be retrieved. Task aborted.";
      break;
    case "ETGMCreateNewGroupModal-129":
      message =
        "The tab arrangement could not be fulfilled at the moment. Please contact the developer.";
      break;
    case "ETGMCreateNewGroupModal-130":
      message = "There are no stored windows to work with.";
      break;
    case "ETGMCreateNewGroupModal-131":
      message = "The targetted window does not exist.";
      break;
    case "ETGMCreateNewGroupModal-132":
      message = "The targetted tab does not exist.";
      break;
    case "ETGMCreateNewGroupModal-133":
      message = "There are no stored windows to work with.";
      break;
    case "ETGMCreateNewGroupModal-134":
      message = "The targetted window does not exist.";
      break;
    case "ETGMCreateNewGroupModal-135":
      message =
        "The required parameters were not provided to the data props of this modal. The attempt to add/modify a tab group is neglected.";
      break;
    case "ETGMCreateNewGroupModal-136":
      message =
        "The data props section is missing or not an object when attempting to add/modify a tab group. The attempt to add/modify a tab group is neglected.";
      break;
    case "ETGMCreateNewGroupModal-137":
      message =
        'The "groupDontAskAgain" parameter in this.props.data.params needs to be a boolean value (true or false) if given. If such a value is not available, remove "groupDontAskAgain" from props. As a result of this error, tab groups cannot be added nor edited at this time.';
      break;
    case "ETGMCreateNewGroupModal-138":
      message =
        "The schedule data retrieved for this modal is either corrupted or stored in the wrong format. The data needs to be an array.";
      break;
    case "ETGMCreateNewGroupModal-139":
      message =
        "The data parameter in renderBodyContents() of ETGMCreateNewGroupModal, needs to be an object";
      break;
    case "ETGMCreateNewGroupModal-140":
      message =
        "The data parameter in renderHeaderContents() of ETGMCreateNewGroupModal, needs to be an object";
      break;
    case "ETGMCreateNewGroupModal-141":
      message =
        "The data parameter in renderFooterContents() of ETGMCreateNewGroupModal, needs to be an object";
      break;
    case "ETGMCreateNewGroupModal-142":
      message = "The necessary info about the targetted tab could not be read.";
      break;
    case "ETGMCreateNewGroupModal-b1":
      message = 'The "data" props is missing or not an object';
      break;
    case "ETGMCreateNewGroupModal-b2":
      message = 'The "fieldErrors" props is missing or not an object';
      break;
    case "ETGMCreateNewGroupModal-b3":
      message = 'The "onChange" props is missing or not a function';
      break;
    case "ETGMCreateNewGroupModal-b4":
      message = 'The "tabGroupDetails" props is missing or not an object';
      break;
    case "ETGMCreateNewGroupModal-b5":
      message =
        'The "params" key in this.props.data is missing or not an object';
      break;
    case "ETGMCreateNewGroupModal-b6":
      message =
        'The "groupName" in this.props.data.params has to be either undefined or a string. All other datatypes are invalid.';
      break;
    case "ETGMCreateNewGroupModal-b7":
      message =
        'The "groupCloseAll" in this.props.data.params has to be either undefined or a boolean (true or false). All other datatypes are invalid.';
      break;
    case "ETGMCreateNewGroupModal-b8":
      message =
        'The "groupCloseInactiveTabs" in this.props.data.params has to be either undefined or a boolean (true or false). All other datatypes are invalid.';
      break;
    case "ETGMCreateNewGroupModal-b9":
      message =
        'The "groupDescription" in this.props.data.params has to be either undefined or a string. All other datatypes are invalid.';
      break;
    case "ETGMCreateNewGroupModal-b10":
      message =
        'The "groupDontAskAgain" in this.props.data.params has to be either undefined or a boolean (true or false). All other datatypes are invalid.';
      break;
    case "ETGMCreateNewGroupModal-b11":
      message =
        'The "type" in this.props.data.params has to be either undefined or a string. All other datatypes are invalid.';
      break;
    case "ETGMCreateNewGroupModal-b12":
      message =
        'If the "type" in this.props.data.params is given as a string, it has to hold one of the following values: "currently-opened", "existing-group" or "new-group". All other datatypes are invalid.';
      break;
    case "ETGMCreateNewGroupModal-b13":
      message =
        "The required parameters were not provided to the data props of this modal. The attempt to add/modify a tab group is neglected.";
      break;
    case "ETGMCreateNewGroupModal-b14":
      message =
        "The data props section is missing or not an object when attempting to add/modify a tab group. The attempt to add/modify a tab group is neglected.";
      break;
    case "ETGMCreateNewGroupModal-f1":
      message = 'The "data" props is missing or not an object';
      break;
    case "ETGMCreateNewGroupModal-f2":
      message = 'The "onConfirm" props is missing or not a function';
      break;
    case "ETGMCreateNewGroupModal-f3":
      message = 'The "onDismiss" props is missing or not a function';
      break;
    case "ETGMCreateNewGroupModal-f4":
      message =
        "The required parameters were not provided to the data props of this modal. The attempt to add/modify a tab group is neglected.";
      break;
    case "ETGMCreateNewGroupModal-f5":
      message =
        "The data props section is missing or not an object when attempting to add/modify a tab group. The attempt to add/modify a tab group is neglected.";
      break;
    case "ETGMCreateNewGroupModal-f6":
      message =
        'The "params" key in the data props is missing or not an object';
      break;
    case "ETGMCreateNewGroupModal-h1":
      message = 'The "data" props is missing or not an object';
      break;
    case "ETGMCreateNewGroupModal-h2":
      message =
        'The "params" key in this.props.data is missing or not an object';
      break;
    case "ETGMCreateNewGroupModal-h3":
      message =
        'The "groupName" in this.props.data.params has to be either undefined or a string. All other datatypes are invalid.';
      break;
    case "ETGMCreateNewGroupModal-h4":
      message =
        'The "type" in this.props.data.params has to be either undefined or a string. All other datatypes are invalid.';
      break;
    case "ETGMCreateNewGroupModal-h5":
      message =
        'If the "type" in this.props.data.params is given as a string, it has to hold one of the following values: "currently-opened", "existing-group" or "new-group". All other datatypes are invalid.';
      break;
    // ETGMRemoveGroupsModal
    case "ETGMRemoveGroupsModal-101":
      message = "The callback parameter is not a function.";
      break;
    case "ETGMRemoveGroupsModal-102":
      message =
        "A group id needs to be provided as a text string in order to identify what tab group to delete. If all tab groups are meant to be deleted, please do not provide any group id when calling this modal. As a result of this, no tab groups can be deleted at this point.";
      break;
    case "ETGMRemoveGroupsModal-103":
      message =
        "A tab group name needs to be provided to this modal for user convenience. The tab group name needs to be a text string";
      break;
    case "ETGMRemoveGroupsModal-104":
      message =
        'The "params" key in this.props.data is not an object. The required parameters could not be read.';
      break;
    case "ETGMRemoveGroupsModal-105":
      message =
        'The "data" key in this.props is not an object. The data key needs to be an object, which provides parameters and other data required by the modal';
      break;
    // ETGMLaunchGroupsModal
    case "ETGMLaunchGroupsModal-101":
      message = "The callback parameter is not a function.";
      break;
    case "ETGMLaunchGroupsModal-102":
      message =
        "A group id needs to be provided as a text string in order to identify which tab group to launch. As no tab group id has been provided, nothing will be launched by this request.";
      break;
    case "ETGMLaunchGroupsModal-103":
      message =
        'The "groupName" parameter in this.props.data.params needs to be a text string if given. As a result of this error, the requested tab group cannot be launched at this time.';
      break;
    case "ETGMLaunchGroupsModal-104":
      message =
        'The "groupDescription" parameter in this.props.data.params needs to be a text string if given. As a result of this error, the requested tab group cannot be launched at this time.';
      break;
    case "ETGMLaunchGroupsModal-105":
      message =
        'The "groupCloseAll" parameter in this.props.data.params needs to be a boolean value (true or false) if given. As a result of this error, the requested tab group cannot be launched at this time.';
      break;
    case "ETGMLaunchGroupsModal-106":
      message =
        'The "groupCloseInactiveTabs" parameter in this.props.data.params needs to be a boolean value (true or false) if given. As a result of this error, the requested tab group cannot be launched at this time.';
      break;
    case "ETGMLaunchGroupsModal-107":
      message =
        'The "windowAndTabs" parameter needs to be an object in this.props.data.params, containing information about all windows and tabs in a tab group. If there is no such information available, this parameter should be an empty object. As a result of this error, the requested tab group cannot be launched at this time.';
      break;
    case "ETGMLaunchGroupsModal-108":
      message =
        'The "params" key in this.props.data is not an object. The required parameters could not be read.';
      break;
    case "ETGMLaunchGroupsModal-109":
      message =
        'The "data" key in this.props is not an object. The data key needs to be an object, which provides parameters and other data required by the modal';
      break;
    case "ETGMLaunchGroupsModal-110":
      message =
        "The data parameter in renderBodyContents() of ETGMCreateNewGroupModal, needs to be an object";
      break;
    case "ETGMLaunchGroupsModal-111":
      message =
        "The data parameter in renderHeaderContents() of ETGMCreateNewGroupModal, needs to be an object";
      break;
    case "ETGMLaunchGroupsModal-112":
      message =
        "The data parameter in renderFooterContents() of ETGMCreateNewGroupModal, needs to be an object";
      break;
    // COTMRemoveTabModal
    case "COTMRemoveTabModal-101":
      message =
        "The targetted tab could not be identified since its unique identification number is missing or provided in wrong format. This might be caused if the tab information has been modified per request. Please, make sure the tab information has not been modified after being retrieved directly from the browser. As a result, the targetted tab cannot be deleted at this time.";
      break;
    case "COTMRemoveTabModal-102":
      message =
        "No data container nor data parameter containers were found in the props, therefore the tab cannot be closed at this point.";
      break;
    case "COTMRemoveTabModal-103":
      message = "The callback parameter is not a function.";
      break;
    case "COTMRemoveTabModal-104":
      message =
        "The title of the targetted tab is missing. As the title is missing, other information related to the targetted tab could be missing or incorrect as well. As a precaution, no tab will be deleted as the extension cannot guarantee that the correct tab is targetted.";
      break;
    case "COTMRemoveTabModal-105":
      message =
        "No information about the targetted tab could be retrieved, therefore the tab cannot be closed at this point.";
      break;
    // COTMRemoveWindowModal
    case "COTMRemoveWindowModal-101":
      message =
        "The targetted window could not be identified since its unique identification number is missing or provided in wrong format. This might be caused if the window information has been modified per request. Please, make sure the window information has not been modified after being retrieved directly from the browser. As a result, the targetted window cannot be deleted at this time.";
      break;
    case "COTMRemoveWindowModal-102":
      message =
        "No specific information about the targetted window could be retrieved, therefore the window cannot be closed at this point.";
      break;
    case "COTMRemoveWindowModal-103":
      message = "The callback function is missing.";
      break;
    case "COTMRemoveWindowModal-104":
      message =
        "No information about the targetted window could be retrieved, therefore the window cannot be closed at this point.";
      break;
    // COTMRemoveUnresponsiveTabs
    case "COTMRemoveUnresponsiveTabs-101":
      message = "The callback parameter is not a function.";
      break;
    // module.jsx
    case "module-101":
      message =
        "The componentEvent parameter in handleDragOver() does not target anything.";
      break;
    case "module-102":
      message =
        "The componentEvent parameter in handleDragOver() is not an object.";
      break;
    case "module-103":
      message =
        "The componentEvent parameter in handleDrop() does not target anything.";
      break;
    case "module-104":
      message =
        "The componentEvent parameter in handleDrop() is not an object.";
      break;
    case "module-105":
      message =
        "The componentEvent parameter in handleDragStart() does not target anything.";
      break;
    case "module-106":
      message =
        "The componentEvent parameter in handleDragStart() is not an object.";
      break;
    case "module-107":
      message =
        "The parameters input in changeStateSettings() is not an object.";
      break;
    case "module-108":
      message =
        "The parameters input in changeStateModuleData() is not an object.";
      break;
    case "module-109":
      message =
        "The sectionName parameter in createStateModuleDataSection() is not a string consisting of at least 1 character.";
      break;
    case "module-110":
      message =
        'The "data" parameter is not set as am object in raiseToErrorOverlay() of the Module component. Information could not be forwarded to the UI.';
      break;
    case "module-111":
      message =
        "The features of the raiseToErrorOverlay() function of the Module component could not be fully executed, because the props onRaiseToErrorOverlay is not a function or is missing.";
      break;
    case "module-112":
      message =
        "The ID of the targetted DOM Element was not provided as expected to the handleDragOver() function of the Module component";
      break;
    case "module-113":
      message =
        "The parentElement of the targetted DOM Element was not provided as expected to the handleDrop() function of the Module component";
      break;
    case "module-114":
      message =
        "The module data section you attempt to add already exists in this component. Attempt aborted.";
      break;
    case "module-115":
      message =
        "The data parameter provided to the raiseToModal() function is not an object.";
      break;
    // utils/moduleon/module.jsx
    case "module-verifyProps-107":
      message =
        'The id prop of the "Module" component is either not a string or is missing.';
      break;
    case "module-verifyProps-108":
      message = 'A title prop is missing in the "Module" component.';
      break;
    case "module-verifyProps-109":
      message =
        "The area parameter in the saveUISettingsToState() function needs to be a string or an object";
      break;
    case "module-verifyProps-110":
      message =
        "The elementId parameter in the saveUISettingsToState() function needs to be a string";
      break;
    case "module-verifyProps-111":
      message =
        "The settings parameter in the saveUISettingsToState() function needs to be an object";
      break;
    case "module-verifyProps-112":
      message =
        "The handleSuccess parameter in the saveUISettingsToState() function needs to be a function, or left as undefined (not specifying anything at all)";
      break;
    case "module-verifyProps-113":
      message =
        "The handleFail parameter in the saveUISettingsToState() function needs to be a function, or left as undefined (not specifying anything at all)";
      break;

    case "module-verifyProps-114":
      message =
        "The area parameter in the saveUISettingsToStorage() function needs to be a string";
      break;
    case "module-verifyProps-115":
      message =
        "The elementId parameter in the saveUISettingsToStorage() function needs to be a string";
      break;
    case "module-verifyProps-116":
      message =
        "The settings parameter in the saveUISettingsToStorage() function needs to be an object";
      break;
    case "module-verifyProps-117":
      message =
        "The handleSuccess parameter in the saveUISettingsToStorage() function needs to be a function, or left as undefined (not specifying anything at all)";
      break;
    case "module-verifyProps-118":
      message =
        "The handleFail parameter in the saveUISettingsToStorage() function needs to be a function, or left as undefined (not specifying anything at all)";
      break;

    case "module-verifyProps-119":
      message =
        "The moduleId parameter in the getUISettingsFromStorage() function needs to be a string.";
      break;
    case "module-verifyProps-120":
      message =
        "The handleSuccess parameter in the getUISettingsFromStorage() function needs to be a function, or left as undefined (not specifying anything at all)";
      break;
    case "module-verifyProps-121":
      message =
        "The handleFail parameter in the getUISettingsFromStorage() function needs to be a function, or left as undefined (not specifying anything at all)";
      break;
    case "module-verifyProps-122":
      message =
        'The successResponse parameter provided by the handleSuccess callback needs to be an object containing a "data" key';
      break;
    case "module-verifyProps-123":
      message =
        "There needs to be a preset uiSettings object in the state of the module.jsx component";
      break;
    case "module-verifyProps-124":
      message =
        'this.state.uiSettings object in the module.jsx component, needs to have a key called "modulecontainer". This key also needs to be an object';
      break;
    case "module-verifyProps-125":
      message =
        'this.state.uiSettings["modulecontainer"] object in the module.jsx component, needs to have a key called "properties" (which can consist of anything of your choosing). This key also needs to be an object';
      break;
    case "module-verifyProps-126":
      message =
        "The state variable needs to be an object in the module.jsx component";
      break;
    case "module-verifyProps-127":
      message =
        'The "refresh" prop of the module.jsx component needs to be a number if used';
      break;
    case "module-verifyProps-128":
      message =
        'The "onRaiseToView" prop of the module.jsx component needs to be a function if used';
      break;
    // modules/currentlyOpenedTabs
    case "cotm-module-101":
      message =
        'The "id" props of the "CurrentlyOpenedTabsModule" component needs to be specified as a string.';
      break;
    case "cotm-module-102":
      message =
        'The "title" props of the "CurrentlyOpenedTabsModule" component needs to be specified as a string.';
      break;
    case "cotm-module-103":
      message =
        "The details parameter for the createTabGroup() function must be an object consisting of information about the new tab group.";
      break;
    case "cotm-module-104":
      message =
        'The details object for the createTabGroup() function must contain a "windowAndTabs" key in array format. This array must contain at least 1 object containing information about windows and tabs to base the new tab group on. As a result, your attempt to create a new tab group failed.';
      break;
    case "cotm-module-105":
      message =
        'The details object for the createTabGroup() function must contain a "groupId" key as a string consisting of at least 1 character. This key should contain any string that is unique only to the tab group being created. This ID is used to target the tab group for e.g. changes or removal. As a result, your attempt to create a new tab group failed.';
      break;
    case "cotm-module-106":
      message =
        'The details object for the createTabGroup() function must contain a "tabGroupName" key as a string consisting of at least 1 character. This key represents the name of the tab group, which can be whatever for the user\'s own convenience. As a result, your attempt to create a new tab group failed.';
      break;
    case "cotm-module-107":
      message =
        'The details object for the createTabGroup() function must contain a "tabGroupDescription" key as a string consisting of at least 1 character. This key represents the description of the tab group, which can be whatever for the user\'s own convenience. As a result, your attempt to create a new tab group failed.';
      break;
    case "cotm-module-108":
      message =
        'The information about currently opened windows and tabs retrieved from the web browser could not be processed by Tabflower. Please, make sure the retrieved information is an object consisting of a key named "data" in array format.';
      break;
    case "cotm-module-109":
      message =
        "The extension attempts to listen for changes in your current tabs and windows, but your web browser does not support the Webextension API which is required for it to function properly. As a result, information about windows and tabs cannot be retrieved.";
      break;
    case "cotm-module-110":
      message =
        'If "refresh" props is specified while using the "CurrentlyOpenedTabsModule" component, that value needs to be a number';
      break;
    case "cotm-module-111":
      message =
        'If "onRaiseToView" props is specified while using the "CurrentlyOpenedTabsModule" component, that value needs to be a function';
      break;
    case "cotm-module-112":
      message =
        'The "windows" parameter in setOpenedWindowsToState() function needs to be an array';
      break;
    // modules/existingTabGroups
    case "etgm-module-101":
      message =
        'The "id" props of the "ExistingTabGroupsModule" component needs to be specified as a string.';
      break;
    case "etgm-module-102":
      message =
        'The "title" props of the "ExistingTabGroupsModule" component needs to be specified as a string.';
      break;
    case "etgm-module-103":
      message =
        'In order to launch a tab group, an object containing the target id (also known as "tabGroupId") needs to be provided. Since no object with the require information was provided, no tab group will be launched.';
      break;
    case "etgm-module-104":
      message =
        'In order to target a specific tab group for removal through the removeTabGroups() function, an object containing the tab id key "groupId" (string) needs to be provided as a parameter to this function. If no object parameter containing this key is provided, all tab groups will be targetted for removal.';
      break;
    case "etgm-module-105":
      message =
        "The details parameter for the createOrEditTabGroup() function must be an object consisting of information about the new tab group. If an existing tab group is being edited, then the information provided should instead represent the tab group to be changed.";
      break;
    case "etgm-module-106":
      message =
        'The details object for the createOrEditTabGroup() function must contain a "windowAndTabs" key in array format. This array must contain at least 1 object containing information about windows and tabs to base the new tab group on. As a result, your attempt to create a new tab group failed.';
      break;
    case "etgm-module-107":
      message =
        'The details object for the createOrEditTabGroup() function must contain a "groupId" key as a string consisting of at least 1 character. This key should contain any string that is unique only to the tab group being created. This ID is used to target the tab group for e.g. changes or removal. As a result, your attempt to create a new tab group failed.';
      break;
    case "etgm-module-108":
      message =
        'The details object for the createOrEditTabGroup() function must contain a "tabGroupName" key as a string consisting of at least 1 character. This key represents the name of the tab group, which can be whatever for the user\'s own convenience. As a result, your attempt to create a new tab group failed.';
      break;
    case "etgm-module-109":
      message =
        'The details object for the createOrEditTabGroup() function must contain a "tabGroupDescription" key as a string consisting of at least 1 character. This key represents the description of the tab group, which can be whatever for the user\'s own convenience. As a result, your attempt to create a new tab group failed.';
      break;
    case "etgm-module-110":
      message =
        'The attempt to list all tab groups previously saved to the extension failed. This is because the tab/window information was not properly delivered from the browser on request. The information needs to be delivered to Tabflower as an object containing the array key "data", where the tab group information is located.';
      break;
    case "etgm-module-111":
      message =
        'If "refresh" props is specified while using the "ExistingTabGroupsModule" component, that value needs to be a number';
      break;
    case "etgm-module-112":
      message =
        'If "onRaiseToView" props is specified while using the "ExistingTabGroupsModule" component, that value needs to be a function';
      break;
    case "etgm-module-113":
      message =
        'The "groups" parameter in setLoadedTabGroupsToState() needs to be an array.';
      break;
    // modules/aboutTabflower.jsx
    case "atfm-module-101":
      message =
        'A settings object is missing in "AboutTabflowerModule". This object is mandatory for all modules. Please refer to the documentation for more details.';
      break;
    case "atfm-module-102":
      message =
        'A moduleTitle key consisting of at least 1 character is missing in the settings object for "AboutTabflowerModule". This key represents the title of the module, and will be shown as a title to the user.';
      break;
    // modules/extensionSettings.jsx
    case "settings-module-101":
      message =
        'A settings object is missing in "ExtensionSettingsModule". This object is mandatory for all modules. Please refer to the documentation for more details.';
      break;
    case "settings-module-102":
      message =
        'A moduleTitle key consisting of at least 1 character is missing in the settings object for "ExtensionSettingsModule". This key represents the title of the module, and will be shown as a title to the user.';
      break;
    // views/view.jsx
    case "view-101":
      message =
        'The "onViewMount" parameter is not set in this view. Any view inserted into Tabflower must have this parameter set as a function.';
      break;
    case "view-102":
      message =
        'The "data" parameter is not set as am object in raiseToErrorOverlay() of the View component. Information could not be forwarded to the UI.';
      break;
    case "view-103":
      message =
        "The features of the raiseToErrorOverlay() function of the View component could not be fully executed, because the props onRaiseToErrorOverlay is not a function or is missing.";
      break;
    case "view-104":
      message =
        'The "data" parameter is not set as an object in raiseToModal() of the View component. Information could not be forwarded to the UI.';
      break;
    case "view-105":
      message =
        "The features of the raiseToModal() function of the View component could not be fully executed, because the props onRaiseToModal is not a function or is missing.";
      break;
    // views/tabManagement.jsx
    case "tabManagement-view-101":
      message =
        "An error has occured when attempting to reload the user interface. However, the requested data changes have been made successfully. Please, reload this page manually to see these changes.";
      break;
    case "tabManagement-view-102":
      message =
        "The command raised to the TabManagementView component could not be executed, because it is invalid.";
      break;
    // views/aboutTabFlower.jsx
    case "aboutTabflower-view-101":
      message =
        "An error has occured when attempting to reload the user interface. However, the requested data changes have been made successfully. Please, reload this page manually to see these changes.";
      break;
    case "aboutTabflower-view-102":
      message =
        "The command raised to the AboutTabFlowerView component could not be executed, because it is invalid.";
      break;
    // views/settings.jsx
    case "settings-view-101":
      message =
        "An error has occured when attempting to reload the user interface. However, the requested data changes have been made successfully. Please, reload this page manually to see these changes.";
      break;
    case "settings-view-102":
      message =
        "The command raised to the SettingsView component could not be executed, because it is invalid.";
      break;
    // utils/windowsList.jsx
    case "windowsList-101":
      message =
        "The window element id is not provided to the toggling function as a string. As a result the requested window is unidentified, the visibility of its tab list can therefore not be toggled";
      break;
    case "windowsList-102":
      message =
        'The "forceVisible" parameter, if provided to the toggling function, needs to be a boolean value (true or false). If no such value can be provided, please remove it from the function call.';
      break;
    case "windowsList-103":
      message =
        "The event object was either not provided nor was not provided in the correct format to the toggling function. The UI style of the tab list can therefore not be changed.";
      break;
    case "windowsList-104":
      message =
        'The "windowId" parameter was not provided to the toggling function. As a result, the requested window cannot be identified, the style of its tab list can therefore not be changed.';
      break;
    case "windowsList-105":
      message =
        "The information (including id etc...) about the targetted window is missing or not provided correctly. As a result, the window cannot be closed at the moment";
      break;
    case "windowsList-106":
      message =
        "The id of the targetted window is missing or not provided as an integer. As a result, the window cannot be closed at the moment";
      break;
    case "windowsList-107":
      message =
        "The information (including id etc...) about the targetted tab is missing or not provided correctly. As a result, the tab cannot be closed at the moment";
      break;
    case "windowsList-108":
      message =
        "The id of the targetted tab is missing or not provided as an integer. As a result, the tab cannot be closed at the moment";
      break;
    case "windowsList-109":
      message =
        'The parameter "boolInput" required by the addNewWindow() function needs to be a boolean value. The request to add a new window to the list was denied.';
      break;
    case "windowsList-110":
      message =
        'The parameter "containerId" required by the addNewTab() function needs to be a string value representing the tab list\'s container, or a boolean value set to false. The request to add a new tab to the window was denied.';
      break;
    case "windowsList-111":
      message =
        'The parameter "containerId" required by the cancelNewTab() function needs to be a string value representing the tab list\'s container. The request to cancel the new tab was successful, but the handling itself is incorrect.';
      break;
    case "windowsList-112":
      message =
        "The text you typed into the textbox was not processed correctly, because the textbox's id is either missing or not a string.";
      break;
    case "windowsList-113":
      message =
        "The text you typed into the textbox was not processed correctly, because it was not interpreted as a text string.";
      break;
    case "windowsList-114":
      message =
        "The text you typed into the textbox was not processed correctly, because the textbox's id is either missing or not a string.";
      break;
    case "windowsList-115":
      message =
        "The text you typed into the textbox was not processed correctly, because it was not interpreted as a text string.";
      break;
    default:
      message = "An Unknown Error has occured.";
  }

  return {
    name: "ValidatorError",
    message: message,
    code: code,
  };
};

export const ExtensionError = (code, data) => {
  let message = "Wooho";

  return {
    name: "ExtensionError",
    message: message,
    attachment: data,
    code: code,
  };
};

/*
    ErrorHandler()

    Handle error by receiving the error information. 

    Parameters
    - err (object), contains all information related to the error
    - callback (function), triggers immediately. Can be used to notify the user about the error
    - additionalInfo (string), information to be added to the thrown error message 
    (e.g. failure to save data because of error).
*/
export const ErrorHandler = (err, callback, additionalInfo) => {
  if (err.name) {
    /*
            An error has apparently occured. If the err object contains
            a "name" property (like this: err.name), this ErrorHandler will
            process it. 

            To prevent ErrorHandler() from processing a custom error, throw that
            error object without using a "name" property.
        */

    if (typeof additionalInfo === "string") {
      if (typeof err.message === "string") {
        err.message += ". " + additionalInfo;
      } else {
        err.message = additionalInfo;
      }
    }

    if (typeof callback === "function") {
      callback(err);
    }
  } else {
    // UNKNOWN ERROR
  }
};
