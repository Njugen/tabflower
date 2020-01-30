import React, { Fragment } from "react";
import Modal from '../modal';


class ETGMRemoveSingleGroupModal extends Modal {
    saveModalHandler = (callback) => {
        this.clearModalData(callback(this.state));
    }

    dismissModalHandler = () => {

        this.clearModalData();
    }


    renderModalBody(){
        return (
            <Fragment>
                <p>Are you sure you want to remove this group? You will lose it as well as all windows and tabs stored in it. This cannot be undone.</p>
                
            </Fragment>
        );    
    }

    renderModalHeader(){
        
        return "Confirm Removal of Group";    
    }
}

export default ETGMRemoveSingleGroupModal;