import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import Module from '../utils/moduleon/module';
import { sendToBackground } from './../../services/webextension/APIBridge';
require("../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css")

class ExistingTabGroupsModule extends Module {
   settings = {
       moduleTitle: "Existing Tab Groups"
   }

   launchTabGroup = (tabGroupId) => {
       if(typeof tabGroupId === "string"){
        // tabGroupId is a string, proceed...
       } else if(typeof tabGroupId !== "string") {
            // There is no valid tab id... show an error message.
       } 
   }

   removeTabGroups = (data) => {
       console.log("TABGROUP", data);

       let groupId = "";
       
       if(data && data.groupId){
           groupId = data.groupId;
       } else {
            groupId = "all"
       }

       sendToBackground("delete-tab-groups", { id: groupId }, (response) => {
           console.log("RESPONSE", this.state);
           this.getAllTabGroups();
        
       });
   }

   createOrEditTabGroup = (details) => {
    if(details){
        console.log("DRAGONBALL", details);
       }
       
       sendToBackground("save-tab-group", details, (response) => {
           console.log("Spider-man", response);
           const { onRaiseToView } = this.props;

           if(onRaiseToView){
            onRaiseToView("refresh");
           }
       });
   }

   getAllTabGroups = () => {
       sendToBackground("get-all-tab-groups", {}, (response) => {
           console.log("GETTING ALL TAB GROUPS");
            this.setState({
                moduleData: {
                    loadedTabGroups: response || []
                }
            }, () => {
                
                console.log("NOM", this.state);
            });

           
       })
   }

   renderTabGroups = () => {
       const tabGroups = this.state.moduleData.loadedTabGroups || [];

       return tabGroups.map(
           (group, i) => {
               return (
                <div className="list-item-block col-3 m-1 p-3">
                    <div className="list-item-block-header mb-3">
                        <h6 className="list-item-block-headline float-left pr-2">{group.tabGroupName}</h6>
                        <div className="list-item-block-options float-right">
                            <button className="fas fa-cog options-button" onClick={() => this.raiseToModal({ id: "etgmcreateoreditgroupmodal", params: { windowAndTabs: group.windowAndTabs, groupName: group.tabGroupName, groupCloseAll: group.tabGroupCloseAll, groupDescription: group.tabGroupDescription, groupId: group.groupId, type: "existing-group"}, action: this.createOrEditTabGroup.bind(this) })}></button>
                            <button className="fas fa-times options-button" onClick={() => this.raiseToModal({ id: "etgmremovegroupsmodal", params: {groupId: group.groupId, groupName: group.tabGroupName}, action: this.removeTabGroups.bind(this) })}></button>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div className="list-item-block-body small pb-3">
                        <p>{group.tabGroupDescription}</p>
                    </div>
                    <div className="list-item-block-footer">
                        <button class="btn btn-tabeon-reverse d-inline-block" onClick={() => this.raiseToModal({ id: "etgmlaunchgroupsmodal", params: { groupId: group.groupId}, action: this.launchTabGroup.bind(this) })}>Launch group</button>
                    </div>
                </div>
               );
           } 
       )
   }

   childComponentDidMount = () => {
       this.getAllTabGroups();
       console.log("UPDATE");
   }

   componentDidUpdate = (prevProps, prevState) => {
       if(prevProps.refresh !== this.props.refresh){
    
        this.getAllTabGroups();
       }
   }

   renderBody = () => {
        return (
            <Fragment>
                <div className="existing-tab-groups-module">
                    <p>
                        To keep the browser's tab bar from overflowing, Tab Flower lets you group windows and tabs together. You may create new tab groups at any time, and launch their tabs in a categorized manner later.
                    </p>
                    <div className="existing-tab-groups-list row d-flex justify-content-center">
                        {this.renderTabGroups()}
                    </div>    
                </div>
            </Fragment>
        );
   }
   
   renderFooter = () => {
        return (    
            <Fragment>
                 
                <button className="btn btn-tabeon d-inline-block" onClick={() => this.raiseToModal({ id: "etgmremovegroupsmodal", params: {}, action: this.removeTabGroups.bind(this) })}>Remove all groups</button>
                <button className="btn btn-tabeon d-inline-block" onClick={() => this.raiseToModal({ id: "etgmcreateoreditgroupmodal", params: { windowAndTabs: {}, type: "new-group" }, action: this.createOrEditTabGroup.bind(this) })}>Create a new group</button>
              
            </Fragment>
        );
   }
    
}

export default ExistingTabGroupsModule;