import React, { Component } from "react";
import * as validator from "../../../utils/inputValidators";

export default class HeaderContents extends Component {
  getWindowName = () => {
    const { isString, isObject } = validator;
    const { data } = this.props;
    let defaultName = "Window";

    if (!isObject(data)) return defaultName;
    const { params } = data;

    if (!isObject(params)) return defaultName;
    const { windowName } = params;

    if (!isString(windowName)) return defaultName;

    return '"' + windowName + '"';
  };

  render() {
    return "Close " + this.getWindowName();
  }
}
