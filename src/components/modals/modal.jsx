import React, { Component, createRef } from "react";

/*
    The Modal component

    This class represents the Modal (also known as popup) and works 
*/

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

    

    

    componentDidMount = () => {
        
        setTimeout(() => {
            this.fadeIn();
        }, 100)

    };

    componentWillMount = () => {
        this.modalRef = createRef();
    }

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

        return (
            <div ref={this.modalRef} className="modal fade" id="tabeonModal" tabIndex="-1" role="dialog" aria-labelledby="tabeonModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title" id="tabeonModalLabel">Manage Date: XX-YY-ZZZZ</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.dismissModalHandler()}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.modalContents()}
                        </div>
                        <div className="modal-footer">
                            {typeof this.dismissModalHandler === "function" &&
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => this.dismissModalHandler()}>Close</button>
                            }
                            {typeof this.saveDataHandler === "function" &&
                                <button type="button" className="btn btn-primary"  onClick={() => this.saveDataHandler(() => { this.executePropsAction()})}>Save changes</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    
}

export default Modal;