import React, { Fragment } from "react";
import Modal from '../modal';
import { sendToBackground } from "../../../services/webextension/webexAPIBackgroundBridge";

class ETGMCreateNewGroupModal extends Modal {
   

    saveModalHandler = (callback) => {
            sendToBackground(
                "get-all-tabs",
                {
                    robin: false
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