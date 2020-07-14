import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import * as validator from "../../utils/inputValidators";
class TBTextArea extends Component {
  state = {
    value: "",
  };

  changeInputValue = (event, presetValue) => {
    const { id, onChange } = this.props;

    this.setState(
      {
        value: event ? event.target.value : presetValue,
      },
      () => {
        if (onChange && id) {
          onChange(id, this.state.value);
        }
      }
    );
  };

  componentDidMount = () => {
    const { value } = this.props;

    if (value) {
      this.changeInputValue(null, value);
    }
  };

  componentDidUpdate = (prevProps) => {
    const { isNumber } = validator;
    const { clear } = this.props;

    if (isNumber(clear) && isNumber(prevProps.clear)) {
      if (clear > prevProps.clear) {
        this.setState({ value: "" });
      }
    }
  };

  render = () => {
    const { label, value, warning } = this.props;

    return (
      <Fragment>
        <div className="tb-form-row row">
          <div className="label">
            <span>{typeof label === "string" && label}</span>
          </div>
          <div className="label">
            <span>{typeof warning === "string" && warning}</span>
          </div>

          <textarea
            value={this.state.value || value}
            maxLength="170"
            onChange={(e) => this.changeInputValue(e)}
            className="tb-textarea"
          ></textarea>
        </div>
      </Fragment>
    );
  };
}

TBTextArea.propTypes = {
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  warning: PropTypes.string,
};

export default TBTextArea;
