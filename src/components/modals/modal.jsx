import React, { Component, createRef } from "react";

class Modal extends Component {
    state = {
        data: {}
    }

    fadeIn = () => {
        let modal = this.modalRef.current;

        modal.style.opacity = 1;
        modal.style.zIndex = 10000;
    }

    fadeOut = () => {
        let modal = this.modalRef.current;

        modal.style.opacity = 0;
        setTimeout(() => {
            modal.style.zIndex = 0;
        }, 500)
    }

    clearModalData = (callback) => {
        /*
            This function removes all data from the data section of
            the modal state. 

            This function also resets the modal UI, to make it ready for next use. Run this function
            when dismissing/saving the modal
        */
       console.log("MDM");
        this.setState({ data: { } }, () => {
            callback();
        });
    }

    dismissModalHandler = () => {
        const { onDismiss: onDismissModal } = this.props;

        this.clearModalData(() => {
            this.fadeOut();
            onDismissModal();
        })
        
    }

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

    componentDidMount = () => {
        
        setTimeout(() => {
            this.fadeIn();
        }, 100)

    };

    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps !== this.props){
            
            setTimeout(() => {
                this.fadeIn();
            }, 100)
        }
    }

    executePropsAction = () => {
        /*
            Raising data to a modal from other components (these components may be other modals, modules or views) is
            necessary only if showing a modal is necessary. After raising data to a modal, we might want that modal
            to execute e.g. data saving features (or other types of features) located outside of the modal itself (most likely these features are located
            in the caller components themselves).

            Those features are passed to the modal via the this.props.data.action function. If there are features passed to this 
            modal via this props, then execute it. If there are none, then do nothing when this function runss.

        */
       if(this.props && this.props.data && typeof this.props.data.action == "function"){
            this.props.data.action();
        }
    }


    render = () => {

        return null;
    }

    constructor(props){
        super(props);
        this.modalRef = createRef();
    }
    
}

export default Modal;