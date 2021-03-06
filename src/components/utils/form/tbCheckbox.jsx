import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import * as validator from "../../utils/inputValidators";

class TBCheckBox extends Component {
  state = {
    on: this.props.value && this.props.value === "true" ? true : false,
  };

  setButtonState = (input) => {
    const { on } = this.state;
    const { id, onToggle } = this.props;

    this.setState(
      {
        on: input,
      },
      () => {
        if (onToggle && id) {
          onToggle(id, on);
        }
      }
    );
  };

  toggleCheckbox = (target) => {
    const { on } = this.state;

    if (target.className === "tb-checkbox-ball") {
      // If the user clicks on the "ball"

      const { style, parentNode: parent } = target;

      if (on === false) {
        parent.style.backgroundColor = "#e2e2e2";
        parent.style.borderColor = "#c2c2c2";
        style.marginLeft = "0rem";
        this.setButtonState(true);
      } else if (on === true) {
        parent.style.backgroundColor = "#c95cdf";
        parent.style.borderColor = "#7a1d8c";
        style.marginLeft = "2rem";
        this.setButtonState(false);
      }
    } else if (target.className === "tb-checkbox-container") {
      // If the user clicks the checkbox background (not the ball)

      const { style, lastChild: ball } = target;

      if (on === false) {
        style.backgroundColor = "#e2e2e2";
        style.borderColor = "#989898";
        ball.style.marginLeft = "0rem";
        this.setButtonState(true);
      } else if (on === true) {
        style.backgroundColor = "#c95cdf";
        style.borderColor = "#7a1d8c";
        ball.style.marginLeft = "2rem";
        this.setButtonState(false);
      }
    }
  };

  componentDidUpdate = (prevProps) => {
    const { isNumber } = validator;
    const { clear } = this.props;

    if (isNumber(clear) && isNumber(prevProps.clear)) {
      if (clear > prevProps.clear) {
        if (this.state.on === false) {
          this.toggleCheckbox(this.checkboxRef.current);
        }
      }
    }
  };

  componentDidMount = () => {
    //
    this.toggleCheckbox(this.checkboxRef.current);
  };

  render = () => {
    const { label, maxWidth } = this.props;

    return (
      <div
        className={
          maxWidth === false
            ? "tb-form-row no-max-width"
            : "tb-form-row-checkbox row d-flex justify-content-between"
        }
      >
        <div
          className={
            maxWidth !== false || typeof maxWidth === "undefined"
              ? "col-9 label"
              : "label"
          }
        >
          <span>{typeof label === "string" && label}</span>
        </div>
        {(maxWidth !== false || typeof maxWidth === "undefined") && (
          <div className="label">
            <span></span>
          </div>
        )}
        <div
          className={
            (maxWidth !== false || typeof maxWidth === "undefined") && "col-2"
          }
        >
          <div
            ref={this.checkboxRef}
            className="tb-checkbox-container"
            onClick={(e) => this.toggleCheckbox(e.target)}
          >
            <span className="tb-checkbox-ball"></span>
          </div>
        </div>
      </div>
    );
  };

  constructor(props) {
    super(props);
    this.checkboxRef = createRef();
  }
}

TBCheckBox.propTypes = {
  onToggle: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default TBCheckBox;
