import React, { Component } from "react";
import Modal from './modal';

class CalendarDateSettingsModal extends Modal {
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
                            
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => this.dismissModalHandler()}>Close</button>
                            <button type="button" className="btn btn-primary"  onClick={() => this.saveDataHandler(() => { this.executePropsAction()})}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CalendarDateSettingsModal;
