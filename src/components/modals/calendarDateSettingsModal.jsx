import React, { Component } from "react";
import Modal from './modal';

class CalendarDateSettingsModal extends Modal {
    saveDataHandler = (callback) => {
        /*
            Save data function. We have three options:
            - Save data to modal by setting state (not recommended. Modal is washed cleaned at dismissal)
            - Save data to module by using props (not recommended. Module and state are reset at view switch)
            - Save data to view by using multilevel props (not recommended, code gets spaghettified, and view state are resetted at view switch)
            - Save data directly to backend or document by using service API/bridge
        */

        const { onDismiss: onDismissModal } = this.props;

        this.clearModalData(() => {
            this.fadeOut();
            onDismissModal();

            if(typeof callback === "function"){
                callback();
            }
        })
    }
    
    modalContents(){
        return "abc";    
    }
}

export default CalendarDateSettingsModal;
