import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import Module from '../utils/moduleon/module';
import WindowsList from './../utils/windowsList';
import { sendToBackground } from "../../services/webextension/APIBridge";
require("../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css")

class CurrentlyOpenedTabsModule extends Module {
   settings = {
       moduleTitle: "Currently Opened Windows and Tabs"
   }

   createTabGroup = (group) => {
       if(group){
        console.log("DRAGONBALL", group);
       }
       
       sendToBackground("save-tab-group", group.data, (response) => {
           console.log("Spider-man", response);
           const { onRaiseToView } = this.props;

           if(onRaiseToView){
            onRaiseToView("refresh");
           }
       });
   }

    getOpenedWindowsAndTabs = () => {
        sendToBackground("get-all-windows-and-tabs", {}, (response) => {
          
            this.setState({
                moduleData: {
                    openedWindowsAndTabs: response
                }
            });
        });
    }

    
    closeUnresponsiveTabs = (data) => {
        
        sendToBackground("delete-unresponsive-tabs", { windowsAndTabs: this.state.moduleData.openedWindowsAndTabs, timelimit: data.timelimit}, (response) => {
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
                    <WindowsList 
                        windows={this.state.moduleData.openedWindowsAndTabs} 
                        onRaiseToModal={(data) => this.raiseToModal(data)}
                        canCloseItems={true}
                        initialShowTabs={true}
                        initialTabStyle="horizontal"

                    />
                </div>
            </Fragment>
        );
   }

   renderFooter = () => {
        return (
            <Fragment>
                
                    <p class="tabeon-module-footer-text small d-inline-block">Need to archive these windows and tabs for future browsing? Save them to Tab Flower!</p>
                    <button className="btn btn-tabeon d-inline-block" onClick={() => this.raiseToModal({ id: "cotmremoveunresponsivetabsmodal", action: this.closeUnresponsiveTabs.bind(this) })}>Remove unresponsive tabs</button>
                    <button className="btn btn-tabeon d-inline-block" onClick={() => this.raiseToModal({ id: "etgmcreateoreditgroupmodal", params: { windowAndTabs: this.state.moduleData.openedWindowsAndTabs, type: "currently-opened" }, action: this.createTabGroup.bind(this) })}>Add to group</button>
              
            </Fragment>
        );
   }

   
    
}

export default CurrentlyOpenedTabsModule;