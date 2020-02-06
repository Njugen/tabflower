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
        const data = {
            timelimit: (event ? parseInt(event.target.value) : 10)
        };
        this.setState(
            {
               data
            }
        )
    }

    componentDidMount = () => {
        this.setTimeLimit();
    }

    renderModalBody(){
        return (
            <Fragment>
                <p>Go through all opened tabs and remove them from the list</p>
                <label>Close all tabs that does not respond within <input type="text" defaultValue="10" onChange={(e) => this.setTimeLimit(e)} /> seconds</label>
            </Fragment>
        );    
    }

    renderModalHeader(){
        
        return "Close unresponsive tabs";    
    }
}

export default COTMRemoveUnresponsiveTabs;