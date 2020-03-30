import React, { Component, Fragment } from "react";
import { sendToBackground } from './../../services/webextension/APIBridge';
import TBTextInput from './form/tbTextInput';

class WindowsList extends Component {
    state = {
        newWindow: false,
        newWindowURL: "",
        newTabInContainerIds: false,
        newTabURL: ""
    }

    raiseToModal = (data) => {
        /*
            Parameters: 
            -   data (object, containing whatever data that we want the modal to processs. Mandatory)

            Inform the App component to launch a modal (popup), by raising the data provided
            in this function's parameter. The data parameter will travel through the following components:

                Module (any module, this module) > View (any view: this view) > RouteList > App

            All components in this chain will have access to the information raised.
        */

        const { onRaiseToModal } = this.props;

        onRaiseToModal(data);
    }

    toggleTabListVisibility = (event, windowId, forceVisible) => {
        /* 
            Toggle tab list visibility: 
            - The tab list may be hidden or visible to the user. Useful for better or less oversight
            depending on user preference.
        */
        
        const windowElement = document.getElementById(windowId);
        const tabList = windowElement.getElementsByClassName("tab-listing")[0];
        
        if(forceVisible && forceVisible === true){
            tabList.style.display = "block";
            tabList.classList.remove("tab-listing-hide");
        } else {
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
   }

   toggleTabListStyle = (event, windowId) => {
        /* 
            Toggle tab list style:
            - List the tabs horizontally or vertically. Change the col- class of the tab list items
            to accomplish this (no need for css display, as we do want the items to be wider when listed vertically)
            
        */
        const windowElement = document.getElementById(windowId);
        const tabList = windowElement.getElementsByClassName("tab-listing")[0];
        let tabListIsHorizontal = tabList.className.includes("horizontal") || (!tabList.className.includes("horizontal") && !tabList.className.includes("vertical"));
        const tabListItems = tabList.getElementsByTagName("li");
        
        for(let i = 0; i < tabListItems.length; i++){
            if(tabListItems[i].classList.contains("col-3")){
                tabListItems[i].className = "col-12";
            } else {
                tabListItems[i].className = "col-3";
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
   }

   closeWindow = (window) => {
       
        sendToBackground("delete-window", { windowId: window.data.id }, (response) => {
            this.props.refreshList();
        }); 
    }

    closeTab = (tab) => {
       
        sendToBackground("delete-tab", { tabId: tab.data.id }, (response) => {
            
            this.props.refreshList();
            //setTimeout(() => this.getOpenedWindowsAndTabs(), 1500)
        }); 
    }

    addNewWindow = (boolInput) => {
        const newWindow = boolInput;
        
        this.setState(
            {
                newWindow
            }
        );
    }

    addNewTab = (containerId) => {
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
    }

    cancelNewTab = (containerId) => {
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
    }

    handleAddNewWindowInputChange = (id, value) => {
        
        const newWindowURL = value;
        this.setState({ newWindowURL });
           
    }

    handleAddNewTabInputChange = (id, value) => {
        
        const newTabURL = value;
        this.setState({ newTabURL });
        
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
                <TBTextInput id="newWindowURL" label="URL" value={this.state.newWindowURL || "http://"} onChange={(id, value) => this.handleAddNewWindowInputChange(id, value)}></TBTextInput>
                <button className="active-tabs-add-button" onClick={() => this.raiseNewWindowToModal(this.state.newWindowURL)}>Save window</button>
            </div>
        );
    }

    renderAddNewTabForm = (containerId, windowIndex) => {
        this.toggleTabListVisibility(null,  containerId, true)

        return (
            <div className="addNewTabForm">
                <TBTextInput id="newTabURL" label="URL" value={this.state.newWindowURL || "http://"} onChange={(id, value) => this.handleAddNewTabInputChange(id, value)}></TBTextInput>
                <button onClick={() => this.cancelNewTab(containerId)}>Cancel</button>
                <button onClick={() => this.raiseNewTabToModal(this.state.newTabURL, windowIndex, () =>{
                    this.cancelNewTab(containerId)
                })}>Add tab to window</button>
            </div>
        )
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
                                    <li key={"tabindex-" + tabIndex} className={typeof initialTabStyle === "string" && initialTabStyle === "horizontal" ? "col-3" : "col-12"}>
                                        <img src={tab.favIconUrl} alt={"Favicon - " + tab.title} className="list-item-favicon" />
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
                                                        this.raiseToModal({id: "cotmremovewindowmodal", params: {}, windowInfo: window, action: this.closeWindow.bind(this)})
                                                    }
                                                }}></button></li> }
                                            </ul>
                                        </div>
                                        <ul className={typeof initialShowTabs === "boolean" && initialShowTabs === false ? "tab-listing-hide tab-listing horizontal" : "tab-listing horizontal"}>
                                            {tabList}
                                        </ul>
                                        {isAddingNewTab && this.renderAddNewTabForm(windowContainerId, key)}
                                        {(type && (type === "existing-group" || type === "new-group") && !isAddingNewTab) && <button className="active-tabs-add-button" onClick={() => this.addNewTab(windowContainerId)}>Add new Tab</button>}   
                                    </li>
                                </ul>
                                {newWindow && newWindow === true  && windowArray.length - 1 === key && this.renderAddNewWindowForm()}
                                {((newWindow && newWindow === false) || !newWindow) && windowArray.length - 1 === key && (type === "existing-group" || type === "new-group") && <button className="active-tabs-add-button" onClick={() => this.addNewWindow(true)}>Add new window</button>}
                            </div>
                            
                        );
                    } 
                )
            );
        } else {
            return (
                <Fragment>
                    {newWindow && newWindow === true && this.renderAddNewWindowForm()}
                    {((newWindow && newWindow === false) || !newWindow) && type && (type === "new-group" || "existing-group") && <button className="active-tabs-add-button" onClick={() => this.addNewWindow(true)}>Add new window</button>}
                </Fragment>
            );
        }
    }
}

export default WindowsList;