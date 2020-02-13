import React, { Fragment } from "react";
import Modal from '../modal';
import WindowsList from './../../utils/windowsList';
import { sendToBackground } from "../../../services/webextension/APIBridge";
import TBCheckBox from "../../utils/form/tbCheckbox";
import TBTextInput from './../../utils/form/tbTextInput';
import TBTextArea from './../../utils/form/tbTextArea';

class ETGMCreateNewGroupModal extends Modal {
   

    saveModalHandler = (callback) => {
           
        this.clearModalData(callback(this.state));
    }

    dismissModalHandler = () => {

        this.clearModalData();
    }

    setGroupId = (id) => {
        let groupId = "";
        console.log("SETTING ID", id);
        if(id){
            groupId = id;
        } else {
            groupId = Math.random().toString(36).slice(2);
        }

        return groupId;
    }

    childComponentDidMount = () => {
        this.saveToState("windowAndTabs", this.props.data.params.windowAndTabs);
        this.saveToState("groupId", this.setGroupId(this.props.data.params.groupId));
    } 

    componentWillUnmount = () => {
        console.log("UNMOUNT", this.props.data.params.windowAndTabs);
        
    }

    addNewWindow = (inputUrl) => {
        let windows;
        console.log("VO", this.state.data.windowAndTabs);
        if(Object.keys(this.state.data.windowAndTabs).length > 0){
            windows = [...this.state.data.windowAndTabs];
        } else {
            windows = [];
        }

        console.log("HEH", windows);

        windows.push({
            tabs: [{
                title: "RANDOM",
                favIconUrl: "",
                url: inputUrl
            }]
        })
      
        
        console.log("UI", windows);
        console.log("CD", this.props.data.params.windowAndTabs);
        this.saveToState("windowAndTabs", windows, () => {
            console.log("C", this.props.data.params.windowAndTabs);
        })
        
    }

    addNewTab = (inputUrl, index) => {
        let windows;

        if(Object.keys(this.state.data.windowAndTabs).length > 0){
            windows = [...this.state.data.windowAndTabs];
        } else {
            windows = [];
        }
        console.log("meager", windows[index], index);
        windows[index].tabs.push(
            {
                title: "RANDOM TAB",
                favIconUrl: "",
                url: inputUrl
            }
        )
       

        this.saveToState("windowAndTabs", windows, () => {
            //console.log("CX", this.props.data.params.windowAndTabs);
        }) 
    }

    deleteTab = (windowIndex, tabIndex) => {
        let windows;

        if(Object.keys(this.state.data.windowAndTabs).length > 0){
            windows = [...this.state.data.windowAndTabs];
            console.log("UID", windows, windowIndex);
            windows[windowIndex].tabs.splice(tabIndex, 1);

            if(windowIndex === 0 && windows[windowIndex].tabs.length < 1){
                windows.splice(windowIndex, 1);
            }

            this.saveToState("windowAndTabs", windows, () => {
                //console.log("CX", this.props.data.params.windowAndTabs);
            }) 
        }

        
    }

    deleteWindow = (windowIndex) => {
        let windows;

        if(Object.keys(this.state.data.windowAndTabs).length > 0){
            windows = [...this.state.data.windowAndTabs];
            console.log("UID", windows, windowIndex);
            windows.splice(windowIndex, 1);

            this.saveToState("windowAndTabs", windows, () => {
                //console.log("CX", this.props.data.params.windowAndTabs);
            }) 
        }

        
    }

    renderWindowsAndTabsSection = (windowAndTabs, type) => {
        /* 
           types:
            - currently-opened
            - existing-group
            - new-group
        */
        windowAndTabs = windowAndTabs || [];
        console.log("WINDOWS", windowAndTabs);
        return (
            <div className="tb-windowlist-container">
                <div className="tb-form-row row">
                    <div className="col-8 label mb-0">
                        <span>
                            { type === "currently-opened" && "Currently opened windows and tabs" }
                            { type === "existing-group" && "Edit the windows and tabs in this group" }
                            { type === "new-group" && "And windows or tabs to this new group" }
                        </span>
                    </div>
                    
                </div>
                <div className="tb-form-row row mr-1 mb-1 ml-1 mt-0">
                    <div className="col-12 mt-0">
                        <WindowsList 
                            windows={windowAndTabs} 
                            onAddNewWindow={(data) => this.addNewWindow(data)}
                            onAddNewTab={(data, index) => this.addNewTab(data, index)}
                            onDeleteTab={(windowIndex, tabIndex) => this.deleteTab(windowIndex, tabIndex)}
                            onDeleteWindow={(windowIndex) => this.deleteWindow(windowIndex)}
                            canCloseItems={type === "existing-group" || type === "new-group" ? true : false}
                            initialShowTabs={false}
                            initialTabStyle="vertical"
                            type={this.props.data.params.type}
                        />
                    </div>
                </div>    
            </div>
        )
    }

    renderModalBody(){
        const { 
            windowAndTabs,
            groupName: name,
            groupCloseAll: closeAll,
            groupDescription: description,
            type
        } = this.props.data.params;

        return (
            <Fragment>
                <TBTextInput id="tabGroupName" label="Group Name" value={name ? name : ""} onChange={(id, value) => this.saveToState(id, value)}></TBTextInput>
                <TBTextArea id="tabGroupDescription" label="Description (max 170 characters)" value={description ? description : ""} onChange={(id, value) => this.saveToState(id, value)}></TBTextArea>
                <TBCheckBox id="tabGroupCloseAll" label="Close everything else before launching this tab group" value={closeAll && closeAll === true ? "true" : "false"} onToggle={(id, value) => this.saveToState(id, value)} />
                {this.renderWindowsAndTabsSection(this.state.data.windowAndTabs, type)}
            </Fragment>
        );    
    }

    renderModalHeader(){
        const { type, groupName } = this.props.data.params;

        if(type === "currently-opened" || type === "new-group"){
            return "Create a New Tab Group";
        } else if(type === "existing-group") {
            return "Edit the \"" + groupName + "\" tab group";
        }
    }
}

export default ETGMCreateNewGroupModal;