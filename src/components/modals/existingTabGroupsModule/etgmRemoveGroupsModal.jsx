import React, { Fragment } from "react";
import Modal from '../modal';


class ETGMRemoveGroupsModal extends Modal {
    saveModalHandler = (callback) => {
        this.clearModalData(callback(this.props.data.params));
    }

    dismissModalHandler = () => {

        this.clearModalData();
    }


    renderModalBody(){
        console.log("REMOVE GROUP ID", this.props.data.params);
        return (
            <Fragment>
                <p>Are you sure you want to remove all existing groups? You will lose all saved windows and tabs. This cannot be undone.</p>
                
            </Fragment>
        );    
    }

    childComponentDidMount = () => {

    }

    renderModalHeader(){
        
        return "Confirm Removal of All Tabs";    
    }
}

export default ETGMRemoveGroupsModal;