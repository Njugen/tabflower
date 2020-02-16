import React, { Fragment, Component } from "react";
import Modal from './modal';


class ErrorOverlay extends Component {
    render = () => {
        const { error } = this.props.data;
        console.log("IN OVERLAY", this.props.data);
        return(
            <div id="tabflower-error-overlay">
                <div className="contents-wrapper p-3">
                    <div className="error-info container">
                        <div className="row d-flex justify-content-center">
                            <div className="col-10">
                                <h3>An Error Has Occured</h3>
                                <ul className="mt-3">
                                    <li>
                                        <span className="font-weight-bold">Error Type/Error Name:</span> 
                                        <p>
                                            { typeof error.name === "string" ? error.name : "Unknown Error" }
                                        </p>
                                    </li>
                                    <li>
                                        <span className="font-weight-bold">Message:</span> 
                                        <p>
                                            { typeof error.message === "string" ? error.message : "Information related to this error could not be retrieved." }
                                        </p>
                                    </li>
                                    <li>
                                        <span className="font-weight-bold">Code:</span> 
                                        <p>
                                            { typeof error.code === "string" ? error.code : "unknown" }
                                        </p>
                                    </li>
                                </ul>
                            </div>    
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ErrorOverlay;