import React from "react";
import Modal from './modal';

class ConfirmationModal extends Modal {
    
    render = () => {
        
        return (
            <div ref={this.modalRef} className="modal fade" id="tabeonModal" tabIndex="-1" role="dialog" aria-labelledby="tabeonModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title" id="tabeonModalLabel">Confirm action</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.dismissModalHandler()}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            You are about to [ BLABLABLA ]. This action may cause [ BLABLABLA ]. Are you sure you want to proceed?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => this.dismissModalHandler()}>No</button>
                            <button type="button" className="btn btn-primary" onClick={() => this.saveDataHandler(() => { this.executePropsAction()})}>Yes, proceed</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConfirmationModal;
