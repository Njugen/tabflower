import React, { Fragment, Component } from "react";
import Modal from './modal';


class ErrorOverlay extends Component {
    render = () => {
        console.log("ERRORMODAL", this.props.data.error);
        return(
            <div className="error-modal">
                <div className="error-modal-contents-wrapper">
                    {this.props.data.error.message}
                </div>
            </div>
        )
    }
}

export default ErrorOverlay;