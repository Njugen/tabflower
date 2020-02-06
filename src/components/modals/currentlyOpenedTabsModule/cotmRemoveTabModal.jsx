import React, { Fragment } from "react";
import Modal from '../modal';


class COTMRemoveTabModal extends Modal {

    saveModalHandler = (callback) => {
        this.clearModalData(callback(this.state));
    }

    dismissModalHandler = () => {

        this.clearModalData();
    }

    childComponentDidMount = () => {
        const data = this.props.data.tabInfo;
        this.setState(
            { data }
        )
    }

    renderModalBody(){
        const { title } = this.props.data.tabInfo;

        return (
            <Fragment>
                <p>
                    You are about to close the tab <strong>{ title }</strong>. All ongoing activities will be interrupted and possibly lost.
                </p>
                <p>
                    Are you sure you want to proceed?
                </p>
                <p className="small">
                    You may reopen this tab through the browser's history feature (presuming you have it activated).
                </p>
            </Fragment>
        );    
    }

    renderModalHeader(){
        
        return "Close Tab";    
    }
}

export default COTMRemoveTabModal;