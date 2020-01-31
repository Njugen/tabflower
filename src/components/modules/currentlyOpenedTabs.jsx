import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import Module from '../utils/moduleon/module';
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
        const iconElement = event.target;

        if(iconElement.className.includes("fa-chevron-up")){
            iconElement.className = "fas fa-chevron-down";
        } else {
            iconElement.className = "fas fa-chevron-up";
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
                tabListItems[i].className = "col-8";
            } else {
                tabListItems[i].className = "col-2";
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
   }

   createTabGroup = (options) => {
        
    }

    removeUnresponsiveTabs = (options) => {

    }

    closeWindow = (windowId) => {

    }

    closeTab = (tabId) => {

    }

   renderBody = () => {
        return (
            <Fragment>
                <div className="active-tabs-module">
                    <p>Tab Flower offers you an oversight over all opened tabs, making it easier
                        to remove tabs and windows you seldom use. You may also scan for unresponsive websites and remove them.
                    </p>
                    <ul className="window-listing col-12">
                        <li className="mt-2" id="jagheterjarmo">Window 1
                            <ul className="list-item-options">
                                <li><button className="fas fa-align-justify" onClick={(e) => this.toggleTabListStyle(e, "jagheterjarmo")}></button></li>
                                <li><button className="fas fa-chevron-up" onClick={(e) => this.toggleTabListVisibility(e, "jagheterjarmo")}></button></li>
                                <li><button className="fas fa-times" onClick={() => this.raiseToModal({id: "cotmremovewindowmodal", action: this.closeWindow.bind(this)})}></button></li>
                                
                            </ul>
                            <ul className="tab-listing horizontal m-4">
                                <li className="col-2">
                                    <span>Tab 1</span>
                                    <ul className="list-item-options">
                                        <li><button className="fas fa-times" onClick={() => this.raiseToModal({ id: "cotmremovetabmodal", action: this.closeTab.bind(this)})}></button></li>
                                    </ul>
                                </li>
                                <li className="col-2">
                                    <span>Tab 2</span>
                                    <ul className="list-item-options">
                                        <li><button className="fas fa-times" onClick={() => this.raiseToModal({ id: "cotmremovetabmodal", action: this.closeTab.bind(this)})}></button></li>
                                    </ul>
                                </li>
                                <li className="col-2">Tab 3</li>
                                <li className="col-2">Tab 2</li>
                                <li className="col-2">Tab 3</li>
                                <li className="col-2">Tab 2</li>
                                <li className="col-2">Tab 3</li>
                            </ul>
                        </li>
                            
                        <li className="mt-2" id="jagheterjarmo2">Window 2
                            <ul className="list-item-options">
                                <li><button className="fas fa-align-justify" onClick={(e) => this.toggleTabListStyle(e, "jagheterjarmo2")}></button></li>
                                <li><button className="fas fa-chevron-up" onClick={(e) => this.toggleTabListVisibility(e, "jagheterjarmo2")}></button></li>
                                <li><button className="fas fa-times" onClick={() => this.raiseToModal({id: "cotmremovewindowmodal", action: this.closeWindow.bind(this)})}></button></li>
                                
                            </ul>
                            <ul className="tab-listing horizontal m-4">
                                <li className="col-2">
                                    <span>Tab 1</span>
                                    <ul className="list-item-options">
                                        <li><button className="fas fa-times" onClick={() => this.raiseToModal({ id: "cotmremovetabmodal", action: this.closeTab.bind(this)})}></button></li>
                                    </ul>
                                </li>
                                <li className="col-2">
                                    <span>Tab 2</span>
                                    <ul className="list-item-options">
                                        <li><button className="fas fa-times" onClick={() => this.raiseToModal({ id: "cotmremovetabmodal", action: this.closeTab.bind(this)})}></button></li>
                                    </ul>
                                </li>
                                <li className="col-2">Tab 3</li>
                                <li className="col-2">Tab 2</li>
                                <li className="col-2">Tab 3</li>
                                <li className="col-2">Tab 2</li>
                                <li className="col-2">Tab 3</li>
                                <li className="col-2">Tab 3</li>
                                <li className="col-2">Tab 2</li>
                                <li className="col-2">Tab 3</li>
                                <li className="col-2">Tab 2</li>
                                <li className="col-2">Tab 3</li>
                            </ul>
                        </li>
                            
                    </ul>
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