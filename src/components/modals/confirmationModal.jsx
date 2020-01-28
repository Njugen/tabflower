import React from "react";
import Modal from './modal';

class ConfirmationModal extends Modal {

    saveModalHandler = (callback) => {
        /*
            The saveDataHandler function is meant to trigger when the
            user provides a positive answer to the modal (accepting, saving, continuing etc)

            It is recommended to run this function when a button is clicked.

            Parameters:
            - callback (function): A function which provides necessary data set by this modal (e.g. its state).

            Example on how to use:
            - <button onClick={() => this.saveDataHandler((data) => this.doSomethingWithData(data))}>Save information</button
            Where the data parameter is set by the callback.


        */

        this.clearModalData(callback(this.state));
    }

    dismissModalHandler = () => {
        /*
            This function dismisses the modal in the user interface and removes any state data.
        */

        this.clearModalData();
    }

    
    renderModalBody(){
        /*
            Return either string or JSX/HTML, which will be rendered
            in the modal's content section
        */
        return "You have changed some important settings to the calendar feature. Are you sure you want to keep the changes?";    
    }

    renderModalHeader(){
        /*
            Return either string or JSX/HTML, which will be rendered
            in the modal's headline section
        */
        return "Confirm your settings";    
    }
}

export default ConfirmationModal;
