import React, { Fragment } from "react";
import Modal from '../modal';
import { sendToBackground } from "../../../services/webextension/APIBridge";

class ETGMCreateNewGroupModal extends Modal {
   

    saveModalHandler = (callback) => {
            sendToBackground(
                "get-all-tabs",
                {
                    currentWindow: true,
                    active: true
                },
                (response) => {
                    console.log("blablabla", response)
                }
            )
        
        
        this.clearModalData(callback(this.state));
    }

    dismissModalHandler = () => {

        this.clearModalData();
    }


    renderModalBody(){
        return (
            <Fragment>
                <p>Blablabla</p>
                
            </Fragment>
        );    
    }

    renderModalHeader(){
        
        return "Create a New Tab Group";    
    }
}

export default ETGMCreateNewGroupModal;