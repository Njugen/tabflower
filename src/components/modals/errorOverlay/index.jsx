import React, { Component } from "react";
import PropTypes from "prop-types";
import AppContext from "../../contexts/AppContextProvider";
import { isFunction } from "../../utils/inputValidators";
import ErrorItem from "./errorItem";

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
      const { name, message, code } = error;

      return (
        <ErrorItem
          title={name}
          message={message}
          code={code}
          key={"e" + index}
        />
      );
    });
  };

  handleDismiss = () => {
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
    const { errors } = this.props;

    return (
      <div id="tabflower-error-overlay">
        <div className="contents-wrapper p-3">
          <div className="error-info container">
            <div className="row d-flex justify-content-center ">
              <div className="col-10">
                <h3>
                  {errors.length > 1
                    ? "Multiple errors have occured"
                    : "An error has occured"}
                </h3>
              </div>
            </div>
            {this.renderErrors(errors)}
            <div className="row">
              <button className="btn" onClick={() => this.handleDismiss()}>
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
