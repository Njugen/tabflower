import React, { Component, Fragment, createRef } from "react";
import * as validator from "../../utils/inputValidators";

export default class TBDropdown extends Component {
  state = {
    selectedValue: "",
  };

  handleDropDownClick = (e) => {
    const dropDownList = this.dropDownListRef.current;
    const dropDownListDisplay = dropDownList.style.display;

    if (dropDownListDisplay !== "block") {
      dropDownList.style.display = "block";
    } else {
      dropDownList.style.display = "none";
    }
  };

  handleExternalClick = (e) => {
    const { className } = e.target;

    if (!className.includes("selected-value")) {
      const dropDownList = this.dropDownListRef.current;
      const dropDownListDisplay = dropDownList.style.display;

      if (dropDownListDisplay !== "none") {
        dropDownList.style.display = "none";
      }
    }
  };

  handleListItemClick = (e) => {
    const { onChange, id } = this.props;
    const { innerText: selectedValue } = e.target;

    this.setState({ selectedValue }, () => {
      const { selectedValue } = this.state;

      onChange(id, selectedValue);
    });
  };

  componentDidMount = () => {
    window.addEventListener("click", this.handleExternalClick);
  };

  componentWillUnmount = () => {
    window.removeEventListener("click", this.handleExternalClick);
  };

  componentDidUpdate = (prevProps) => {
    const { isNumber } = validator;
    const { clear } = this.props;

    if (isNumber(clear) && isNumber(prevProps.clear)) {
      if (clear > prevProps.clear) {
        this.setState({ selectedValue: "" });
      }
    }
  };

  constructor(props) {
    super(props);
    this.dropDownListRef = createRef();
  }

  render() {
    const { label, warning, id, selectables, maxWidth, value } = this.props;
    const { selectedValue } = this.state;

    return (
      <Fragment>
        <div
          id={id}
          className={
            "tb-form-row " + (maxWidth === false ? "no-max-width" : "row")
          }
        >
          <div className="label">
            <span>{typeof label === "string" && label}</span>
          </div>
          <div className="label">
            <span>{typeof warning === "string" && warning}</span>
          </div>
          <div className="tb-dropdownlist-container">
            <div className="selected-value" onClick={this.handleDropDownClick}>
              <span className="selected-value-text">
                {selectedValue || value}
              </span>
              <span className="fas fa-chevron-down selected-value-icon"></span>
            </div>
            <ul className="tb-dropdownlist" ref={this.dropDownListRef}>
              {selectables.map((data, index) => (
                <li key={"li-item-" + index} onClick={this.handleListItemClick}>
                  {data}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Fragment>
    );
  }
}
