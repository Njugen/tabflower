import React from "react";
import Modal from './modal';

class ConfirmationModal extends Modal {

    saveDataHandler = (callback) => {
        /*
            Save data function. We have three options:
            - Save data to modal by setting state (not recommended. Modal is washed cleaned at dismissal)
            - Save data to module by using props (not recommended. Module and state are reset at view switch)
            - Save data to view by using multilevel props (not recommended, code gets spaghettified, and view state are resetted at view switch)
            - Save data directly to backend or document by using service API/bridge
        */

        this.clearModalData(callback);
    }

    dismissModalHandler = () => {
        this.clearModalData();
    }

    /*
        Return either string or JSX/HTML, which will be rendered
        in the modal
    */
    modalContents(){
        return "abc2";    
    }
    
}

export default ConfirmationModal;
