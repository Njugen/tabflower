import React, { Fragment } from "react";
import Modal from '../modal';


class ETGMRemoveAllGroupsModal extends Modal {
    saveModalHandler = (callback) => {
        this.clearModalData(callback(this.state));
    }

    dismissModalHandler = () => {

        this.clearModalData();
    }


    renderModalBody(){
        return (
            <Fragment>
                <p>Are you sure you want to remove all existing groups? You will lose all saved windows and tabs. This cannot be undone.</p>
                
            </Fragment>
        );    
    }

    renderModalHeader(){
        
        return "Confirm Removal of All Tabs";    
    }
}

export default ETGMRemoveAllGroupsModal;