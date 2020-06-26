import React, { Component } from "react";
import PropTypes from "prop-types";
import AppContext from "./../contexts/AppContextProvider";
import { isFunction } from "./../utils/inputValidators";

class ErrorOverlay extends Component {
  static contextType = AppContext;

  forceScrollTop = () => {
    window.scrollTo(0, 0);
  };

  componentDidMount = () => {
    this.forceScrollTop();
  };

  renderErrors = (errors) => {
    return errors.map((error, index) => {
      return (
        <div
          className="row error-list d-flex justify-content-center pt-3 pb-3"
          key={"e-" + index}
        >
          <div className="col-10">
            <ul className="mt-3">
              <li>
                <span className="font-weight-bold">Error Type/Error Name:</span>
                <p>
                  {typeof error.name === "string"
                    ? error.name
                    : "Unknown Error"}
                </p>
              </li>
              <li>
                <span className="font-weight-bold">Message:</span>
                <p>
                  {typeof error.message === "string"
                    ? error.message
                    : "Information related to this error could not be retrieved."}
                </p>
              </li>
              <li>
                <span className="font-weight-bold">Code:</span>
                <p>{typeof error.code === "string" ? error.code : "unknown"}</p>
              </li>
            </ul>
          </div>
        </div>
      );
    });
  };

  handleErrorOverlayDismiss = () => {
    const { onDismiss } = this.props;

    if (isFunction(onDismiss)) {
      onDismiss();
    } else {
      const { setValueToState } = this.context;
      const errors = [];

      setValueToState("errors", errors, true);
    }
  };

  render = () => {
    const { data } = this.props;

    return (
      <div id="tabflower-error-overlay">
        <div className="contents-wrapper p-3">
          <div className="error-info container">
            <div className="row d-flex justify-content-center ">
              <div className="col-10">
                <h3>
                  {data.length > 1
                    ? "Multiple errors have occured"
                    : "An error has occured"}
                </h3>
              </div>
            </div>
            {this.renderErrors(data)}
            <div className="row">
              <button
                className="btn"
                onClick={() => this.handleErrorOverlayDismiss()}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

ErrorOverlay.propTypes = {
  data: PropTypes.array.isRequired,
  //onDismiss: PropTypes.func.isRequired,
};

export default ErrorOverlay;
