import React, { Component, createRef } from "react";

class Modal extends Component {
    state = {
        data: {"hej": "ohja"},
        visibility: "hidden"
    }

    setVisibility = (state) => {
        const visibility = state;

        this.setState({
            ...this.state, visibility
        })
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
        
        
        this.setVisibility("hidden");
    }

    cleanModalData = (callback) => {
        /*
            This function removes all data from the data section of
            the modal state. 

            This function also resets the modal UI, to make it ready for next use. Run this function
            when dismissing/saving the modal
        */
        this.setState({ data: {} }, () => {
            this.setVisibility("hidden");
            callback();
        });
    }

    dismissModalHandler = () => {
        this.cleanModalData(() => {
            this.fadeOut();
        })
        
    }

    saveDataHandler = () => {
        /*
            Save data function. We have three options:
            - Save data to modal by setting state (not recommended. Modal is washed cleaned at dismissal)
            - Save data to module by using props (not recommended. Module and state are reset at view switch)
            - Save data to view by using multilevel props (not recommended, code gets spaghettified, and view state are resetted at view switch)
            - Save data directly to backend or document by using service API/bridge
        */

        this.cleanModalData(() => {
            this.fadeOut();
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

    
    render = () => {
        
        return(
            <div ref={this.modalRef} className="modal fade" id="tabeonModal" tabIndex="-1" role="dialog" aria-labelledby="tabeonModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="tabeonModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.dismissModalHandler()}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => this.dismissModalHandler()}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => this.saveDataHandler()}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    constructor(props){
        super(props);
        this.modalRef = createRef();
    }
    
}

export default Modal;