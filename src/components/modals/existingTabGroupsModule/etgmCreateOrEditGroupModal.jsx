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

        if(id){
            groupId = id;
        } else {
            groupId = Math.random().toString(36).slice(2);
        }

        return groupId;
    }

    childComponentDidMount = () => {
        this.saveToState("windowAndTabs", this.props.data.params.windowAndTabs);
        this.saveToState("groupId", this.setGroupId(this.props.data.params.id));
    } 

    renderWindowsAndTabsSection = (windowAndTabs, type) => {
        /* 
            situations:
            - currently-opened
            - existing-group
            - new-group
        */
        windowAndTabs = windowAndTabs || [];

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
                            onRaiseToModal={(data) => this.raiseToModal(data)}
                            canCloseItems={false}
                            initialShowTabs={false}
                            initialTabStyle="vertical"
                            type=""
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
                {this.renderWindowsAndTabsSection(windowAndTabs, type)}
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