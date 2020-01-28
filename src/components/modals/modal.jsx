import React, { Component, createRef } from "react";

/*
    The Modal component

    This class represents the Modal (also known as popup) and renders its JSX/HTML
    into the DOM at mount. It also consists of - and triggers - basic features such as fadein/fadeout as well
    as execution of bound functions (if any) from the component which calls the modal.

    The contents (the graphical render/user interface) of this class is empty. To use a modal with inserted contents, 
    create a child class inheriting from this component, then import it into src/App.js. The new class will inherit all 
    the basics written in Modal class, including its rendered user interface. Example:

    modalForAPurpose.jsx:
    class ModalForAPurpose extends Modal {
        renderModalHeadline(){ return "Modal For a Purpose" }
        ... Read more about inserting contents into modal below ...
    }

    modalForAnotherPurpose.jsx:
    class ModalForAnotherPurpose extends Modal {
        renderModalHeadline(){ return "Modal For Another Purpose" }
        ... Read more about inserting contents into modal below ...
    }


    Per default (at page launch), the Modal component - and all components inheriting from it - are hidden by CSS opacity set to 0.
*/

class Modal extends Component {
    state = {
        data: {}
    }

    fadeIn = () => {
        /*
            Fading in the modal by accessing its tag by react ref (https://reactjs.org/docs/refs-and-the-dom.html).
            Check the CSS set in src/styles/tabeon/style.css
        */

        let modal = this.modalRef.current;

        modal.style.opacity = 1;
        modal.style.zIndex = 10000;
    }

    fadeOut = () => {
        /*
            Fading out the modal by accessing its tag by react ref (https://reactjs.org/docs/refs-and-the-dom.html).
            Check the CSS set under #tabeonModal in src/styles/tabeon/style.css
        */

        let modal = this.modalRef.current;

        modal.style.opacity = 0;
        setTimeout(() => {
            modal.style.zIndex = 0;
        }, 500)
    }

    clearModalData = (callback) => {
        /*
            This function removes all data from the modal's state.
            
            Parameter:
            - callback (function, optional: can be used to execute more functions after the modal has faded out and dismissed)
        */
       const { onDismiss: onDismissModal } = this.props;

        this.setState({ data: { } }, () => {
            this.fadeOut();
            onDismissModal();

            if(typeof callback === "function"){
                callback();
            }
        });
    }

    componentDidMount = () => {
        /*
            When a modal is rendered into the DOM, wait 100ms before fading in.
            Apparently, the fade in does not work properly (resulting in immediate visibility of the component) without
            the timeout.
        */

        setTimeout(() => {
            this.fadeIn();
        }, 100)

    };

    componentWillMount = () => {
        /*
            Before the modal is mounted (meaning render() is executed), set modalRef
            to provide access to the modal container in the DOM (using this.modalRef.current).

            <div ref={this.modalRef} className="modal" id="tabeonModal">
        */

        this.modalRef = createRef();
    }

    componentDidUpdate = (prevProps, prevState) => {
        /*
            Fade in the modal component if the props changes (this is meant to check props.data, which are
            bound to change as data raised by these modals will always differ)
        */

        if(prevProps !== this.props){
            setTimeout(() => {
                this.fadeIn();
            }, 100)
        }
    }

    executePropsAction = (data) => {
        /*
            The executePropsAction function

            This function is automatically triggered when the user clicks the #modal-save button. This function
            triggers this.props.data.action, which is a props variable with a bound function raised by an outside component calling
            the modal.

            The point is to give the caller component the opportunity to execute its internal functions based on what
            the user does in the modal. This is useful if the user needs to confirm e.g. data saving, money transaction, identity verification etc.

            Parameters:
            - data (optional, any datatype: data passed from the modal to the caller component)
        */

        data = data || null;
        
        if(this.props && this.props.data && typeof this.props.data.action == "function"){
            this.props.data.action(data);
        }

        /*
            If there is no function in the this.props.data.action, nothing will happen beyond this point.
        */
    }


    render = () => {
        /*
            Rendering of the modal's user interface

            This render is a copy-paste of Bootstrap's modal feature, exluding jQuery.
            The fadein/fadeout feature is instead replaced with relevant code written
            in this class.

            Main methods/functions to be aware of: 

            - renderModalHeadline()
            - renderModalContents()
            - dismissModalHandler()
            - saveDataHandler()

            These functions add contents and functionalities to the modal's user interface. 
            Add these to the Modal child classes to give them necessary features.
        */

        return (
            <div ref={this.modalRef} className="modal" id="tabeonModal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="tabeonModalLabel">
                                {typeof this.renderModalHeader === "function" &&
                                    this.renderModalHeader()
                                }
                            </h5>
                            {typeof this.dismissModalHandler === "function" &&
                                <button type="button" className="close" onClick={() => this.dismissModalHandler()}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            }   
                        </div>
                        <div className="modal-body">
                            {typeof this.renderModalBody === "function" &&
                                this.renderModalBody()
                            }
                        </div>
                        <div className="modal-footer">
                            {typeof this.dismissModalHandler === "function" &&
                                <button type="button" id="modal-dismiss" className="btn btn-secondary" onClick={() => this.dismissModalHandler()}>Close</button>
                            }
                            {typeof this.saveModalHandler === "function" &&
                                <button type="button" id="modal-save" className="btn btn-primary"  onClick={() => this.saveModalHandler((data) => { this.executePropsAction(data)})}>Save changes</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    
}

export default Modal;