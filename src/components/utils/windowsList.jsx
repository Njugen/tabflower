import React, { Component, Fragment } from "react";
import { sendToBackground } from './../../services/webextension/APIBridge';
import TBTextInput from './form/tbTextInput';
import { ValidatorError, ErrorHandler } from './exceptionsAndHandler';
import * as validator from './inputValidators';
import PropTypes from 'prop-types';


class WindowsList extends Component {
    state = {
        newWindow: false,
        newWindowURL: "",
        newTabInContainerIds: false,
        newTabURL: ""
    }

    /*
        Parameters: 
        -   err (object, containing whatever error (1 error) that we want the modal to processs. Mandatory)

        Inform the App component to launch a modal (popup), by raising the error data provided
        in this function's parameter. The parameter will travel through the following components:

        This Modal > Module (any module, this module) > View (any view: this view) > RouteList > App

        All components in this chain will have access to the information raised.
    */
    raiseToErrorOverlay = (err) => {

        const { onRaiseToErrorOverlay } = this.props;

        setTimeout(() => {
                if(typeof onRaiseToErrorOverlay === "function"){
                    onRaiseToErrorOverlay(err);
                }
            },
            1000
        );
    }

    /*
        raiseToModal()

        Parameters: 
        -   data (object, containing whatever data that we want the modal to processs. Mandatory)

        Inform the App component to launch a modal (popup), by raising the data provided
        in this function's parameter. The data parameter will travel through the following components:

            Module (any module, this module) > View (any view: this view) > RouteList > App

        All components in this chain will have access to the information raised.
    */
    raiseToModal = (data) => {
        const { onRaiseToModal } = this.props;

        onRaiseToModal(data);
    }

    /* 

        toggleTabListVisibility()

        Event handler which toggles the visibility of a tab list located in a certain window component. This function
        may also be triggered outside an icon-click event, if preferred.

        Parameters:
        - event (Event object provided by an icon-click event triggering this function. If available, otherwise set to null if run outside an event)
        - windowId (string, mandatory): the id of the window container where the targetted tab list is located
        - forceVisible (boolean, optional): Force the targetted tab list to be visible regardless of circumstances 
    */
    toggleTabListVisibility = (event, windowId, forceVisible) => {
        try {
            const { isString, isUndefined, isBoolean } = validator;

            if(isString(windowId)){
                const windowElement = document.getElementById(windowId);
                const tabList = windowElement.getElementsByClassName("tab-listing")[0];
                
                if(forceVisible && forceVisible === true){
                    tabList.style.display = "block";
                    tabList.classList.remove("tab-listing-hide");
                } else {
                    if(!isUndefined(forceVisible) && !isBoolean(forceVisible)){
                        throw ValidatorError("windowsList-102");
                    }

                    if(tabList.style.display === "none" || tabList.classList.contains("tab-listing-hide")){
                        tabList.style.display = "block";
                        tabList.classList.remove("tab-listing-hide");
                    } else {
                        tabList.style.display = "none";
                        this.cancelNewTab(windowId);
                    }

                    /* Toggle up/down icon of window bar */
                    const iconElement = (event !== null && event.target);
                    
                    if(iconElement){
                        if(iconElement.className.includes("fa-chevron-up")){
                            iconElement.className = "fas fa-chevron-down";
                        } else {
                            iconElement.className = "fas fa-chevron-up";
                        }
                    }
                } 
            } else {
                throw ValidatorError("windowsList-101");
            }
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay); 
        }
   }

   /* 

        toggleTabListStyle()

        Event handler which toggles a window's tab list in the following manner:
        List the tabs horizontally or vertically. Change the col- class of the tab list items
        to accomplish this (no need for css display, as we do want the items to be wider when listed vertically)
        
        Unlike toggleTabListVisibility(), this function should only be used in icon-click events until further notice... 

        Parameters:
        - event (Event object provided by an icon-click event triggering this function. Mandatory)
        - windowId (string, mandatory): the id of the window container where the targetted tab list is located
    */
   toggleTabListStyle = (event, windowId) => {
        try {
            const { isObject, isString } = validator; 
            
            if(!isObject(event) || (isObject(event) && !isObject(event.target))){
                throw ValidatorError("windowsList-103");
            }

            if(!isString(windowId)){
                throw ValidatorError("windowsList-104");
            }


            const windowElement = document.getElementById(windowId);
            const tabList = windowElement.getElementsByClassName("tab-listing")[0];
            let tabListIsHorizontal = tabList.className.includes("horizontal") || (!tabList.className.includes("horizontal") && !tabList.className.includes("vertical"));
            const tabListItems = tabList.getElementsByTagName("li");
           
            for(let i = 0; i < tabListItems.length; i++){
                const isChildOfTabListing = tabListItems[i].parentNode.className.includes("tab-listing");

                if(isChildOfTabListing){
                    if(tabListItems[i].classList.contains("col-3")){
                        tabListItems[i].className = "col-12";
                    } else {
                        tabListItems[i].className = "col-3";
                    }
                }
            }

            if(tabListIsHorizontal){
                tabList.className = tabList.className.replace("horizontal", "vertical");
            } else {
                tabList.className = tabList.className.replace("vertical", "horizontal");
            }

            /* Toggle tab style icon of window bar */
            const iconElement = event.target;

            if(iconElement.className.includes("fas fa-align-justify")){
                iconElement.className = "fas fa-grip-horizontal";
            } else {
                iconElement.className = "fas fa-align-justify";
            }

            /* 
                If the tab list is invisible when changing style, then make it visible at style change. 
                The user needs to observe the changes for the best user experience
            */
            if(tabList.style.display === "none" || tabList.classList.contains("tab-listing-hide")){
                this.toggleTabListVisibility(null, windowId);
                tabList.classList.remove("tab-listing-hide");
            }
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay); 
        }
   }

    closeWindow = (window) => {
        try {
            const { isObject, isNumber } = validator;
            
            if(isObject(window.data)){
                if(isNumber(window.data.id)){
                    sendToBackground("delete-window", { windowId: window.data.id }, (response) => {
                        this.props.refreshList();
                    }); 
                } else {
                    throw ValidatorError("windowsList-106");
                }
            } else {
                throw ValidatorError("windowsList-105");
            }
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay); 
        }
    }

    closeTab = (tab) => {
        try {
            const { isObject, isNumber } = validator;

            if(isObject(tab.data)){
                if(isNumber(tab.data.id)){
                    sendToBackground("delete-tab", { tabId: tab.data.id }, (response) => {
                        this.props.refreshList();
                        //setTimeout(() => this.getOpenedWindowsAndTabs(), 1500)
                    }); 
                } else {
                    throw ValidatorError("windowsList-108");
                }
            } else {
                throw ValidatorError("windowsList-107");
            }

        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay); 
        }
    }

    addNewWindow = (boolInput) => {
        try {
            const { isBoolean } = validator;
            
            if(isBoolean(boolInput)){
                const newWindow = boolInput;
                
                this.setState(
                    {
                        newWindow
                    }
                );
            } else {
                throw ValidatorError("windowsList-109");
            }
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay); 
        }
    }

    addNewTab = (containerId) => {
        try {
            const { isString, isBoolean } = validator;

            if(isString(containerId)){
                let newTabInContainerIds = this.state.newTabInContainerIds;
        
                if(newTabInContainerIds === false){
                    newTabInContainerIds = [];
                } else {
                    newTabInContainerIds = this.state.newTabInContainerIds;
                    
                }

                newTabInContainerIds.push(containerId);
                
                this.setState(
                    {
                        newTabInContainerIds
                    }
                );
            } else {
                if(isBoolean(containerId)){
                    const newTabInContainerIds = containerId;

                    this.setState(
                        {
                            newTabInContainerIds
                        }
                    );
                } else {
                    throw ValidatorError("windowsList-110");
                }
                
            }
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay); 
        }
    }

    cancelNewTab = (containerId) => {
        try {
            const { isString } = validator;
            
            if(isString(containerId)){
                let newTabInContainerIds = this.state.newTabInContainerIds;
                
                if(newTabInContainerIds !== false){
                    if(containerId === "all"){
                        newTabInContainerIds = [];
                    } else {
                        const index = newTabInContainerIds.findIndex((item) => item === containerId);
                        newTabInContainerIds.splice(index, 1);
                    }

                    this.setState(
                        {
                            newTabInContainerIds
                        }
                    );
                }
            } else {
                throw ValidatorError("windowsList-111");
            }
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

    handleAddNewWindowInputChange = (id, value) => {
        try {
            const { isString } = validator;

            if(isString(id)){
                if(isString(value)){
                    const newWindowURL = value;
                    this.setState({ newWindowURL });
                } else {
                    throw ValidatorError("windowsList-113");
                }
            } else {
                throw ValidatorError("windowsList-112");
            }
                
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
        }
           
    }

    handleAddNewTabInputChange = (id, value) => {

        try {
            const { isString } = validator;

            if(isString(id)){
                if(isString(value)){
                    const newTabURL = value;
                    this.setState({ newTabURL });
                } else {
                    throw ValidatorError("windowsList-115");
                }
            } else {
                throw ValidatorError("windowsList-114");
            }
                
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

    raiseNewWindowToModal = (url) => {
        const { onAddNewWindow } = this.props;

        onAddNewWindow(url);
        this.addNewWindow(false);
    }

    raiseNewTabToModal = (url, index, callback) => {
        const { onAddNewTab } = this.props;

        onAddNewTab(url, index);
        this.addNewTab(false);
        callback();
    }

    raiseDeleteTabToModal = (windowIndex, tabIndex, callback) => {
        const { onDeleteTab } = this.props;
        if(typeof onDeleteTab === "function"){
            onDeleteTab(windowIndex, tabIndex);
        }
        callback();
    }

    raiseDeleteWindowToModal = (windowIndex, callback) => {
        const { onDeleteWindow } = this.props;

        if(typeof onDeleteWindow === "function"){
            onDeleteWindow(windowIndex);
        }

        callback();
    }

    renderAddNewWindowForm = () => {
        return (
            <div className="addNewWindowForm">
                <h5>Add new window</h5>
                <TBTextInput id="newWindowURL" label="URL" value={this.state.newWindowURL || "https://"} onChange={(id, value) => this.handleAddNewWindowInputChange(id, value)}></TBTextInput>
                <div className="text-aligner p-3">
                    <button className="btn btn-secondary" onClick={() => this.hideAddNewWindowForm()}>Cancel</button>
                    <button className="btn-tabeon btn" onClick={() => this.raiseNewWindowToModal(this.state.newWindowURL)}>Save window</button>
                </div>
            </div>
        );
    }

    renderAddNewTabForm = (containerId, windowIndex) => {
        this.toggleTabListVisibility(null,  containerId, true)

        return (
            <div className="addNewTabForm">
                <h5>Add new tab to Window {windowIndex + 1}</h5>
                <TBTextInput id="newTabURL" label="URL" value={this.state.newWindowURL || "https://"} onChange={(id, value) => this.handleAddNewTabInputChange(id, value)}></TBTextInput>
                <div className="text-aligner p-3">
                    <button className="btn btn-secondary" onClick={() => this.cancelNewTab(containerId)}>Cancel</button>
                    <button className="btn-tabeon btn" onClick={() => this.raiseNewTabToModal(this.state.newTabURL, windowIndex, () =>{
                        this.cancelNewTab(containerId)
                    })}>Add tab to window</button>
                </div>
            </div>
        )
    }

    hideAddNewWindowForm = () => {
        const newWindow = false;
        this.setState({
            newWindow
        });
    }

    render = () => {
        const { 
            windows,
            canCloseItems,
            initialShowTabs,
            initialTabStyle,
            type
         } = this.props;
         
         const { newWindow } = this.state;
         const { newTabInContainerIds } = this.state;

        if(windows && windows.length > 0){
            return (

                windows.map(
                    (window, key, windowArray) => {
                        const { tabs } = window;
                        const windowContainerId = "window-container-id-" + key;

                        const isAddingNewTab = newTabInContainerIds !== false && newTabInContainerIds.find(
                            (item) => item === windowContainerId
                        ); 

                        
                        
                        const tabList = tabs.map(
                            (tab, tabIndex) => {
                                return (
                                    <li key={"tabindex-" + key + "-" + tabIndex} className={typeof initialTabStyle === "string" && initialTabStyle === "horizontal" ? "col-3" : "col-12"}>
                                        <img src={tab.favIconUrl} alt={""} className="list-item-favicon" />
                                        <span>{tab.title}</span>
                                        <ul className="list-item-options">
                                         {canCloseItems && canCloseItems === true && <li><button className="fas fa-times" onClick={() => 
                                            {
                                                if(type === "existing-group" || type === "new-group"){
                                                    this.raiseDeleteTabToModal(key, tabIndex, () => {});
                                                } else {
                                                    this.raiseToModal({ id: "cotmremovetabmodal", params: { tabInfo: tab }, action: this.closeTab.bind(this)})
                                                }
                                            }
                                         }></button></li>}
                                        </ul>
                                    </li>
                                );
                            }
                        )

                        return (
                            <div className="active-tabs-module" key={"window-" + key}>
                                <ul className="window-listing col-12">
                                    <li className="mt-2" id={windowContainerId}>
                                        <div className="window-header">Window {key+1}
                                            <ul className="list-item-options">
                                                <li><button className="fas fa-align-justify" onClick={(e) => this.toggleTabListStyle(e, windowContainerId)}></button></li>
                                                <li><button disabled={isAddingNewTab ? true : false} className={typeof initialShowTabs === "boolean" && initialShowTabs === false ? "fas fa-chevron-down toggle-window" : "fas fa-chevron-up toggle-window"} onClick={(e) => this.toggleTabListVisibility(e, windowContainerId)}></button></li>
                                                {canCloseItems && canCloseItems === true && <li><button className="fas fa-times" onClick={() => {
                                                    if(type === "existing-group" || type === "new-group"){
                                                        this.raiseDeleteWindowToModal(key, () => {});
                                                    } else {
                                                        this.raiseToModal({id: "cotmremovewindowmodal", params: { windowInfo: window }, action: this.closeWindow.bind(this)})
                                                    }
                                                }}></button></li> }
                                            </ul>
                                        </div>
                                        <ul className={typeof initialShowTabs === "boolean" && initialShowTabs === false ? "tab-listing-hide tab-listing horizontal" : "tab-listing horizontal"}>
                                            {tabList}
                                            {(type && (type === "existing-group" || type === "new-group") && !isAddingNewTab) && <button className="btn-tabeon-reverse btn add-new-tab-button" onClick={() => this.addNewTab(windowContainerId)}>Add new Tab</button>}   
                                        </ul>
                                        {isAddingNewTab && this.renderAddNewTabForm(windowContainerId, key)}
                                        
                                    </li>
                                </ul>
                                {newWindow && newWindow === true  && windowArray.length - 1 === key && this.renderAddNewWindowForm()}
                                {((newWindow && newWindow === false) || !newWindow) && windowArray.length - 1 === key && (type === "existing-group" || type === "new-group") && <button className="btn-tabeon-as-only-child btn add-new-window-button" onClick={() => this.addNewWindow(true)}>Add new window</button>}
                            </div>
                            
                        );
                    } 
                )
            );
        } else {
   
            return (
                <Fragment>
                    {newWindow && newWindow === true && this.renderAddNewWindowForm()}
                    {((newWindow && newWindow === false) || !newWindow) && type && (type === "new-group" || "existing-group") && <button className="btn-tabeon-as-only-child btn" onClick={() => this.addNewWindow(true)}>Add new window</button>}
                </Fragment>
            );
        }
    }
}

WindowsList.propTypes = {
    windows: PropTypes.array.isRequired,
    onAddNewWindow: PropTypes.func,
    onAddNewTab: PropTypes.func,
    onDeleteTab: PropTypes.func,
    OnDeleteWindow: PropTypes.func,
    onRaiseToModal: PropTypes.func,
    canCloseItems: PropTypes.bool.isRequired,
    initialShowTabs: PropTypes.bool.isRequired,
    initialTabStyle: PropTypes.string.isRequired,
    refreshList: PropTypes.func,
    type: PropTypes.string.isRequired
}

WindowsList.defaultProps = {
    type: ""
}


export default WindowsList;