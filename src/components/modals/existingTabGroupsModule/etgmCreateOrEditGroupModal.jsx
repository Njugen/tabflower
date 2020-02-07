import React, { Fragment } from "react";
import Modal from '../modal';
import WindowsList from './../../utils/windowsList';
import { sendToBackground } from "../../../services/webextension/APIBridge";


class ETGMCreateNewGroupModal extends Modal {
   

    saveModalHandler = (callback) => {
           
        this.clearModalData(callback(this.state));
    }

    dismissModalHandler = () => {

        this.clearModalData();
    }

    renderForm = () => {

    }


    renderModalBody(){
        return (
            <WindowsList 
                windows={this.props.data.windowAndTabs} 
                onRaiseToModal={(data) => this.raiseToModal(data)}
                canCloseItems={false}
                initialShowTabs={false}
                initialTabStyle="horizontal"
                initialWindowExpand={true}

            />
        );    
    }

    renderModalHeader(){

        return "Create a New Tab Group";    
    }
}

export default ETGMCreateNewGroupModal;