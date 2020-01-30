import React, { Fragment } from "react";
import Modal from '../modal';


class ETGMCreateNewGroupModal extends Modal {
    saveModalHandler = (callback) => {
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