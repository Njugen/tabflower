import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import Module from '../utils/moduleon/module';
import { sendToBackground } from "../../services/webextension/APIBridge";
require("../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css")

class CurrentlyOpenedTabsModule extends Module {
   settings = {
       moduleTitle: "Currently Opened Windows and Tabs"
   }

   toggleTabListVisibility = (event, windowId) => {
        /* 
            Toggle tab list visibility: 
            - The tab list may be hidden or visible to the user. Useful for better or less oversight
            depending on user preference.
        */
        const windowElement = document.getElementById(windowId);
        const tabList = windowElement.getElementsByClassName("tab-listing")[0];

        if(tabList.style.display === "none"){
            tabList.style.display = "block";
        } else {
            tabList.style.display = "none";
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
        if(tabList.style.display === "none"){
            this.toggleTabListVisibility(null, windowId);
        }
   }

    createTabGroup = (options) => {
        
    }

    removeUnresponsiveTabs = (options) => {
        console.log("SUPERMAN", options);
    }

    renderOpenedWindowsAndTabs = () => {
        const { moduleData } = this.state;

        if(moduleData.openedWindowsAndTabs && moduleData.openedWindowsAndTabs.length > 0){
            return moduleData.openedWindowsAndTabs.map(
                (window, key) => {
                    const { tabs } = window;

                    const tabList = tabs.map(
                        (tab) => {
                            return (
                                <li className="col-3">
                                    <img src={tab.favIconUrl} className="list-item-favicon" />
                                    <span>{tab.title}</span>
                                    <ul className="list-item-options">
                                        <li><button className="fas fa-times" onClick={() => this.raiseToModal({ id: "cotmremovetabmodal", tabInfo: tab, action: this.closeTab.bind(this)})}></button></li>
                                    </ul>
                                </li>
                            );
                        }
                    )

                    return (
                        <Fragment>
                            <ul className="window-listing col-12">
                                <li className="mt-2" id={"window-container-id-" + key}>
                                    Window {key}
                                    <ul className="list-item-options">
                                        <li><button className="fas fa-align-justify" onClick={(e) => this.toggleTabListStyle(e, "window-container-id-" + key)}></button></li>
                                        <li><button className="fas fa-chevron-up" onClick={(e) => this.toggleTabListVisibility(e, "window-container-id-" + key)}></button></li>
                                        <li><button className="fas fa-times" onClick={() => this.raiseToModal({id: "cotmremovewindowmodal", windowInfo: window, action: this.closeWindow.bind(this)})}></button></li>
                                    </ul>
                                    <ul className="tab-listing horizontal m-4">
                                        {tabList}
                                    </ul>   
                                </li>
                            </ul>
                        </Fragment>    
                    );
                }
            )
        } else {
            return null;
        }
    }

    getOpenedWindowsAndTabs = () => {
        sendToBackground("get-all-windows-and-tabs", {}, (response) => {
            console.log("M", response);
            this.setState({
                moduleData: {
                    openedWindowsAndTabs: response
                }
            }, () => {
                console.log("A", this.state);
            });
            
            
        });
    }

    closeWindow = (window) => {
        console.log("MM", window);
        sendToBackground("delete-window", { windowId: window.data.id }, (response) => {
            console.log("haha", response);
            
            setTimeout(() => this.getOpenedWindowsAndTabs(), 1500)
            
            
        }); 
    }

    closeTab = (tab) => {
        console.log("IRON MAN", tab);
        sendToBackground("delete-tab", { tabId: tab.data.id }, (response) => {
            console.log("haha", response);
            
            setTimeout(() => this.getOpenedWindowsAndTabs(), 1500)
        }); 
    }

    childComponentDidMount = () => {
        this.getOpenedWindowsAndTabs();

        window.addEventListener("focus", this.getOpenedWindowsAndTabs);

        window.addEventListener("mousemove", this.getOpenedWindowsAndTabs);

        window.addEventListener("blur", this.getOpenedWindowsAndTabs);
    }

   componentWillUnmount = () => {
        window.removeEventListener("focus", this.getOpenedWindowsAndTabs);

        window.removeEventListener("mousemove", this.getOpenedWindowsAndTabs);

        window.removeEventListener("blur", this.getOpenedWindowsAndTabs);
   } 

   renderBody = () => {
        return (
            <Fragment>
                <div className="active-tabs-module">
                    <p>Tab Flower offers you an oversight over all opened tabs, making it easier
                        to remove tabs and windows you seldom use. You may also scan for unresponsive websites and remove them.
                    </p>
                    {this.renderOpenedWindowsAndTabs()}
                </div>
            </Fragment>
        );
   }

   renderFooter = () => {
        return (
            <Fragment>
                
                    <p class="tabeon-module-footer-text small d-inline-block">Need to archive these windows and tabs for future browsing? Save them to Tab Flower!</p>
                    <button className="btn btn-tabeon d-inline-block" onClick={() => this.raiseToModal({ id: "cotmremoveunresponsivetabsmodal", params: { windows: {} }, action: this.removeUnresponsiveTabs.bind(this) })}>Remove unresponsive tabs</button>
                    <button className="btn btn-tabeon d-inline-block" onClick={() => this.raiseToModal({ id: "etgmcreateoreditgroupmodal", params: { windows: {} }, action: this.createTabGroup.bind(this) })}>Add to group</button>
              
            </Fragment>
        );
   }

   
    
}

export default CurrentlyOpenedTabsModule;