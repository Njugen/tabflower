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
        this.saveToState("windowsAndTabs", this.props.data.params.windowAndTabs);
        this.saveToState("groupId", this.setGroupId(this.props.data.params.id));
    } 

    renderModalBody(){
        const { 
            windowsAndTabs,
            groupId,
            tabGroupName,
            tabGroupDescription,
            tabGroupCloseAll
        } = this.props.data.params;

        return (
            <Fragment>
                <TBTextInput id="tabGroupName" label="Group Name" value="test" onChange={(id, value) => this.saveToState(id, value)}></TBTextInput>
                <TBTextArea id="tabGroupDescription" label="Description (max 170 characters)" value="test" onChange={(id, value) => this.saveToState(id, value)}></TBTextArea>
                <TBCheckBox id="tabGroupCloseAll" label="Close everything else before launching this tab group" onToggle={(id, value) => this.saveToState(id, value)} />
                <div className="tb-windowlist-container">
                    <div className="tb-form-row row">
                        <div className="col-8 label mb-0">
                            <span>Currently opened windows and tabs</span>
                        </div>
                        
                    </div>
                    <div className="tb-form-row row mr-1 mb-1 ml-1 mt-0">
                        <div className="col-12 mt-0">
                            <WindowsList 
                                windows={this.props.data.params.windowAndTabs} 
                                onRaiseToModal={(data) => this.raiseToModal(data)}
                                canCloseItems={false}
                                initialShowTabs={false}
                                initialTabStyle="vertical"

                            />
                        </div>
                    </div>    
                </div>
            </Fragment>
        );    
    }

    renderModalHeader(){

        return "Create a New Tab Group";    
    }
}

export default ETGMCreateNewGroupModal;