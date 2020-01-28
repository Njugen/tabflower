import React, { Component } from "react";
import Modal from './modal';

class CalendarDateSettingsModal extends Modal {
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

    
    renderModalBody(){
        /*
            Return either string or JSX/HTML, which will be rendered
            in the modal's content section
        */
        return "abc";    
    }
}

export default CalendarDateSettingsModal;
