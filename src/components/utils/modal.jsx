import React, { Component } from "react";

class Modal extends Component {
    state = {
        isHidden: true
    }

    componentDidMount = () => {

    }

    dismissModalHandler = () => {
        this.props.raiseModalDismiss();
    }

    executeChangesHandler = () => {
        this.props.raiseModalChanges();
    }

    fadeIn = () => {
        let modal = document.getElementById("exampleModal");

        modal.style.visibility = "visible";
        modal.style.opacity = 1;
        modal.style.zIndex = 10000;

    }

    fadeOut = () => {
    
    }

    componentDidUpdate = () => {
        
    };

    render = () => {
        
        return(
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;