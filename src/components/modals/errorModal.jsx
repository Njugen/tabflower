import React, { Fragment } from "react";
import Modal from './modal';


class ErrorModal extends Modal {
    saveModalHandler = (callback) => {
        this.clearModalData(callback(this.state));
    }

    dismissModalHandler = () => {

        this.clearModalData();
    }


    renderModalBody(){
        console.log("OMFG ERROR", this.props.data);
        return (
            <Fragment>
                <p>Are you sure you want to remove all existing groups? You will lose all saved windows and tabs. This cannot be undone.</p>
                
            </Fragment>
        );    
    }

    renderModalHeader(){
        return "An error has occured";    
    }
}

export default ErrorModal;