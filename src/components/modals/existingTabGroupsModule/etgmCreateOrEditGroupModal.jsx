import React, { Fragment } from "react";
import Modal from '../modal';

const chromeBridge = (typeof window.chrome === "undefined" ? null : window.chrome);

class ETGMCreateNewGroupModal extends Modal {
   

    saveModalHandler = (callback) => {
        if(chromeBridge){
            console.log("CLICKED")
            chromeBridge.runtime.sendMessage(
                null,
                {
                    id: "get-all-tabs",
                    robin: false
                },
                (response) => {
                    console.log("blablabla", response)
                }
            )
        }
        
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