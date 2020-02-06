import React, { Fragment } from "react";
import Modal from '../modal';


class COTMRemoveUnresponsiveTabs extends Modal {

    saveModalHandler = (callback) => {
        this.clearModalData(callback(this.state));
    }

    dismissModalHandler = () => {

        this.clearModalData();
    }

    setTimeLimit = (event) => {

    }

    renderModalBody(){
        return (
            <Fragment>
                <p>Go through all opened tabs and remove them from the list</p>
                
            </Fragment>
        );    
    }

    renderModalHeader(){
        
        return "Close unresponsive tabs";    
    }
}

export default COTMRemoveUnresponsiveTabs;