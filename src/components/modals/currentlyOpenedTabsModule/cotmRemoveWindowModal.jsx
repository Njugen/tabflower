import React, { Fragment } from "react";
import Modal from '../modal';


class COTMRemoveWindowModal extends Modal {

    saveModalHandler = (callback) => {
        this.clearModalData(callback(this.state));
    }

    dismissModalHandler = () => {

        this.clearModalData();
    }

    childComponentDidMount = () => {
        const data = this.props.data.windowInfo;
        this.setState(
            { data }
        )
    }

    renderModalBody(){
        return (
            <Fragment>
                <p>
                    Closing this window will also close all its tabs. All ongoing activities on these web pages will be interrupted and possibly lost.
                </p>
                <p>
                    Are you sure you want to proceed?
                </p>
                <p className="small">
                    You may reopen the window with all its tabs intact from the browser's history feature (presuming you have it activated).
                </p>
            </Fragment>
        );    
    }

    renderModalHeader(){
        
        return "Close Window";    
    }
}

export default COTMRemoveWindowModal;