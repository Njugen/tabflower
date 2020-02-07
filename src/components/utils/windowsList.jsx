import React, { Component, Fragment } from "react";
import { sendToBackground } from './../../services/webextension/APIBridge';

class WindowsList extends Component {
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

    toggleTabListVisibility = (event, windowId) => {
        /* 
            Toggle tab list visibility: 
            - The tab list may be hidden or visible to the user. Useful for better or less oversight
            depending on user preference.
        */
        const windowElement = document.getElementById(windowId);
        const tabList = windowElement.getElementsByClassName("tab-listing")[0];
        
        if(tabList.style.display === "none" || tabList.classList.contains("tab-listing-hide")){
            tabList.style.display = "block";
            tabList.classList.remove("tab-listing-hide");
        } else {
            tabList.style.display = "none";
        }

        /* Toggle up/down icon of window bar */
        const iconElement = (event !== null && event.target);
        console.log(iconElement.className);
        if(iconElement){
            if(iconElement.className.includes("fa-chevron-up")){
                iconElement.className = "fas fa-chevron-down";
            } else {
                iconElement.className = "fas fa-chevron-up";
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
            if(tabListIsHorizontal){
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

            setTimeout(() => this.getOpenedWindowsAndTabs(), 1500)
            
            
        }); 
    }

    closeTab = (tab) => {
       
        sendToBackground("delete-tab", { tabId: tab.data.id }, (response) => {
            console.log("haha", response);
            
            setTimeout(() => this.getOpenedWindowsAndTabs(), 1500)
        }); 
    }

    render = () => {
        const { 
            windows,
            canCloseItems,
            initialShowTabs,
            initialTabStyle,
            initialWindowExpand
         } = this.props;

        if(windows && windows.length > 0){
            return windows.map(
                (window, key) => {
                    const { tabs } = window;

                    const tabList = tabs.map(
                        (tab) => {
                            return (
                                <li className="col-3">
                                    <img src={tab.favIconUrl} className="list-item-favicon" />
                                    <span>{tab.title}</span>
                                    <ul className="list-item-options">
                                       {canCloseItems && canCloseItems === true && <li><button className="fas fa-times" onClick={() => this.raiseToModal({ id: "cotmremovetabmodal", tabInfo: tab, action: this.closeTab.bind(this)})}></button></li>}
                                    </ul>
                                </li>
                            );
                        }
                    )

                    return (
                        <div className="active-tabs-module">
                            <ul className="window-listing col-12">
                                <li className="mt-2" id={"window-container-id-" + key}>
                                    Window {key}
                                    <ul className="list-item-options">
                                        <li><button className="fas fa-align-justify" onClick={(e) => this.toggleTabListStyle(e, "window-container-id-" + key)}></button></li>
                                        <li><button className={typeof initialShowTabs === "boolean" && initialShowTabs === false ? "fas fa-chevron-down" : "fas fa-chevron-up"} onClick={(e) => this.toggleTabListVisibility(e, "window-container-id-" + key)}></button></li>
                                        {canCloseItems && canCloseItems === true && <li><button className="fas fa-times" onClick={() => this.raiseToModal({id: "cotmremovewindowmodal", windowInfo: window, action: this.closeWindow.bind(this)})}></button></li> }
                                    </ul>
                                    <ul className={typeof initialShowTabs === "boolean" && initialShowTabs === false ? "tab-listing-hide tab-listing horizontal m-4" : "tab-listing horizontal m-4"}>
                                        {tabList}
                                    </ul>   
                                </li>
                            </ul>
                        </div>    
                    );
                }
            )
        } else {
            return null;
        }
    }
}

export default WindowsList;