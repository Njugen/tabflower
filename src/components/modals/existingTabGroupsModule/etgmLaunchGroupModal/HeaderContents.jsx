import React, { Component } from "react";
import * as validator from "../../../utils/inputValidators";

export default class HeaderContents extends Component {
  headerTitle = () => {
    const { isObject } = validator;
    const { data } = this.props;
    const defaultGroupName = "Confirm launch of this tab group";

    if (!isObject(data)) return defaultGroupName;
    const { params } = data;

    if (!isObject(params)) return defaultGroupName;
    const { groupName } = params;

    if (!groupName) return defaultGroupName;

    return 'Confirm launch of tab group "' + groupName + '"';
  };

  render() {
    return this.headerTitle();
  }
}
