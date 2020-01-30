import React, { Fragment } from "react";
import Modal from '../modal';


class ETGMLaunchGroupsModal extends Modal {
    saveModalHandler = (callback) => {
        this.clearModalData(callback(this.state));
    }

    dismissModalHandler = () => {

        this.clearModalData();
    }

    manyTabsDetected = (numberOfWindows, numberOfTabs) => {
        return (
            <p>
                Warning: You are about to launch a group consisting of 4 windows and 120 tabs. This might stress your computer down in the long run
            </p>
        );
    }

    launchOptions = () => {
        return (
            <Fragment>
                <label><input type="checkbox" /> Close all currently opened tabs and windows</label>
                <label><input type="checkbox" /> Automatically close all unresponsive tabs after launching the group</label>
                <label><input type="checkbox" /> Save all selected options and do not show this message again</label>
            </Fragment>
        );
    }

    renderModalBody(){
        return (
            <Fragment>
                {this.manyTabsDetected()}
                {this.launchOptions()}
                
            </Fragment>
        );    
    }

    renderModalHeader(){
        
        return "Confirm launch of selected tabs";    
    }
}

export default ETGMLaunchGroupsModal;